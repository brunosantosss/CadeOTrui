import Cors from "cors";

// Configurando o middleware de CORS
const cors = Cors({
    origin: "https://cade-o-trui.vercel.app", // Domínio permitido
    methods: ["POST", "OPTIONS"], // Métodos permitidos
});

// Helper para executar middlewares
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    // Rodando o middleware de CORS
    await runMiddleware(req, res, cors);

    // Tratando requisições OPTIONS
    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    // Lidando com o método POST
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
