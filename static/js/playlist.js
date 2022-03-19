/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openPlaylistForm() {
    let mySide = document.getElementById("mySidenav");
    document.getElementById("close-navbar").style.opacity = '100%';
    let w = window.innerWidth;
    if (w > 990) {
        mySide.style.width = "25%";
        mySide.style.visibility = "visible";
        return;
    } else if (w < 767) {
        mySide.style.width = "100%";
        mySide.style.visibility = "visible";
        return;
    }
    mySide.style.width = "33.33333333%";
    mySide.style.visibility = "visible";
    return;
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closePlaylistForm() {
    let mySide = document.getElementById("mySidenav");
    document.getElementById("close-navbar").style.opacity = '0';
    mySide.style.width = "0";
    mySide.style.visibility = "hidden";
    document.getElementById("main").style.marginLeft = "0";
};

let buttonLink = document.getElementById("enter");
let inputLink = document.getElementById("link-input");
let ulLinks = document.querySelector("ul");

function createLinksElements() {
    let divWraper = document.createElement("div");
    divWraper.id = 'links-wrapper';

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

    ulLinks.appendChild(divWraper);
}

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
    console.log(divWrapper);
}

function disableEnablePassInput() {
    let passInput = document.getElementById("playlist-pass");
    let selectPublicPrivate = document.getElementById("visibility-select");
    console.log(selectPublicPrivate.value);
    if (selectPublicPrivate.value == 0) {
        console.log("sim");
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

// add event listener to all playlists link to get slug
let playlistSlugActive = '';
let playlistsFocusSlug = document.getElementsByClassName("get-playlist-slug");

function focusPlaylist(event) {
    playlistSlugActive = event.srcElement.parentElement.id;
}
for (var i = 0; i < playlistsFocusSlug.length; i++) {
    playlistsFocusSlug[i].addEventListener('click', focusPlaylist);
}