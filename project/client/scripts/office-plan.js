/*
 * Тестовый JavaScript-файл для демонстрации требуемой функциональности приложения
 * по работе с элементами плана офиса.
 *
 * Требуется реализовать описываемую функциональность в React-компонентах.
 */

const floorPlanSvg = document.querySelector('.office-plan');

// Делегирование события
// Прослушиваем клик через всплытие на родительский <SVG> элемент
floorPlanSvg.addEventListener('click', e => {
    const { target } = e;

    // Если клик был на элемент <path class="workspace">, описываемый контуры рабочего места.
    if (target.classList.contains('workspace')) {
        // Извлекаем номер рабочего места из data-атрибута
        const workspaceNumber = Number(target.dataset.workspace);
        // Устанавливаем текущее место как выбранное.
        // У предыдущего активного рабочего места удаляем класс "active", а для текущего - добавляем.
        document.querySelectorAll('.workspace.active').forEach(el => el.classList.remove('active'));
        target.classList.add('active');

        showWorkspaceInfo(workspaceNumber);
    }
});

/**
 * Отобразить выбранного рабочее место.
 *
 * @param number номер рабочего места
 */
function showWorkspaceInfo(number) {
    const workspaceInfoEl = document.querySelector('.workspace-info');
    workspaceInfoEl.style.display = 'block';

    // Показываем номер выбранного рабочего места
    workspaceInfoEl.querySelector('.workspace-info__number').textContent = number;

    // TODO: Получить данные о сотруднике на выбранном рабочем месте
    // TODO: Отобразить данные о сотруднике в HTML-элементах

    // -------------------------- //

    // TODO: Обработать ситуацию, когда выбранного рабочее место не занято
}
