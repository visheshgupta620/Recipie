const btn = document.querySelector('#reset');
const every = document.querySelectorAll('.commonclass');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    every.value = '';
})