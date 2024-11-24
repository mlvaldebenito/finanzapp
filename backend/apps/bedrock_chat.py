import boto3
import json
import os
from typing import Optional, Dict, Any, List

from openai import OpenAI


class BedRockLLM:
    def __init__(
        self,
        model_id: str = "claude.3.haiku", #Titan
        region_name: str = "us-east-1",
        temperature: float = 0.7,
        max_tokens: int = 1000
    ):
        """
        Inicializa la clase para interactuar con modelos LLM en Amazon Bedrock.
        
        Args:
            model_id (str): ID del modelo a usar (default: "anthropic.claude-v2")
            region_name (str): Región de AWS (default: "us-east-1")
            temperature (float): Temperatura para la generación (default: 0.7)
            max_tokens (int): Máximo número de tokens en la respuesta (default: 1000)
        """
        self.model_id = model_id
        self.temperature = temperature
        self.max_tokens = max_tokens
        
        # Inicializar el cliente de Bedrock usando el rol IAM
        self.client = boto3.client(
            service_name="bedrock-runtime",
            region_name=region_name
        )

        # Historial de conversaciones
        self.conversation_history = []

    def _get_model_params(self, prompt: str) -> Dict:
        """
        Prepara los parámetros según el modelo seleccionado.
        """
        if "anthropic.claude" in self.model_id:
            return {
                "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                "max_tokens_to_sample": self.max_tokens,
                "temperature": self.temperature,
                "anthropic_version": "bedrock-2023-05-31"
            }
        
        elif "meta.llama2" in self.model_id:
            return {
                "prompt": prompt,
                "max_gen_len": self.max_tokens,
                "temperature": self.temperature
            }
        
        elif "amazon.titan" in self.model_id:
            return {
                "inputText": prompt,
            }
        
        elif "ai21" in self.model_id:
            return {
                "prompt": prompt,
                "maxTokens": self.max_tokens,
                "temperature": self.temperature
            }
        
        else:
            raise ValueError(f"Modelo no soportado: {self.model_id}")

    def _extract_response(self, response: Dict) -> str:
        """
        Extrae la respuesta del modelo según el formato de cada proveedor.
        """
        response_body = json.loads(response.get('body').read())
        
        if "anthropic.claude" in self.model_id:
            return response_body.get('completion', '')
        
        elif "meta.llama2" in self.model_id:
            return response_body.get('generation', '')
        
        elif "amazon.titan" in self.model_id:
            return response_body.get('results', [{}])[0].get('outputText', '')
        
        elif "ai21" in self.model_id:
            return response_body.get('completions', [{}])[0].get('data', {}).get('text', '')
        
        else:
            raise ValueError(f"Modelo no soportado: {self.model_id}")

    def get_available_models(self) -> List[str]:
        """
        Retorna una lista de los modelos disponibles más comunes en Bedrock.
        """
        return [
            "anthropic.claude-v2",
            "anthropic.claude-v2:1",
            "anthropic.claude-instant-v1",
            "meta.llama2-13b-chat-v1",
            "meta.llama2-70b-chat-v1",
            "amazon.titan-text-express-v1",
            "ai21.j2-ultra-v1"
        ]
    
    def get_conversation_history(self) -> List[Dict]:
        """
        Obtiene el historial de la conversación.
        """
        return self.conversation_history
    
    def clear_conversation_history(self):
        """
        Limpia el historial de la conversación.
        """
        self.conversation_history = []


    def invoke_model(self, body, accept="application/json", content_type="application/json"):
        result = self.client.invoke_model(
            body=json.dumps(body),
            modelId=self.model_id,
            accept=accept,
            contentType=content_type,
        )
        return result

    def chat(
        self, 
        prompt: str,
        store_history: bool = True
    ) -> str:
        """
        Envía un mensaje al modelo y recibe su respuesta.
        
        Args:
            prompt (str): Texto de entrada para el modelo
            store_history (bool): Si se debe almacenar el histórico
        
        Returns:
            str: Respuesta del modelo
        """
        try:
            # Preparar los parámetros según el modelo
            body = self._get_model_params(prompt)
            
            # Invocar al modelo
            response = self.invoke_model(body=body)
            
            # Extraer la respuesta
            response_text = self._extract_response(response)
            
            # Guardar en el historial si está activado
            if store_history:
                self.conversation_history.append({
                    "prompt": prompt,
                    "response": response_text
                })
            
            return response_text
            
        except Exception as e:
            error_msg = f"Error al invocar el modelo: {str(e)}"
            raise Exception(error_msg)
