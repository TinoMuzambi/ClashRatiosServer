import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import request from "request";
import { Request, Response } from "express";

// Setup
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/player/:id", (req: Request, res: Response) => {
	const baseURL = "https://api.clashofclans.com/v1/players/%23" + req.params.id;

	const options = {
		proxy: process.env.HTTP_PROXY,
		url: baseURL,
		headers: {
			"content-type": "application/json; charset=utf-8",
			Authorization: "Bearer " + process.env.CLASH_KEY,
		},
	};

	const cb = (error: any, response: any, body: any) => {
		if (!error && response.statusCode == 200) {
			res.status(200).send(body);
		} else {
			console.log(error);
			res.status(500).send("Error yo");
		}
	};

	request(options, cb);
});

app.get("/api/clan/:id", (req: Request, res: Response) => {
	const baseURL = "https://api.clashofclans.com/v1/clans/%23" + req.params.id;

	const options = {
		proxy: process.env.HTTP_PROXY,
		url: baseURL,
		headers: {
			"content-type": "application/json; charset=utf-8",
			Authorization: "Bearer " + process.env.CLASH_KEY,
		},
	};

	const cb = (error: any, response: any, body: any) => {
		if (!error && response.statusCode == 200) {
			res.status(200).send(body);
		} else {
			console.log(error);
			res.status(500).send("Error yo");
		}
	};

	request(options, cb);
});

app.get("/", (req: Request, res: Response) =>
	res.status(200).send("Welcome to the Clash backend.")
);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
