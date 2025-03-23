const body = document.body;
const docList = body.querySelector('#doc-list');
const navToggler = body.querySelectorAll('[data-toggle]');
const inpRecet = body.querySelectorAll('.inp .ic-cencel');
const selectBtn = body.querySelectorAll('.select__btn');
const selectChecked = body.querySelector('.select-checked');
const checkbox = body.querySelectorAll('.select .checkbox input');

if (docList) {
    docList.addEventListener('click', (e) => {
        const button = e.target.closest('tr.headline button');
        if (!button) return;

        const row = button.closest('tr.headline');
        const wasActive = row.classList.toggle('is_active');
        row.nextElementSibling?.classList.toggle('is_active', wasActive);

        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.toggle('ic-more', !wasActive);
            icon.classList.toggle('ic-less', wasActive);
        }

        document.querySelectorAll('tr.headline').forEach(el => {
            if (el !== row) {
                el.classList.remove('is_active');
                el.nextElementSibling?.classList.remove('is_active');
                const otherIcon = el.querySelector('button.fx-ac i');
                if (otherIcon) {
                    otherIcon.classList.replace('ic-less', 'ic-more');
                }
            }
        });
    });
}


navToggler.forEach(el => {
    const elId = el.getAttribute('data-toggle');
    const targetEl = body.querySelector(elId);
    if (localStorage.getItem(elId) === 'active') {
        targetEl?.classList.add('is_active');
    }

    el.addEventListener('click', function () {
        if (targetEl) {
            targetEl.classList.toggle('is_active');
            if (targetEl.classList.contains('is_active')) {
                localStorage.setItem(elId, 'active');
            } else {
                localStorage.removeItem(elId);
            }
        }
    });
});


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

