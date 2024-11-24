import os
import json

from openai import OpenAI


class OpenAIService:
    def __init__(self):
        self.openai_client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
        )

    def send_image_to_process(self, encoded_image, prompt, img_type="image/png", model="gpt-4o-mini"):
        response = self.openai_client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt },
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:{img_type};base64,{encoded_image}"},
                        },
                    ],
                }
            ],
        )
        return response.choices[0].message.content
    
    def send_image_to_process_services(self, encoded_image, img_type="image/png"):
        prompt = """
                Extrae el nombre del servicio y el monto asociado a cada servicio.
                El monto está en CLP. Me lo puedes devolver solo como una lista [nombre del servicio, monto], nada más.
             """
        response_text = self.send_image_to_process(encoded_image, prompt, img_type)

        return json.loads(response_text)