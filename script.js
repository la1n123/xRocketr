const tg = window.Telegram.WebApp;
tg.expand();

// Элементы
const myGiftsBtn = document.getElementById('myGiftsBtn');
const giftsPage = document.getElementById('giftsPage');
const backFromGifts = document.getElementById('backFromGifts');
const replenishBtn = document.getElementById('replenishBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const managerModal = document.getElementById('managerModal');
const closeModal = document.getElementById('closeModal');
const managerLink = document.getElementById('managerLink');

// Открыть My gifts
myGiftsBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    giftsPage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_gifts'}));
});

// Назад из My gifts
backFromGifts.addEventListener('click', () => {
    giftsPage.style.display = 'none';
});

// Пополнить
replenishBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    managerModal.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_replenish'}));
});

// Нажатие на менеджера
managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    managerModal.style.display = 'none';
    tg.sendData(JSON.stringify({action: 'manager_chat'}));
});

// Закрыть модалку
closeModal.addEventListener('click', () => {
    managerModal.style.display = 'none';
});

// Вывести
withdrawBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.showPopup({
        title: 'Вывод',
        message: 'Функция вывода временно недоступна',
        buttons: [{type: 'ok'}]
    });
    tg.sendData(JSON.stringify({action: 'withdraw'}));
});

// Вкладки
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
        tg.sendData(JSON.stringify({
            action: 'tab',
            tab: this.textContent
        }));
    });
});

// Quick find
document.querySelector('.quick-find').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.sendData(JSON.stringify({action: 'quick_find'}));
});

// Все остальные кнопки (Collection, Model, Back, Store, Season)
document.querySelectorAll('.menu-item[data-action]').forEach(item => {
    if (item.id !== 'myGiftsBtn') {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            tg.HapticFeedback.impactOccurred('light');
            tg.sendData(JSON.stringify({action: action}));
        });
    }
});

// Закрытие модалки по клику на фон
managerModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        managerModal.style.display = 'none';
    }
});
