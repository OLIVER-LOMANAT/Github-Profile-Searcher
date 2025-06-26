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


searchBtn.addEventListener('click', () => {
    const name = userName.value.trim();
    if (!name) {
        return alert("Please enter user name");
    }
    displayer.innerHTML = "";
    searchUser(name);
    userName.value = "";
});

function searchUser(name) {
    fetch(`https://api.github.com/users/${name}`)
        .then(res => {
            if (!res.ok) throw new Error('User not found');
            return res.json();
        })
        .then(user => {
            renderUserInfo(user);
            searchRepos(user);
        })
        .catch(error => alert(`Error: ${error.message}`));
}
