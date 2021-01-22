const panels = document.querySelectorAll('.panel__item')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('panel__item--active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('panel__item--active')
    })
}
