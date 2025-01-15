import Cors from "cors";
import { response } from "express";

const stops = [
    {
        long: "-3.9068821896328734", 
        lat: "-38.50717215680889"
    }
];

const cors = Cors({
    origin: "https://cade-o-trui.vercel.app",
    methods: ["POST", "OPTIONS"],
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);

    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    if (req.method === "POST") {
        const { latitude, longitude } = req.body;

        try {
            const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-hgv?api_key=5b3ce3597851110001cf62487d62eddd40584e01bcbf33b38ebc3ece&start=${longitude},${latitude}&end=${stops[0].long},${stops[0].lat}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("OpenRouteService API data: ", data);
            
            console.log(`Informações de GPS recebidas com êxito | Latitude: ${latitude} | Longitude: ${longitude}`);
            res.status(200).send("Dados recebidos com sucesso.");
        } catch (error) {
            console.log("Ocorreu algum erro ao fazer a requisição para a OpenRouteService API: ", error);
            res.status(500).send("Erro ao processar requisiçao externa.");
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).send(`Método ${req.method} não permitido.`);
    }
};