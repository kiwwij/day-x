// 1. Проверяем состояние купонов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    // Список всех ID купонов
    const couponIds = ['coupon1', 'coupon2', 'coupon3'];

    couponIds.forEach(id => {
        // Если в памяти есть запись, что купон использован
        if (localStorage.getItem(id) === 'used') {
            const element = document.getElementById(id);
            if (element) {
                markAsUsed(element, false); // false = без уведомления
            }
        }
    });
});

function startCelebration() {
    // Твой код конфетти (оставляем без изменений)
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());

    document.getElementById('hiddenContent').classList.add('visible');
    setTimeout(() => {
        document.getElementById('hiddenCoupons').classList.add('visible');
    }, 500);
    
    setTimeout(() => {
        document.getElementById('hiddenContent').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// 2. Основная функция клика
function useCoupon(element) {
    // Проверяем, не использован ли уже
    if (!element.classList.contains('used')) {
        // Сохраняем в память браузера ID этого купона
        localStorage.setItem(element.id, 'used');
        
        // Визуально помечаем и показываем уведомление
        markAsUsed(element, true);
    }
}

// 3. Вспомогательная функция для смены вида
function markAsUsed(element, showAlert) {
    element.classList.add('used');
    // Меняем текст статуса на украинский
    element.querySelector('.status').innerText = "Використано"; 
    
    if (showAlert) {
        alert("Купон активовано! Зроби скріншот.");
    }
}