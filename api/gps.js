export default function handler(req, res) {
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