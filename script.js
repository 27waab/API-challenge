const userSection = document.querySelector("ul"),
    postSection = document.querySelector("section");

let userIdSelect = 0;
let userArr = [];

userSection.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    document.querySelectorAll("ul li.active").forEach(el => el.classList.remove("active"));
    li.classList.add("active");
    userIdSelect = Number(li.dataset.idToSelect);
    createPost();
});

function createUser() {
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts`);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let response = request.response;
            response.forEach(user => {
                if (!userArr.includes(user.userId)) {
                    userArr.push(user.userId);
                }
            })
            userSection.innerHTML = "";
            userArr.forEach(user => {
                let li = document.createElement("li"),
                    profile = document.createElement("div"),
                    icon = document.createElement("i"),
                    infoSection = document.createElement("div"),
                    userName = document.createElement("h3"),
                    userMail = document.createElement("p");
                let userNameText = document.createTextNode(`@userid${user}`),
                    userMaillText = document.createTextNode(`userid${user}@mail.com`);
                li.dataset.idToSelect = user;
                profile.className = "icon";
                icon.className = "hgi hgi-stroke hgi-user";
                profile.appendChild(icon);
                userName.appendChild(userNameText);
                userMail.appendChild(userMaillText);
                infoSection.appendChild(userName);
                infoSection.appendChild(userMail);
                li.appendChild(profile);
                li.appendChild(infoSection);
                userSection.appendChild(li);
            });
        }
    }
}

function createPost() {
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userIdSelect}`);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let response = request.response;
            postSection.innerHTML = "";
            response.forEach(post => {
                let box = document.createElement("div"),
                    h3 = document.createElement("h3"),
                    pragraph = document.createElement("p");
                let title = document.createTextNode(post.title),
                    body = document.createTextNode(post.body);
                box.className = "box";
                h3.appendChild(title);
                pragraph.appendChild(body);
                box.appendChild(h3);
                box.appendChild(pragraph);
                postSection.appendChild(box);
            });
        }
    }
}

createPost();
createUser();