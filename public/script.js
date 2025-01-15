const serverURL = "https://cade-o-trui.vercel.app/api/gps";

function sendGPSLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
                alert("FOI3");
        
                fetch(serverURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ latitude, longitude })
                })
                .then(response => console.log("Dados de GPS enviados: ", response))
                .catch(error => console.log("Ocorreu algum erro ao enviar informações de GPS: ", error));
            },
            error => {
                console.error("Erro ao obter a localização: ", error);
                alert("Erro ao acessar a localização.");
            }
        );        
    }
    else {
        alert("Seu dispositivio não possui suporte para o envio de geolocalização.");
    }
}

document.getElementById("getLocationBtn").addEventListener("click", () => {
    sendGPSLocation();
});