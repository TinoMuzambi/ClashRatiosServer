import express, { Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import request, {
	CoreOptions,
	RequestCallback,
	Response as ReqResponse,
} from "request";

// Setup
const app: Express = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/player/:id", (req: Request, res: Response) => {
	const baseURL: string =
		"https://api.clashofclans.com/v1/players/%23" + req.params.id;

	const options: CoreOptions = {
		proxy: process.env.HTTP_PROXY,

		headers: {
			"content-type": "application/json; charset=utf-8",
			Authorization: "Bearer " + process.env.CLASH_KEY,
		},
	};

	const cb: RequestCallback = (
		error: Error,
		response: ReqResponse,
		body: any
	) => {
		if (!error && response.statusCode === 200) {
			const JSONBody = JSON.parse(body);
			res.status(200).send({
				tag: JSONBody.tag,
				name: JSONBody.name,
				xp: JSONBody.expLevel,
				trophies: JSONBody.trophies,
				donations: JSONBody.donations,
				donationsReceived: JSONBody.donationsReceived,
			});
		} else {
			console.error(error);
			res.status(500).send(response.statusCode);
		}
	};

	request(baseURL, options, cb);
});

app.get("/", (req: Request, res: Response) =>
	res.status(200).send("Welcome to the ClashRatios backend.")
);

// Listen
const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
