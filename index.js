const searchBtn = document.getElementById('search-btn');
const userName = document.getElementById('user-name');
const displayer = document.getElementById('github-account');


const toggle = document.getElementById('modeToggle');
toggle.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});
