// Тестовый код с запросом на express-сервер
// Служит для проверки работоспособности сервера и возможности получать ответы от него.
fetch('http://localhost:3000')
    .then(response => response.text())
    .then(data => {
        console.log('Получен ответ от серверной части: ', data)

        // Добавление ответа в элемент <main> на главной странице в виде заголовка h1
        const h1 = document.createElement('h1');
        h1.textContent = data;

        document.querySelector('main').append(h1);
    })
    .catch(error => {
        console.error('Ошибка отправки тестового запроса на сервер: ', error);
    });
