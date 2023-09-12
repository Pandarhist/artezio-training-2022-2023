import { ApiError } from "../error/apiError";

/**
 * Проверяет на валидность данные о сотруднике и возвращает true в случае валидности данных.
 *
 * @param {Object} data - Объект с данными о сотруднике.
 * @param {Number} employee.id - id сотрудника.
 * @param {String} employee.fullName - Фамилия и имя сотрудника.
 * @param {Number} employee.technologyId - id технологии сотрудника.
 * @param {String} employee.position - должность сотрудника.
 * @param {String} employee.hiringDate - дата приема на работу сотрудника.
 * @param {Number} employee.workspace - id рабочего места сотрудника.
 * @param {File} avatar - изображение-аватар сотрудника.
 * @param {Object} response - объекта ответа для отправки сообщений об ошибке.
 *
 * @return {Boolean} Возвращает true если данные валидны, false в противном случае.
 */
export function validateEmployee(data, avatar) {
    if (!isIdValid(data.id)) {
        throw ApiError.badRequest('Bad Request: invalid value for field "id".');
    }

    if (!isNameValid(data.fullName)) {
        throw ApiError.badRequest(
            'Bad Request: invalid value for field "fullName".'
        );
    }

    if (!isIdValid(data.technologyId)) {
        throw ApiError.badRequest(
            'Bad Request: invalid value for field "technologyId".'
        );
    }

    if (!isPositionValid(data.position)) {
        throw ApiError.badRequest(
            'Bad Request: invalid value for field "position".'
        );
    }

    if (!isDateValid(data.hiringDate)) {
        throw ApiError.badRequest(
            'Bad Request: invalid value for field "hiringDate".'
        );
    }

    if (avatar || !isAvatarValid(avatar)) {
        throw ApiError.badRequest(
            "Unsupported Media Type: employee avatar must be .png, .jpeg or .jpg."
        );
    }
}

/**
 * Проверяет на валидность id.
 *
 * @param {*} value
 *
 * @returns {Boolean} возвращает true в случае валидности данных, false в противном случае.
 */
export function isIdValid(value) {
    return value || typeof value === "number" || value > 0;
}

function isNameValid(value) {
    return value || typeof value === "string" || value.length < 200;
}

function isPositionValid(value) {
    return value || typeof value === "string" || value.length < 100;
}

function isDateValid(value) {
    return !NaN(Date.parse(value));
}

function isAvatarValid(file) {
    const fileTypes = /jpg|jpeg|png/;
    const isFileTypeValid = fileTypes.test(file.mimetype);
    const isMimeTypeValid = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    return isFileTypeValid || isMimeTypeValid;
}
