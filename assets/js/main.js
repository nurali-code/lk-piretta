const body = document.body,
    docList = body.querySelector('#doc-list'),
    navToggler = body.querySelectorAll('[data-toggle]'),
    inpRecet = body.querySelectorAll('.inp .ic-cencel'),
    selectBtn = body.querySelectorAll('.select__btn'),
    selectChecked = body.querySelector('.select-checked'),
    checkbox = body.querySelectorAll('.select .checkbox input');

// Функция применения темы
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Обработчик переключения
document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
});

// Проверка сохранённой темы при загрузке
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
    document.querySelector(`input[value="${savedTheme}"]`).checked = true;
}

// Опционально: синхронизация с системными настройками
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
if (!savedTheme && systemDark.matches) {
    setTheme('dark');
    document.querySelector('input[value="dark"]').checked = true;
}

// >>>>>>>>>>>>>>>> Размер текста:

const html = document.documentElement;
const rs = document.querySelector('#resize');
const rsInp = rs.querySelector('input');
let baseFontSize = parseFloat(getComputedStyle(html).fontSize);

const loadFontSize = () => {
    let savedSize = localStorage.getItem('fontSize') || '100%';
    rsInp.value = savedSize;
    html.style.fontSize = (baseFontSize * parseFloat(savedSize) / 100) + 'px';
};

const updateFontSize = (change) => {
    let newPercentage = Math.max(1, (parseFloat(rsInp.value) || 100) + change);
    rsInp.value = newPercentage + '%';
    html.style.fontSize = (baseFontSize * newPercentage / 100) + 'px';
    localStorage.setItem('fontSize', newPercentage + '%');
};

rs.querySelector('.--add').addEventListener('click', () => updateFontSize(1));
rs.querySelector('.--remove').addEventListener('click', () => updateFontSize(-1));
rs.querySelector('.--reset').addEventListener('click', () => {
    rsInp.value = '100%';
    html.style.fontSize = '';
    html.style.fontSize = baseFontSize + 'px';
    localStorage.setItem('fontSize', '100%');
});

const applyFontSize = () => updateFontSize(0);
rsInp.addEventListener('blur', applyFontSize);
rsInp.addEventListener('keypress', (e) => e.key === 'Enter' && (applyFontSize(), rsInp.blur()));
loadFontSize();

// <<<<<<<<<<<<<<<<< Размер текста;

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

// >>>>>>>>>>>>>>>> Модальные окна:
const mBtns = document.querySelectorAll('a[href^="#modal-"]'),
    mClose = document.querySelectorAll('.modal__close'),
    mModals = document.querySelectorAll('.modal');

function cFS(inst) {
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.marginRight = inst === 0 ? '0' : scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
}

mBtns.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        cFS(1);
        const targetId = btn.getAttribute('href');
        const targetModal = document.querySelector(targetId);

        if (targetModal) {
            targetModal.classList.add('is_active');
            document.body.classList.add('is_active');
        }
    }
});

mModals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (!event.target.closest('.modal-content')) {
            modal.classList.remove('is_active');
            body.classList.remove('is_active');
            cFS(0);
        }
    });
});

mClose.forEach(close => {
    close.addEventListener('click', () => {
        mModals.forEach(modal => {
            modal.classList.remove('is_active');
            body.classList.remove('is_active');
            cFS(0);
        })
    });
});

// <<<<<<<<<<<<<<<<< Модальные окна;

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
