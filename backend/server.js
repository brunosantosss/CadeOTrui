// https://api.openrouteservice.org/v2/directions/driving-hgv?api_key=5b3ce3597851110001cf62487d62eddd40584e01bcbf33b38ebc3ece&start=-38.519108392280614,-3.903327384920879&end=-38.50735610016043,-3.906693360968365

import https from "https";
import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/gps", (req, res) => {
    const { latitude, longitude } = req.body;

    console.log(`Informações de GPS recebidas com êxito | Latitude: ${latitude} | Longitude: ${longitude}`);
    res.status(200).send("Dados recebidos com sucesso.");
});

const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(PORT, '192.168.18.131', () => {
    console.log(`Servidor rodando em https://192.168.18.131:${PORT}`);
});