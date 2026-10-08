// ========== FAQ АККОРДЕОН ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Закрываем все
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Открываем текущий
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ========== ФОРМА БРОНИРОВАНИЯ ==========
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (name.length < 2) {
            alert('Введите имя');
            return;
        }

        if (phone.length < 10) {
            alert('Введите корректный телефон');
            return;
        }

        // Здесь можно отправить в Telegram через n8n
        alert(`Спасибо, ${name}! Мы перезвоним в течение 5 минут на номер ${phone}.`);

        bookingForm.reset();
    });
}

// ========== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ССЫЛОК ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
