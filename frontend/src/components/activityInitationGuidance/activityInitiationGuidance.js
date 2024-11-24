import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Circle } from 'lucide-react';

const ACTIVITY_INITIATION_GUIDELINES = {
  basicFeeBillActivity: [
    {
      text: "Debes obtener tu **Clave Única** en el Registro Civil para acceder a los servicios del SII. Esta clave te permitirá realizar trámites en línea de forma segura."
    },
    {
      text: "Ingresa al sitio web del SII (www.sii.cl) y selecciona la opción 'Registro de Contribuyentes'. Allí deberás declarar el inicio de actividades como persona natural."
    },
    {
      text: "Para emitir boletas de honorarios electrónicas, debes inscribirte en el sistema de Boleta Electrónica del SII. Este trámite es gratuito y obligatorio para profesionales independientes."
    },
    {
      text: "Deberás declarar mensualmente tus ingresos a través del Formulario 29 y realizar la retención del **13.25%** de impuesto. El SII proporciona una plataforma en línea para este trámite."
    },
    {
      text: "Es importante mantener un registro ordenado de tus boletas emitidas y retenciones realizadas para la Declaración Anual de Impuestos (Formulario 22) que debes presentar en abril de cada año."
    }
  ],
  companyFeeBillActivity: [
    {
      text: "Primero debes constituir tu empresa en el Registro de Empresas y Sociedades (Tu empresa en un día) o ante notario. Este paso es esencial antes de iniciar actividades en el SII."
    },
    {
      text: "Una vez constituida la empresa, debes iniciar actividades en el SII declarando tu giro comercial. Selecciona los códigos de actividad económica (CIIU) que correspondan a tu negocio."
    },
    {
      text: "Para emitir boletas de venta, debes solicitar al SII la autorización para emitir documentos tributarios electrónicos (DTE). Esto incluye boletas, facturas y guías de despacho."
    },
    {
      text: "Deberás declarar y pagar mensualmente el IVA a través del Formulario 29. La tasa general del IVA en Chile es del 19%. También deberás realizar la declaración anual de renta."
    },
    {
      text: "Es obligatorio llevar contabilidad completa o simplificada según tu régimen tributario. Considera contratar un contador para mantener tus registros contables y tributarios al día."
    }
  ],
  uncertainActivity: [
    {
      text: "Agenda una cita con el SII para recibir orientación sobre la clasificación correcta de tu actividad. Un fiscalizador te ayudará a determinar el código de actividad económica adecuado."
    },
    {
      text: "Mientras defines tu actividad, recopila toda la documentación necesaria: RUT, documentos de constitución si es empresa, patentes y permisos municipales según corresponda."
    },
    {
      text: "Consulta con un contador o asesor tributario especializado para determinar el mejor régimen tributario para tu caso específico (Pro Pyme, renta presunta, o régimen general)."
    },
    {
      text: "Una vez definida tu actividad, deberás actualizar tu información en el SII mediante una modificación de datos y timbraje de documentos según corresponda."
    },
    {
      text: "Mantén un registro detallado de todas tus operaciones desde el inicio, incluso antes de definir completamente tu actividad, para facilitar futuras declaraciones y modificaciones."
    }
  ]
};

const parseBoldText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ActivityInitiationGuidance = ({ activityType }) => {
  
  return (
    <Box sx={{
      width: '100%',
      p: 4,
      color: 'white'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        Guía de Actividades
      </Typography>
      
      <List sx={{ width: '100%' }}>
          {ACTIVITY_INITIATION_GUIDELINES[activityType]?.map((guideline, index) => (
          <ListItem 
            key={index}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px'
            }}
          >
            <ListItemIcon>
              <Circle 
                size={12} 
                style={{ color: 'white' }} 
              />
            </ListItemIcon>
            <ListItemText
              primary={parseBoldText(guideline.text)}
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'white',
                  fontSize: '1.1rem'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityInitiationGuidance;
