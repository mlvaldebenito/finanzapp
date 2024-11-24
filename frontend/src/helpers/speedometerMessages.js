import { Check, Alarm, Warning, Info } from "@mui/icons-material";

const getSpeedometerMessage = (value) => {
  if (value >= 50) {
    return {
      messages: [
        "Has recibido suficientes ingresos de distintos remitentes para que sea notificado al SII",
        "Recuerda que si recibes más de 50 transferencias de distintos remitentes en un mes, el banco debe informar al SII",
        "Si estás recibiendo pagos en transferencias de distintos remitentes, te recomendamos que te informes sobre la normativa vigente y declares tus ingresos",
      ],
      severity: "error",
      color: "#f43f5e",
      showIcon: true,
      icon: Alarm,
    };
  } else if (value >= 45) {
    return {
      messages: [
        "Has recibido bastantes ingresos de distintos remitentes, si superas los 50, el banco debe informar al SII",
        "Recuerda que si recibes más de 50 transferencias de distintos remitentes en un mes, el banco debe informar al SII",
        "Te recomendamos que te informes sobre la normativa vigente y declares tus ingresos en caso de que estés recibiendo pagos en transferencias",
      ],
      subMessage: "Te estás acercando al límite",
      severity: "warning",
      color: "#FFA500",
      showIcon: true,
      icon: Warning,
    };
  } else if (value >= 25) {
    return {
      messages: [
        "Has recibido una cantidad considerable de ingresos de distintos remitentes",
        "Recuerda que si recibes más de 50 transferencias de distintos remitentes en un mes, el banco debe informar al SII",
        "Te recomendamos que te informes sobre la normativa vigente y declares tus ingresos en caso de que estés recibiendo pagos en transferencias",
      ],
      subMessage: "No estas cerca del límite",
      severity: "info",
      color: "#3b82f6",
      icon: Info,
    };
  } else {
    return {
      messages: [
        "Has recibido pocos ingresos de distintos remitentes",
        "Recuerda que si recibes más de 50 transferencias de distintos remitentes en un mes, el banco debe informar al SII",
        "Te recomendamos que te informes sobre la normativa vigente y declares tus ingresos en caso de que estés recibiendo pagos en transferencias",
      ],
      subMessage: "Tienes margen para más transferencias",
      severity: "success",
      color: "#10b981",
      icon: Check,
    };
  }
};

export default getSpeedometerMessage;
