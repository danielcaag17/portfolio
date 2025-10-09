// Aplicar animación reveal a elemento HTML
export const revealStyles = (isVisible: boolean, delay = "0s") => ({
  animation: isVisible ? `reveal 0.6s ease-out ${delay} both` : "none",
});

// TODO: tener esto en todos los componentes y hacer el revealOpacity si es necesario
