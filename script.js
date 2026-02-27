const tg = window.Telegram.WebApp;
tg.expand();

// Элементы
const pages = {
    store: document.getElementById('storePage'),
    gifts: document.getElementById('giftsPage'),
    profile: document.getElementById('profilePage'),
    season: document.getElementById('seasonPage')
};
const navItems = document.querySelectorAll('.nav-item');
const profileIcon = document.getElementById('profileIcon');
const backFromProfile = document.getElementById('backFromProfile');
const backFromSeason = document.getElementById('backFromSeason');

// Модалки
const managerModal = document.getElementById('managerModal');
const withdrawModal = document.getElementById('withdrawModal');
const closeManager = document.getElementById('closeManagerModal');
const closeWithdraw = document.getElementById('closeWithdrawModal');
const managerLink = document.getElementById('managerLink');
const submitWithdraw = document.getElementById('submitWithdraw');
const tonWallet = document.getElementById('tonWallet');
const cardNumber = document.getElementById('cardNumber');

// Кнопки на странице подарков
const addBtn = document.getElementById('addBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const sellBtn = document.getElementById('sellBtn');
const sendBtn = document.getElementById('sendBtn');
const bundleBtn = document.getElementById('bundleBtn');
const howToAddLink = document.getElementById('howToAddLink');
const giftTabs = document.querySelectorAll('.gift-tab');
const giftsTab = document.getElementById('giftsTabContent');
const offersTab = document.getElementById('offersTabContent');
const activityTab = document.getElementById('activityTabContent');

// Кнопка Invite friends
const inviteBtn = document.getElementById('inviteBtn');

// Переключение страниц через нижнее меню
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        Object.values(pages).forEach(p => p.classList.remove('active'));
        pages[page].classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Открыть профиль по клику на иконку
profileIcon.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages.profile.classList.add('active');
    tg.HapticFeedback.impactOccurred('medium');
});

// Назад из профиля
backFromProfile.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[data-page="store"]').classList.add('active');
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages.store.classList.add('active');
});

// Назад из сезона
backFromSeason.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[data-page="store"]').classList.add('active');
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages.store.classList.add('active');
});

// Вкладки на странице подарков
giftTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        giftTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.gift;
        giftsTab.style.display = target === 'gifts' ? 'block' : 'none';
        offersTab.style.display = target === 'offers' ? 'block' : 'none';
        activityTab.style.display = target === 'activity' ? 'block' : 'none';
    });
});

// Add – открыть менеджера
addBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    managerModal.style.display = 'flex';
});

// Withdraw – открыть форму вывода
withdrawBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    withdrawModal.style.display = 'flex';
});

// Менеджер – открыть чат
managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    managerModal.style.display = 'none';
});

// Закрыть модалку менеджера
closeManager.addEventListener('click', () => {
    managerModal.style.display = 'none';
});

// Закрыть модалку вывода
closeWithdraw.addEventListener('click', () => {
    withdrawModal.style.display = 'none';
});

// Отправка заявки на вывод
submitWithdraw.addEventListener('click', () => {
    const wallet = tonWallet.value.trim();
    const card = cardNumber.value.trim();
    if (!wallet || !card) {
        tg.showPopup({ title: 'Ошибка', message: 'Заполните все поля', buttons: [{ type: 'ok' }] });
        return;
    }
    tg.HapticFeedback.notificationOccurred('success');
    tg.showPopup({ title: 'Заявка отправлена', message: 'Менеджер свяжется с вами', buttons: [{ type: 'ok' }] });
    withdrawModal.style.display = 'none';
    tonWallet.value = '';
    cardNumber.value = '';
});

// Sell, Send, Bundle – заглушки
[sellBtn, sendBtn, bundleBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({ title: btn.textContent.trim(), message: 'Функция временно недоступна', buttons: [{ type: 'ok' }] });
    });
});

// How do I add gifts? – ссылка на бота
howToAddLink.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/xRocketgiftrobot');
});

// Invite friends
inviteBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    const text = 'Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!';
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(text)}`);
});

// Обработка остальных кнопок (Collection, Model, Back, Symbol, Quick find)
document.querySelectorAll('.icon-btn, .quick-find').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action || this.textContent.trim();
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({ title: action, message: 'Раздел в разработке', buttons: [{ type: 'ok' }] });
    });
});

// Вкладки на главной (All items, Collections, Bundles)
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Закрытие модалок по клику на фон
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            managerModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        }
    });
});
