function createLinksElements() {
    let divWraper = document.createElement("div");
    divWraper.id = 'links-wrapper';
    divWraper.className = 'col-lg-6 col-sm-12 p-0';

    let li = document.createElement("li");
    li.className = 'list-group-item mt-1';
    li.textContent = inputLink.value;
    li.style.width = "100%"

    let inputWithValue = document.createElement("input");
    inputWithValue.name = "links-list";
    inputWithValue.value = inputLink.value;
    inputWithValue.type = 'hidden';

    let excludeBtn = document.createElement("a");
    excludeBtn.className = 'exclude-link';
    let excludeIcon = document.createElement("i");
    excludeIcon.className = "fa fa-close hover-red";
    excludeBtn.appendChild(excludeIcon);

    li.appendChild(inputWithValue);
    divWraper.appendChild(li);
    divWraper.appendChild(excludeBtn);

    ulLinks.prepend(divWraper);
}

let buttonLink = document.getElementById("enter");
let inputLink = document.getElementById("link-input");
let ulLinks = document.querySelector("ul");

buttonLink.addEventListener("click", function () {
    if (inputLink.value !== '') {
        createLinksElements();
        for (var i = 0; i < excludeLinks.length; i++) {
            excludeLinks[i].addEventListener('click', deleteLink);
        }
        inputLink.value = '';
    }
    inputLink.required = false;
})

let excludeLinks = document.getElementsByClassName("exclude-link");

function deleteLink(link) {
    let target = link.target.parentElement;
    let divWrapper = target.parentElement;
    divWrapper.remove();
}

function disableEnablePassInput() {
    let passInput = document.getElementById("playlist-pass");
    let selectPublicPrivate = document.getElementById("visibility-select");
    if (selectPublicPrivate.value == 0) {
        passInput.disabled = true;
        passInput.required = false;
        passInput.style.opacity = '20%'
        return;
    }
    passInput.disabled = false;
    passInput.required = true;
    passInput.style.opacity = '100%'
    return;
}

function seeHidePass() {
    let passInput = document.getElementById("playlist-pass");
    let passIcon = document.getElementById("pass-icon");

    if (passInput.type === 'text') {
        passInput.type = 'password';
        passIcon.className = 'bi bi-eye-slash-fill'
        return;
    }
    passInput.type = 'text';
    passIcon.className = 'bi bi-eye-fill';
    return;
}