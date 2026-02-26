const tg = window.Telegram.WebApp;
tg.expand();

// Элементы
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

// Функция скрыть все
function hideAll() {
    giftsPage.style.display = 'none';
    profilePage.style.display = 'none';
    managerModal.style.display = 'none';
}

// MY GIFT (снизу)
giftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAll();
    giftsPage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_gifts'}));
});

// PROFILE (снизу)
profileBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAll();
    profilePage.style.display = 'block';
    tg.sendData(JSON.stringify({action: 'open_profile'}));
});

// NFT (снизу)
nftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.showPopup({
        title: 'NFT',
        message: 'У вас 5 NFT',
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

// Клик по менеджеру
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
        tg.sendData(JSON.stringify({action: 'tab', tab: this.textContent}));
    });
});

// Quick find
document.querySelector('.quick-find').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.sendData(JSON.stringify({action: 'quick_find'}));
});

// Кнопки сверху (Collection, Model, Back, Store, My gifts, Season)
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.dataset.action;
        tg.HapticFeedback.impactOccurred('light');
        tg.sendData(JSON.stringify({action: action}));
        
        if (action !== 'gifts') {
            tg.showPopup({
                title: this.querySelector('span').textContent,
                message: 'Раздел откроется позже',
                buttons: [{type: 'ok'}]
            });
        }
    });
});

// Закрыть модалку по клику на фон
managerModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        managerModal.style.display = 'none';
    }
});
