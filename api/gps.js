export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://cade-o-trui.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method === "POST") {
        const { latitude, longitude } = req.body;

        console.log(
            `Informações de GPS recebidas com êxito | Latitude: ${latitude} | Longitude: ${longitude}`
        );
        res.status(200).send("Dados recebidos com sucesso.");
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).send(`Método ${req.method} não permitido.`);
    }
}