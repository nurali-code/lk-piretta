const body = document.body;
const menuBtn = body.querySelector('#btn');
const vid = body.querySelector('video');
const menu = body.querySelector('#menu');
const mForm = body.querySelector('form');
const mBtns = body.querySelectorAll('a[href="#request"]');
const mModals = body.querySelectorAll('.modal');
const mRequest = body.querySelector('#request');
const mDone = body.querySelector('#done');

vid.onclick = () => { vid.paused ? vid.play() : vid.pause(); }

menuBtn.onclick = () => {
    [menuBtn, menu].forEach(el => { el.classList.toggle('is_active') })
    body.classList.toggle('is_active', !body.classList.contains('is_active'))
}

function cFS(inst) {
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.marginRight = inst === 0 ? '0' : scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
}

mBtns.forEach(el => {
    el.onclick = (e) => {
        cFS()
        e.preventDefault();
        [mRequest, body].forEach(el => el.classList.add('is_active'));
    }
})

mModals.forEach(el => {
    el.addEventListener('click', (event) => {
        if (!event.target.closest('.modal-content')) {
            el.classList.remove('is_active')
            body.classList.toggle('is_active', menuBtn.classList.contains('is_active'))
            cFS(0);
        }
    });
});

function mask(e) {
    let value = e.target.value.replace(/\D/g, '').slice(1);
    e.target.value = "+7 " + (value.length ? `(${value.slice(0, 3)}` : '') +
        (value.length > 3 ? `) ${value.slice(3, 6)}` : '') +
        (value.length > 6 ? `-${value.slice(6, 8)}` : '') +
        (value.length > 8 ? `-${value.slice(8, 10)}` : '');
};
let tel = body.querySelector('#tel');
tel.addEventListener('input', mask);
tel.addEventListener('focus', mask);

mForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const thisBnt = this.querySelector('.btn')
    thisBnt.disabled = true;
    const formData = new FormData(this);
    fetch("send.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            thisBnt.disabled = false;
            console.log(data);
            [mDone, mRequest].forEach(el => { el.classList.toggle('is_active') })
        })
        .catch(error => {
            console.error('Ошибка AJAX:', error);
            thisBnt.setAttribute('data-alt-text', thisBnt.innerHTML);
            thisBnt.disabled = true;
            let i = 10;
            const interval = setInterval(() => {
                if (i <= 0) {
                    clearInterval(interval);
                    thisBnt.innerHTML = thisBnt.getAttribute('data-alt-text');
                    thisBnt.disabled = false;
                } else { thisBnt.textContent = `Ошибка попробуйте через (${i--})`; }
            }, 1000);

        });
});