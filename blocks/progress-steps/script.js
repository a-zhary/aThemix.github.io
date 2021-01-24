const progress = document.querySelector('.progress__line');
const prev = document.querySelector('.progress__btn--prev');
const next = document.querySelector('.progress__btn--next');
const circles = document.querySelectorAll('.progress__circle');

let currentActive = 1;

prev.addEventListener('click', () => {
    currentActive--;

    if (currentActive < 1) {
        currentActive = 1
    }

    update();
});

next.addEventListener('click', () => {
    currentActive++;

    if (currentActive > circles.length) {
        currentActive = circles.length
    }

    update();
});

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('progress__circle--active')
        } else {
            circle.classList.remove('progress__circle--active')
        }
    })

    const actives = document.querySelectorAll('.progress__circle--active');

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

    if (currentActive === 1) {
        console.log(1)
        prev.disabled = true
    } else if (currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}
