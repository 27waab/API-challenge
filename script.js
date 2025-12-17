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
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((result) => result.json())
    .then((data) => {
        userSection.innerHTML = "";
        data.forEach(user => {
            let li = document.createElement("li"),
                profile = document.createElement("div"),
                icon = document.createElement("i"),
                infoSection = document.createElement("div"),
                userName = document.createElement("h3"),
                userMail = document.createElement("p");
            let userNameText = document.createTextNode(`@${user.username}`),
                userMaillText = document.createTextNode(user.email);
            li.dataset.idToSelect = user.id;
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
    })
    .catch(() => alert("Error: someting is wrroing in API requser"));
}

function createPost() {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userIdSelect}`)
    .then((result) => result.json())
    .then((data) => {
        postSection.innerHTML = "";
        data.forEach(post => {
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
    })
    .catch(() => alert("Error: someting is wrroing in API requser"));
}

createUser();
