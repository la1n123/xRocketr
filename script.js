// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Загрузка данных
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portals Clone загружен');
});

// Обработка вкладок
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        tg.HapticFeedback.impactOccurred('light');
        
        const data = {
            action: 'tab_click',
            tab: this.textContent,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка Quick find
document.querySelector('.quick-find').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    const data = {
        action: 'quick_find',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Обработка основных кнопок
document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const name = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        const data = {
            action: action,
            button: name,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка нижней навигации
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const navAction = this.dataset.nav;
        const navName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.selectionChanged();
        
        const data = {
            action: 'nav_click',
            section: navAction,
            name: navName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Отправка данных при закрытии
window.addEventListener('beforeunload', function() {
    const data = {
        action: 'close_app',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});
