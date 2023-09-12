import { Employee as EmployeeDao } from "../dao/employee.dao.js";
import { FileService } from "./file.service.js";

const fileService = new FileService();
const employeeDAO = new EmployeeDao();
const workspacesArrangementDAO = new workspacesArrangementDAO();

class EmployeeService {
    async create(employeeData, avatar, url) {
        try {
            const avatarPath = await fileService.saveFile(avatar);
            employeeData.avatar = url + avatarPath;

            const employee = await employeeDAO.create(employeeData);
            const workspace = await workspacesArrangementDAO.create({
                employee: employee.id,
                workspace: employee.workspaceId,
            });

            return employee;
        } catch (error) {
            result(error);
        }
    }
    async getById(id) {
        try {
            const employee = await employeeDAO.getById(id);
            const technology = await technologyDAO.getById(
                employee.technologyId
            );

            employee.technology = technology.t_name;

            return employee;
        } catch (error) {
            result(error);
        }
    }
    async getAll(result) {
        try {
            const employees = await employeeDAO.getAll(result);
            return employees;
        } catch {
            result(error);
        }
    }
    async update(id, employeeData, avatar) {
        try {
            const avatarPath = await fileService.saveFile(avatar);
            employeeData.avatar = url + avatarPath;

            const updatedEmployee = await employeeDAO.update(id, employeeData);

            return updatedEmployee;
        } catch (error) {
            result(error);
        }
    }
}

export { EmployeeService };
