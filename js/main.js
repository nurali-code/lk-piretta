const body = document.body;
const togglers = body.querySelectorAll('[data-toggle]');
const inpRecet = body.querySelectorAll('.inp .ic-cencel');
const selectBtn = body.querySelectorAll('.select__btn');
const selectChecked = body.querySelector('.select-checked');
const checkbox = body.querySelectorAll('.select .checkbox input');

togglers.forEach(el => {
    el.addEventListener('click', function (e) {
        const elId = this.getAttribute('data-toggle')
        body.querySelector(`${elId}`).classList.toggle('is_active')
    })
})

inpRecet.forEach(el => {
    el.onclick = () => { el.parentElement.querySelector('input').value = '' }
})

selectBtn.forEach(el => {
    el.onclick = () => { el.classList.toggle('is_active') }
})

body.addEventListener('click', (event) => {
    if (!event.target.closest('.select')) {
        selectBtn.forEach(el => { el.classList.remove('is_active') })
    }
});

checkbox.forEach(el => {
    el.addEventListener('change', function () {
        const elId = el.id
        if (el.checked) {
            const elText = el.nextElementSibling.textContent
            const elBox = `<label for="${elId}" class="select-selected fx-ac"> ${elText}<i class="ic-cencel"></i></label>`
            selectChecked.insertAdjacentHTML('beforeend', elBox);
        } else {
            selectChecked.querySelector(`label[for="${elId}"]`).remove()
        }
        if (selectChecked.childElementCount == 0) { selectChecked.style.display = 'none' }
        else { selectChecked.style = '' }
    })
})

