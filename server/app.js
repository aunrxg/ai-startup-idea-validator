import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

import router from "./routes/ideas.js"

app.use("/api/v1/ideas", router);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
});

export { app };
