// Настройки: когда именно срабатывает анимация
const observerOptions = {
    threshold: 0.5 // 50% элемента должно быть видно
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Если элемент вошел в зону видимости
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Перестаем следить за ним, чтобы анимация не повторялась
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Выбираем все элементы, которые мы хотим анимировать
const elementsToAnimate = document.querySelectorAll(
    '.about, .topabout, .topskills, .skill-name, .skill-bar, .project-button, .project-name, .project-about, .project-language, .project-language-button, .project-language, .topcontacts, .contacts, .copyright'
);

// Запускаем слежку за каждым
elementsToAnimate.forEach(el => {
    observer.observe(el);
});
