import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { PORT } from "./config.js";
import { router as rootRouter } from "./routes/root.routes.js";
import { router as employeesRouter } from "./routes/employees.routes.js";
import { ApiError } from "./error/apiError.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/home/employees/", employeesRouter);
app.use("/", rootRouter);
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Internal Server Error." });
});

start();

function start() {
    app.listen(PORT, () => {
        console.log(`Application has started listening port ${PORT}`);
    });
}
