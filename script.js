// ========== FAQ АККОРДЕОН ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        });

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

        alert('Спасибо, ' + name + '! Мы перезвоним в течение 5 минут на номер ' + phone + '.');
        bookingForm.reset();
    });
}

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
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

// ========== БУРГЕР-МЕНЮ ==========
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });
}

// ========== ТАЙМЕР ДО ТУРНИРА ==========
function startTimer() {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;

    const targetDate = new Date('2026-10-15T12:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            timerEl.innerHTML = '<div class="timer-block"><strong>LIVE</strong><span>турнир идёт</span></div>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const blocks = timerEl.querySelectorAll('.timer-block strong');
        if (blocks.length === 4) {
            blocks[0].textContent = String(days).padStart(2, '0');
            blocks[1].textContent = String(hours).padStart(2, '0');
            blocks[2].textContent = String(minutes).padStart(2, '0');
            blocks[3].textContent = String(seconds).padStart(2, '0');
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}
startTimer();

// ========== АНИМИРОВАННЫЙ СЧЁТЧИК ==========
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 40);

                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(interval);
                    } else {
                        el.textContent = current;
                    }
                }, 30);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}
startCounters();

// ========== SCROLL PROGRESS + SCROLL TOP ==========
const progressBar = document.getElementById('scroll-progress');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) progressBar.style.width = progress + '%';

    if (scrollTopBtn) {
        if (scrollTop > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== ПЛАВНОЕ ПОЯВЛЕНИЕ (REVEAL) ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
