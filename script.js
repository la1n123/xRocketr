const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user;

// Элементы
const giftButton = document.getElementById('giftButton');
const profileButton = document.getElementById('profileButton');
const giftPage = document.getElementById('giftPage');
const profilePage = document.getElementById('profilePage');
const mainHeader = document.querySelector('.header');
const mainMenu = document.querySelector('.tabs');
const quickFind = document.querySelector('.quick-find');
const buttonsGrid = document.querySelector('.buttons-grid');
const bottomNav = document.querySelector('.bottom-nav');

const backFromGift = document.getElementById('backFromGift');
const backFromProfile = document.getElementById('backFromProfile');
const replenishBtn = document.getElementById('replenishBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const managerModal = document.getElementById('managerModal');
const closeModal = document.getElementById('closeModal');
const managerLink = document.getElementById('managerLink');

// My gift
giftButton.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    
    mainHeader.style.display = 'none';
    mainMenu.style.display = 'none';
    quickFind.style.display = 'none';
    buttonsGrid.style.display = 'none';
    bottomNav.style.display = 'none';
    
    giftPage.style.display = 'block';
});

// Profile
profileButton.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    
    mainHeader.style.display = 'none';
    mainMenu.style.display = 'none';
    quickFind.style.display = 'none';
    buttonsGrid.style.display = 'none';
    bottomNav.style.display = 'none';
    
    profilePage.style.display = 'block';
});

// Назад
backFromGift.addEventListener('click', () => {
    mainHeader.style.display = 'block';
    mainMenu.style.display = 'flex';
    quickFind.style.display = 'flex';
    buttonsGrid.style.display = 'grid';
    bottomNav.style.display = 'flex';
    
    giftPage.style.display = 'none';
});

backFromProfile.addEventListener('click', () => {
    mainHeader.style.display = 'block';
    mainMenu.style.display = 'flex';
    quickFind.style.display = 'flex';
    buttonsGrid.style.display = 'grid';
    bottomNav.style.display = 'flex';
    
    profilePage.style.display = 'none';
});

// Пополнить
replenishBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    managerModal.style.display = 'flex';
});

// Менеджер
managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    managerModal.style.display = 'none';
});

// Закрыть модалку
closeModal.addEventListener('click', () => {
    managerModal.style.display = 'none';
});

// Вывести
withdrawBtn.addEventListener('click', () => {
    tg.showPopup({
        title: 'Вывод',
        message: 'Скоро будет доступно',
        buttons: [{type: 'ok'}]
    });
});

// Вкладки
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Кнопки
document.querySelectorAll('.button-item').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.querySelector('span').textContent;
        tg.HapticFeedback.impactOccurred('light');
        tg.sendData(JSON.stringify({action: text}));
    });
});

// NFT
document.querySelector('.nav-item:first-child').addEventListener('click', () => {
    tg.showPopup({
        title: 'NFT',
        message: 'У вас 5 NFT',
        buttons: [{type: 'ok'}]
    });
});
