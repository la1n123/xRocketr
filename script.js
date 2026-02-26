const tg = window.Telegram.WebApp;
tg.expand();

// Элементы
const myGiftsBtn = document.getElementById('myGiftsBtn');
const giftBtn = document.getElementById('giftBtn');
const profileBtn = document.getElementById('profileBtn');
const nftBtn = document.getElementById('nftBtn');
const giftsPage = document.getElementById('giftsPage');
const profilePage = document.getElementById('profilePage');
const backFromGifts = document.getElementById('backFromGifts');
const backFromProfile = document.getElementById('backFromProfile');
const replenishBtn = document.getElementById('replenishBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const managerModal = document.getElementById('managerModal');
const closeModal = document.getElementById('closeModal');
const managerLink = document.getElementById('managerLink');

// Функция скрыть все страницы
function hideAllPages() {
    giftsPage.style.display = 'none';
    profilePage.style.display = 'none';
    managerModal.style.display = 'none';
}

// My gift (верхняя кнопка в меню)
myGiftsBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAllPages();
    giftsPage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_gifts'}));
});

// My gift (нижняя навигация)
giftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAllPages();
    giftsPage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_gifts'}));
});

// Profile
profileBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAllPages();
    profilePage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_profile'}));
});

// NFT
nftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.showPopup({
        title: 'NFT',
        message: 'У вас 5 NFT\nВсего получено: 12',
        buttons: [{type: 'ok'}]
    });
    tg.sendData(JSON.stringify({action: 'nft'}));
});

// Назад из My gifts
backFromGifts.addEventListener('click', () => {
    giftsPage.style.display = 'none';
});

// Назад из Profile
backFromProfile.addEventListener('click', () => {
    profilePage.style.display = 'none';
});

// Пополнить
replenishBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    managerModal.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_replenish'}));
});

// Менеджер
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

// Кнопки Collection, Model, Back, Store, Season
document.querySelectorAll('.menu-item[data-action]').forEach(item => {
    if (item.id !== 'myGiftsBtn') {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            tg.HapticFeedback.impactOccurred('light');
            tg.sendData(JSON.stringify({action: action}));
            
            if (action !== 'gifts') {
                tg.showPopup({
                    title: this.querySelector('span').textContent,
                    message: 'Раздел откроется в следующем обновлении',
                    buttons: [{type: 'ok'}]
                });
            }
        });
    }
});

// Закрытие модалки по клику на фон
managerModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        managerModal.style.display = 'none';
    }
});
