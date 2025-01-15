export default function handler(req, res) {
    // Configurando os cabeçalhos de CORS
    res.setHeader("Access-Control-Allow-Origin", "https://cade-o-trui.vercel.app"); // Domínio permitido
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Cabeçalhos permitidos

    // Tratamento para requisições OPTIONS (Preflight request)
    if (req.method === "OPTIONS") {
        res.status(204).end(); // Responde com status 204 (sem conteúdo) para OPTIONS
        return;
    }

    // Tratamento para requisições POST
    if (req.method === "POST") {
        const { latitude, longitude } = req.body;

        console.log(
            `Informações de GPS recebidas com êxito | Latitude: ${latitude} | Longitude: ${longitude}`
        );
        res.status(200).send("Dados recebidos com sucesso.");
    } else {
        // Método não permitido
        res.setHeader("Allow", ["POST"]);
        res.status(405).send(`Método ${req.method} não permitido.`);
    }
}
