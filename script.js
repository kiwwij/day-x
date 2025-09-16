document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const toggleBtn = document.getElementById("musicToggle");

    if (!music || !toggleBtn) return;

    // Попытка автозапуска музыки
    music.volume = 0.5; // громкость 50%
    const playMusic = () => {
        music.play().catch(() => {
            console.log("Автовоспроизведение заблокировано браузером. Нужен клик пользователя.");
        });
    };
    playMusic();

    // Переключатель
    toggleBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggleBtn.textContent = "🔊";
        } else {
            music.pause();
            toggleBtn.textContent = "🔇";
        }
    });
});


// ======== Универсальная функция для звука ========
function playSound(id) {
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(err => console.log('Звук не воспроизведён:', err));
  }
}

// ======== Конфетти с ЗВУКОМ 🎆 ========
function createConfetti() {
  const colors = ['#ff5e62', '#66ccff', '#ffcc66', '#6acc66', '#cc66ff'];
  playSound('sound-confetti');

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 15 + 5 + 'px';
    confetti.style.height = Math.random() * 15 + 5 + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    document.body.appendChild(confetti);

    const animation = confetti.animate([
      { top: '-10px', transform: 'rotate(0deg)' },
      { top: '100vh', transform: `rotate(${Math.random() * 1000}deg)` }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
    });

    animation.onfinish = () => confetti.remove();
  }
}

// ======== Лопание шариков 🎈 ========
function popBalloon(el) {
  if (el.dataset.popped === 'true') return;

  playSound('sound-pop');

  const wishes = [
    "Счастья!", "Здоровья!", "Удачи!",
    "Любви!", "Деняг!", "Успехов!"
  ];

  el.style.transition = 'transform 0.3s, opacity 0.3s';
  el.style.transform = 'scale(1.5)';
  el.style.opacity = '0';

  setTimeout(() => {
    el.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    el.style.backgroundColor = 'transparent';
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
    el.style.boxShadow = 'none';
    el.style.cursor = 'default';
    el.dataset.popped = 'true';
  }, 300);
}

let correctCount = 0; // Количество правильных ответов
let totalCorrect = 3; // Всего правильных ответов
let answered = new Set(); // Чтобы нельзя было кликнуть один вариант несколько раз

function checkAnswer(element) {
    const result = document.getElementById('quiz-result');

    // Если вариант уже выбирали
    if (answered.has(element)) return;

    answered.add(element);

    // Проверяем, правильный ли ответ
    if (element.dataset.correct === "true") {
        correctCount++;
        element.style.backgroundColor = "#6acc66"; // зелёный
        element.style.color = "#fff";

        playSound('sound-correct'); // ✅ Звук правильного ответа

        result.textContent = `Отлично! Ты нашёл ${correctCount} из ${totalCorrect} правильных ответов. 🎉`;

        if (correctCount === totalCorrect) {
            result.textContent = "Поздравляю! Ты нашёл все правильные ответы! 🏆";
        }
    } else {
        element.style.backgroundColor = "#ff5e62"; // красный
        element.style.color = "#fff";

        playSound('sound-wrong'); // ❌ Звук неправильного ответа

        result.textContent = "Упс, этот ответ неправильный 😢";
    }
}

// ======== Проверка дня рождения ========
function checkBirthday() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  if (currentMonth === 5 && currentDay === 8) {
    document.getElementById('birthdayContent').style.display = 'block';
    updateCountdown();
    setInterval(updateCountdown, 1000);
  } else {
    if (!window.location.href.includes('countdown.html')) {
      window.location.href = 'countdown.html';
    }
  }
}

// ======== Таймер на странице поздравления ========
function updateCountdown() {
  const now = new Date();
  const nextBirthday = new Date(now.getFullYear(), 5, 8);

  if (now > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const diff = nextBirthday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days + 'д';
  document.getElementById('hours').textContent = hours + 'ч';
  document.getElementById('minutes').textContent = minutes + 'м';
  document.getElementById('seconds').textContent = seconds + 'с';
}

// ======== Таймер на странице ожидания ========
function updateCountdownPage() {
  const now = new Date();
  const nextBirthday = new Date(now.getFullYear(), 5, 8);

  if (now > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const diff = nextBirthday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('countdown-days').textContent = days;
  document.getElementById('countdown-hours').textContent = hours;
  document.getElementById('countdown-minutes').textContent = minutes;
  document.getElementById('countdown-seconds').textContent = seconds;
}

// ======== Динамическая ссылка Google Calendar ========
function getGoogleCalendarLink() {
  const now = new Date();
  let year = now.getFullYear();

  const birthdayThisYear = new Date(year, 5, 8);
  if (now > birthdayThisYear) {
    year++;
  }

  const start = `${year}0608T000000Z`;
  const end = `${year}0608T235900Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Зайди+на+сайт!+https://kiwwij.github.io/day-x/&details=Не+забудь+зайти+на+сайт!&dates=${start}/${end}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('calendarLink');
  if (link) {
    link.href = getGoogleCalendarLink();
  }
});

// ======== Музыка на countdown.html ========
function initCountdownMusic() {
  const music = document.getElementById('countdown-music');
  const btn = document.getElementById('musicToggle');
  if (!music || !btn) return;

  music.volume = 0.4;
  let isPlaying = false;

  const playMusic = () => {
    music.play().then(() => {
      isPlaying = true;
      btn.textContent = '🔊';
    }).catch(() => {
      console.log('Автовоспроизведение заблокировано');
      btn.textContent = '🔇';
    });
  };

  // Попытка автозапуска при загрузке
  playMusic();

  // Если заблокировано, запускаем после первого клика
  const userInteractionHandler = () => {
    if (!isPlaying) playMusic();
    window.removeEventListener('click', userInteractionHandler);
    window.removeEventListener('keydown', userInteractionHandler);
  };
  window.addEventListener('click', userInteractionHandler);
  window.addEventListener('keydown', userInteractionHandler);

  // Управление кнопкой
  btn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      btn.textContent = '🔇';
    } else {
      music.play().catch(err => console.log('Ошибка воспроизведения:', err));
      btn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
  });
}

// ======== Автозапуск ========
window.onload = function () {
  if (window.location.href.includes('countdown.html')) {
    // Страница ожидания
    updateCountdownPage();
    setInterval(updateCountdownPage, 1000);
    initCountdownMusic(); // музыка
    createSeasonEffect(); // фон
  } else {
    // Главная страница
    checkBirthday();
  }
};

// ======== Сезонный фон ========
function createSeasonEffect() {
  const month = new Date().getMonth(); // 0 = январь
  if (month === 11 || month <= 1) {
    createSnow();
  } else if (month >= 2 && month <= 4) {
    createRain();
  } else if (month >= 5 && month <= 7) {
    createSummerFlowers();
  } else if (month >= 8 && month <= 10) {
    createLeaves();
  }
}

// СНЕГ ❄️
function createSnow() {
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.textContent = '❄';
    document.body.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 8000);
  }, 200);
}

// ДОЖДЬ 🌧️
function createRain() {
  setInterval(() => {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(drop);

    setTimeout(() => drop.remove(), 2000);
  }, 100);
}

// ЛЕТО 🌺
function createSummerFlowers() {
  const flowers = ['🌸', '🌼', '🌺'];
  setInterval(() => {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.position = 'fixed';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = '-20px';
    flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
    flower.style.zIndex = '0';
    flower.style.pointerEvents = 'none';
    flower.style.transition = 'all 5s linear';

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.style.top = '100vh';
      flower.style.left = parseFloat(flower.style.left) + (Math.random() * 50 - 25) + 'vw';
      flower.style.opacity = '0.8';
    }, 50);

    setTimeout(() => flower.remove(), 5000);
  }, 300);
}

// ЛИСТЬЯ 🍂
function createLeaves() {
  const colors = ['#FFA500', '#FF8C00', '#FFD700', '#228B22'];
  setInterval(() => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
    leaf.textContent = '🍂';
    document.body.appendChild(leaf);

    setTimeout(() => leaf.remove(), 8000);
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    const aiText = document.getElementById('aiText');
    if (!aiText) return;

    aiText.addEventListener('click', () => {
        aiText.classList.toggle('active');
    });
});

// ===== Галерея с модальным окном =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');

    // Описания для картинок
    const descriptions = [
        "Максим на своём ДР много лет назад 🎉 🤨😲",
        "Лучшие друзья навсегда 🤝 💀😲",
        "Школьники ✨ 😎😏",
        "Ещё больше школьников 🙂😁🐐😁",
        "ЩЕ НЕ ВМЕРЛА УКРАЇНА... 💙💛🫡"
    ];

    let currentIndex = 0;

    // Открыть модальное окно
    function openModal(index) {
        currentIndex = index;
        modal.style.display = "block";
        modalImg.src = images[index].src;
        caption.textContent = descriptions[index] || images[index].alt;
    }

    // Закрыть модальное окно
    function closeModal() {
        modal.style.display = "none";
    }

    // Следующее фото
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openModal(currentIndex);
    }

    // Предыдущее фото
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openModal(currentIndex);
    }

    // События для каждой картинки
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Клик по кнопке закрытия
    closeBtn.addEventListener('click', closeModal);

    // Стрелки внутри модалки
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Управление клавиатурой
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "block") {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        }
    });

    // Клик по фону — закрытие
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
