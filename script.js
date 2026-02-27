const tg = window.Telegram.WebApp;
tg.expand();

// ========== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ==========
const user = tg.initDataUnsafe?.user;
const TOTAL_NFT = 41; // 41 ФОТОГРАФИЯ

// Названия для NFT
const nftNames = [
    "Whip Cupcake #133069",
    "Stellar Rocket #37166",
    "Stellar Rocket #117704",
    "Diamond Hands #007",
    "To The Moon #420",
    "Alien Artifact #999",
    "Dragon Egg #001",
    "Magic Sword #123",
    "Ancient Shield #456",
    "Cyber Punk #777",
    "Neon City #888",
    "Samurai #999",
    "Golden Coin #111",
    "Silver Ring #222",
    "Bronze Medal #333",
    "Crystal Ball #444",
    "Magic Hat #555",
    "Flying Carpet #666",
    "Treasure Chest #777",
    "Legendary Sword #888",
    "Phoenix Feather #001",
    "Thunder Hammer #002",
    "Ice Wand #003",
    "Fire Blade #004",
    "Shadow Cloak #005",
    "Light Shield #006",
    "Dark Helm #007",
    "Royal Crown #008",
    "Ancient Tome #009",
    "Mystic Orb #010",
    "Elven Bow #011",
    "Dwarven Axe #012",
    "Goblin Dagger #013",
    "Dragon Scale #014",
    "Unicorn Horn #015",
    "Pegasus Wing #016",
    "Griffin Claw #017",
    "Sphinx Eye #018",
    "Phoenix Ash #019",
    "Dragon Heart #020",
    "Star Dust #021"
];

// ========== ЗАГРУЗКА NFT ==========
const nftGrid = document.getElementById('nftGrid');
if (nftGrid) {
    for (let i = 1; i <= TOTAL_NFT; i++) {
        const nameIndex = (i - 1) % nftNames.length;
        const price = (Math.random() * 100).toFixed(2);
        
        nftGrid.innerHTML += `
            <div class="nft-card" data-id="${i}">
                <img src="images/${i}.jpg" 
                     alt="NFT ${i}" 
                     onerror="this.src='https://via.placeholder.com/150/1a1a1a/00ff88?text=NFT+${i}'">
                <div class="nft-name">${nftNames[nameIndex]}</div>
                <div class="nft-price">${price} 🏆</div>
            </div>
        `;
    }
}

// ========== ПРОФИЛЬ ==========
if (user) {
    document.getElementById('profileName').textContent = user.first_name || 'User';
    document.getElementById('profileId').textContent = user.id || '-';
}

// ========== НАВИГАЦИЯ ==========
const storePage = document.getElementById('storePage');
const giftsPage = document.getElementById('giftsPage');
const profilePage = document.getElementById('profilePage');
const giftNavBtn = document.getElementById('giftNavBtn');
const profileNavBtn = document.getElementById('profileNavBtn');
const myGiftsBtn = document.getElementById('myGiftsBtn');
const backFromGifts = document.getElementById('backFromGifts');
const backFromProfile = document.getElementById('backFromProfile');

// Функция показа страницы
function showPage(page) {
    storePage.style.display = 'none';
    giftsPage.style.display = 'none';
    profilePage.style.display = 'none';
    
    if (page === 'store') storePage.style.display = 'block';
    if (page === 'gifts') giftsPage.style.display = 'block';
    if (page === 'profile') profilePage.style.display = 'block';
}

// Нижняя навигация
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        const page = item.dataset.page;
        showPage(page);
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Кнопка My gifts в меню
myGiftsBtn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('[data-page="gifts"]').classList.add('active');
    showPage('gifts');
    tg.HapticFeedback.impactOccurred('medium');
});

// Назад из My gifts
backFromGifts.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('[data-page="store"]').classList.add('active');
    showPage('store');
});

// Назад из Profile
backFromProfile.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('[data-page="store"]').classList.add('active');
    showPage('store');
});

// ========== МОДАЛКИ ==========
const replenishModal = document.getElementById('replenishModal');
const withdrawModal = document.getElementById('withdrawModal');
const addBtn = document.getElementById('addBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const closeReplenish = document.getElementById('closeReplenish');
const closeWithdraw = document.getElementById('closeWithdraw');
const managerLink = document.getElementById('managerLink');
const submitWithdraw = document.getElementById('submitWithdraw');

addBtn.addEventListener('click', () => {
    replenishModal.style.display = 'flex';
    tg.HapticFeedback.impactOccurred('heavy');
});

withdrawBtn.addEventListener('click', () => {
    withdrawModal.style.display = 'flex';
    tg.HapticFeedback.impactOccurred('heavy');
});

closeReplenish.addEventListener('click', () => {
    replenishModal.style.display = 'none';
});

closeWithdraw.addEventListener('click', () => {
    withdrawModal.style.display = 'none';
});

managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    replenishModal.style.display = 'none';
});

submitWithdraw.addEventListener('click', () => {
    const wallet = document.getElementById('tonWallet').value;
    const card = document.getElementById('cardNumber').value;
    
    if (wallet && card) {
        tg.showPopup({
            title: 'Заявка отправлена',
            message: 'Менеджер свяжется с вами',
            buttons: [{type: 'ok'}]
        });
        withdrawModal.style.display = 'none';
        document.getElementById('tonWallet').value = '';
        document.getElementById('cardNumber').value = '';
    } else {
        tg.showPopup({
            title: 'Ошибка',
            message: 'Заполните все поля',
            buttons: [{type: 'ok'}]
        });
    }
});

// ========== ВКЛАДКИ ==========
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ========== КЛИК ПО NFT ==========
document.querySelectorAll('.nft-card').forEach(card => {
    card.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.querySelector('.nft-name').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        tg.sendData(JSON.stringify({
            action: 'nft_click',
            id: id,
            name: name
        }));
    });
});

// ========== ЗАКРЫТИЕ МОДАЛОК ПО КЛИКУ ВНЕ ==========
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        replenishModal.style.display = 'none';
        withdrawModal.style.display = 'none';
    }
});

console.log(`✅ Загружено ${TOTAL_NFT} NFT`);
