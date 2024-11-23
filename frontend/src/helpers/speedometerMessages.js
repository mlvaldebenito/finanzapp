const getSpeedometerMessage = (value) => {
  if (value >= 45) {
    return {
      message: "¡Límite superado!",
      subMessage: "El banco deber reportar tu información al SII!",
      severity: "error",
      color: '#f43f5e'  
    };
  } else if (value >= 35) {
    return {
      message: "Atención a tus transferencias",
      subMessage: "Te estás acercando al límite",
      severity: "warning",
      color: '#ff9800'  
    };
  } else if (value >= 25) {
    return {
      message: "Vas bien",
      subMessage: "Mantén el ritmo actual",
      severity: "info",
      color: '#3b82f6'  
    };
  } else {
    return {
      message: "Todo en orden",
      subMessage: "Tienes margen para más transferencias",
      severity: "success",
      color: '#10b981'  
    };
  }
};

export default getSpeedometerMessage;
