// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Загрузка данных
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mini App загружен с новым меню');
    
    // Если есть данные пользователя, можно их отобразить
    if (user) {
        console.log('Пользователь:', user);
    }
});

// Обработка вкладок (All items, Collections, Bundles)
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Отправляем вибрацию
        tg.HapticFeedback.impactOccurred('light');
        
        const tabName = this.textContent;
        console.log(`Выбрана вкладка: ${tabName}`);
        
        // Отправляем данные в бот
        const data = {
            action: 'tab_click',
            tab: tabName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка поиска
document.querySelector('.quick-find').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    tg.showPopup({
        title: 'Quick Find',
        message: 'Введите название предмета или коллекции',
        buttons: [
            {id: 'search', text: 'Поиск'},
            {type: 'cancel', text: 'Отмена'}
        ]
    });
});

// Обработка элементов меню (Collection и Model)
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.dataset.action;
        const itemName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        // Отправляем действие в бот
        const data = {
            action: action,
            item: itemName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
        
        // Показываем попап
        tg.showPopup({
            title: itemName,
            message: `Раздел "${itemName}" откроется в следующем обновлении!`,
            buttons: [{type: 'ok'}]
        });
    });
});

// Обработка нижней навигации (NFT, My gift, Profile)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const navAction = this.dataset.nav;
        const navName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.selectionChanged();
        
        // Отправляем в бот
        const data = {
            action: 'nav_click',
            section: navAction,
            name: navName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
        
        // Разная логика для разных кнопок
        switch(navAction) {
            case 'nft':
                tg.showPopup({
                    title: 'NFT',
                    message: 'Ваши NFT коллекции появятся здесь',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'gift':
                tg.showPopup({
                    title: 'My Gift',
                    message: 'У вас 0 подарков. Получите подарки в сезоне!',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'profile':
                const userInfo = user ? 
                    `${user.first_name} ${user.last_name || ''}\nID: ${user.id}` : 
                    'Информация загружается...';
                
                tg.showPopup({
                    title: 'Profile',
                    message: userInfo,
                    buttons: [{type: 'ok'}]
                });
                break;
        }
    });
});

// Обработка нижних кнопок (Back, Store, Season)
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const btnName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        const data = {
            action: action,
            button: btnName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
        
        switch(action) {
            case 'back':
                tg.showPopup({
                    title: 'Назад',
                    message: 'Вернуться в предыдущее меню?',
                    buttons: [
                        {id: 'back_yes', text: 'Да'},
                        {type: 'cancel', text: 'Нет'}
                    ]
                });
                break;
                
            case 'store':
                tg.showPopup({
                    title: 'Store',
                    message: 'Добро пожаловать в магазин!',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'season':
                tg.showPopup({
                    title: 'Season',
                    message: 'Сезон Spring 2024\nПрогресс: 0%\nДо конца: 15 дней',
                    buttons: [{type: 'ok'}]
                });
                break;
        }
    });
});

// Функция обновления баланса
function updateBalance(amount) {
    document.querySelector('.balance-amount').textContent = amount;
    
    const data = {
        action: 'update_balance',
        balance: amount,
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
}

// Функция получения подарка
function receiveGift(giftName) {
    const data = {
        action: 'new_gift',
        gift: giftName,
        userId: user?.id
    };
    
    tg.sendData(JSON.stringify(data));
    
    tg.showPopup({
        title: 'Подарок получен!',
        message: `Вы получили: ${giftName}`,
        buttons: [{type: 'ok'}]
    });
}

// Обработка закрытия попапов
tg.onEvent('popupClosed', function(event) {
    if (event.button_id === 'back_yes') {
        console.log('Возврат назад');
        // Здесь можно добавить логику возврата
    }
});

// Отправка данных при закрытии
window.addEventListener('beforeunload', function() {
    const data = {
        action: 'close_app',
        userId: user?.id,
        timestamp: new Date().toISOString()
    };
    tg.sendData(JSON.stringify(data));
});

console.log('Mini App загружен с новым меню: NFT, My gift, Profile снизу');
