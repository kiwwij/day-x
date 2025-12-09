function checkName() {
    const input = document.getElementById('nameInput').value.trim().toLowerCase();
    const errorMsg = document.getElementById('errorMsg');
    const inputField = document.getElementById('nameInput');
    
    // --- ПРОВЕРКА ДАТЫ ---
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = Январь, 1 = Февраль...
    const currentDay = now.getDate();    // 1, 2, 3...

    // Условие: Январь (0) И число от 1 до 3
    const isNewYear = (currentMonth === 0 && currentDay >= 1 && currentDay <= 3);
    
    // const isNewYear = true; 

    if (!isNewYear) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = "Подарки можно открывать только 1-3 января!🎄<br>Потерпи немного, всему своё время.";
        
        // Анимация тряски
        inputField.style.animation = "shake 0.5s";
        setTimeout(() => inputField.style.animation = "", 500);
        return; // Останавливаем функцию, дальше код не пойдет
    }
    // ---------------------

    // Логика перенаправления
    switch (input) {
        case 'максим':
            window.location.href = 'max_gift.html';
            break;
        case 'илья':
            window.location.href = 'ilya_gift.html';
            break;
        case 'данил м':
            window.location.href = 'danil_m_gift.html';
            break;
        case 'данил а':
            window.location.href = 'danil_a_gift.html';
            break;
        case 'саня':
            window.location.href = 'sanya_gift.html';
            break;
        default:
            // Если имя не найдено
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = "Хм, я не подготовил подарок для этого имени :(<br>ну или может норм имя введёшь?";
            
            // Анимация тряски
            inputField.style.animation = "shake 0.5s";
            setTimeout(() => inputField.style.animation = "", 500);
    }
}

// Чтобы работало нажатие на Enter
document.getElementById("nameInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkName();
    }
});