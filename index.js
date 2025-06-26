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


function renderUserInfo(user) {
    displayer.innerHTML = `
    <div class="git-profile">
        <div class="git-header">
            <div class="git-avatar"><img src="${user.avatar_url}" alt="Avatar of ${user.login}"></div>
            <div>${user.name || user.login}</div>
        </div>    

        <ul class="git-info">
           <li><i class="fa-solid fa-person-walking"></i> Followers: ${user.followers}</li>
           <li><i class="fa-solid fa-person-walking-arrow-loop-left"></i> Following: ${user.following}</li>
           <li id="repo-btn"><i class="fa-solid fa-money-simple-from-bracket"></i> Repositories: ${user.public_repos}</li>
        </ul>
    </div>
    `;
}


function searchRepos(user) {
    fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(res => {
            if (!res.ok) throw new Error('Repo not found');
            return res.json();
        })
        .then(repos => {
            if (repos.length === 0) {
                displayer.innerHTML += '<p>You have no repositories.</p>';
                return;
            }

            const reposHTML = `
                <div class="repos-grid">
                    ${repos.map(repo => renderUserRepo(repo)).join('')}
                </div>
            `;
            displayer.innerHTML += reposHTML;
        })
        .catch(error => alert(`Error: ${error.message}`));
}

