import { Router } from "express";

const router = Router();

// Обработка GET-запроса на корень приложения (по URL http://localhost:3000/)
router.get("/", (req, res) => {
    res.redirect(301, "/home");
});

// GET: Получение главной страницы
router.get("/home", (req, res) => {
    res.status(200).send("Office-Plan Server is working.");
});

// GET: Получение страницы плана офиса
router.get("/home/office-plan", (req, res) => {
    res.status(200).send("Office Plan Page");
});

router.all("*", (req, res) => {
    res.send("Not Found");
});

export { router };
