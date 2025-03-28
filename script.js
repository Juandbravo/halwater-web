document.getElementById("commandForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const deviceId = document.getElementById("deviceId").value.trim();
  const payload = document.getElementById("payload").value.trim();
  const responseDiv = document.getElementById("response");

  if (payload.length !== 16) {
    responseDiv.textContent = "El payload debe tener exactamente 16 caracteres hexadecimales.";
    return;
  }

  try {
    const response = await fetch("https://y3i1mnv729.execute-api.us-east-1.amazonaws.com/prod/setcommand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId, payload })
    });

    const data = await response.json();
    responseDiv.textContent = data.message || data.error || "Comando enviado.";
  } catch (error) {
    responseDiv.textContent = "Error al enviar comando.";
    console.error(error);
  }
});
