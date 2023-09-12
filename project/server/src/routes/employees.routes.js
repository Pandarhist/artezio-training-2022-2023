import { Router } from "express";
import { validateEmployee, isIdValid } from "../services/validator.service.js";
import { EmployeeService } from "../services/employee.service.js";

const employeeService = new EmployeeService();
const employeesRouter = Router();

employeesRouter.get("/", (req, res) => {
    if (req.query.filter) {
        console.log(req.query);
        res.status(200).send("Employees Page with sorting");
    } else {
        res.status(200).send("Employees Page");
    }
});

employeesRouter
    .route("/new")
    .get((req, res) => {
        res.status(200).send("Add Employee Page");
    })
    .post(async (req, res) => {
        const { id, fullName, technologyId, position, hiringDate, workspace } =
            req.body;
        const avatar = req.files.avatar;

        try {
            // TODO: валидация запроса
            const employee = await employeeService.create(
                { id, fullName, technologyId, position, hiringDate, workspace },
                avatar
            );

            res.json(employee);
            // res.status(200).send("Employee Added");
        } catch (err) {
            next(err);
        }
    });

employeesRouter.get("/:employeeId", async (req, res) => {
    if (!req.params.employeeId) {
        res.status(400).send("Bad Request: request body can't be empty.");
        return;
    }

    const employeeId = Number(req.params.employeeId);

    if (!isIdValid(employeeId)) {
        return;
    }

    try {
        const employee = await employeeService.getById(employeeId);

        res.json(employee);
        // res.status(200).send(`Employee Page - ${employeeId}`);
    } catch (error) {
        next(error);
    }
});

// GET: Получение страницы редактирования нового сотрудника
employeesRouter
    .route("/:employeeId/edit")
    .get((req, res) => {
        if (!req.params.employeeId) {
            res.status(400).send("Bad Request: employee id can't be empty.");

            return;
        }

        const employeeId = req.params.employeeId;
        res.status(200).send(`Edit Employee Page - ${employeeId}`);
    })
    .put(async (req, res) => {
        if (!req.body) {
            res.status(400).send("Bad Request: request body can't be empty.");
            return;
        }

        const { id } = req.params;
        const { fullName, technologyId, position, hiringDate, workspace } =
            req.body;
        const avatar = req.files.avatar;

        try {
            // TODO: валидация запроса
            const employee = await employeeService.update(
                { id, fullName, technologyId, position, hiringDate, workspace },
                avatar
            );

            res.json(employee);
            // res.status(200).send("Employee Added");
        } catch (err) {
            next(err);
        }
    });

export { employeesRouter };
