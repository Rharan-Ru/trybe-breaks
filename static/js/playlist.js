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
        // Function to scroll playlists vertically
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

// add event listener to all playlists link to get slug
let playlistSlugActive = '';
let playlistsFocusSlug = document.getElementsByClassName("get-playlist-slug");

function focusPlaylist(event) {
    playlistSlugActive = event.srcElement.parentElement.id;
}
for (var i = 0; i < playlistsFocusSlug.length; i++) {
    playlistsFocusSlug[i].addEventListener('click', focusPlaylist);
}

document.querySelectorAll('.like-me').forEach(item => {
    item.addEventListener('click', evt => {
        evt.preventDefault();
        let targetLikesCounter = evt.target.nextElementSibling;
        const targetSlug = evt.target.offsetParent.children[1].id;
        if (evt.target.className.includes('bi-heart-fill')) {
            evt.target.className = 'heart bi bi-heart me-2 ms-2';
            targetLikesCounter.innerHTML = Number(targetLikesCounter.innerHTML) - 1;
            removeLikesData(targetSlug);
            return;
        }
        targetLikesCounter.innerHTML = Number(targetLikesCounter.innerHTML) + 1;
        evt.target.className = 'heart bi bi-heart-fill me-2 ms-2';
        saveLikesData(targetSlug);
        return;
    })
})

function saveLikesData(data) {
    let likes = [];
    likes = JSON.parse(localStorage.getItem('likes'));
    if (likes === null) {
        likes = [];
        likes.push(data);
        localStorage.setItem('likes', JSON.stringify(likes))
        likePost(data);
        return;
    }
    likes.push(data);
    localStorage.setItem('likes', JSON.stringify(likes))
    likePost(data);
    return;
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function removeLikesData(data) {
    let likes = [];
    likes = JSON.parse(localStorage.getItem('likes'));
    likes = arrayRemove(likes, data);
    localStorage.setItem('likes', JSON.stringify(likes));
    dislikePost(data);
    return;
}

window.onload = () => {
    document.querySelectorAll('.like-me').forEach(item => {
        const targetSlug = item.offsetParent.children[1].id;
        const likes = JSON.parse(localStorage.getItem('likes'));
        if (likes.includes(targetSlug)) {
            item.children[0].className = 'heart bi bi-heart-fill me-2 ms-2';
        }
    })
}

function likePost(slug) {
    $.ajax({
        type: 'POST',
        url: "like/" + slug,
        processData: false,
        contentType: false,
        success: function (response) {},
        error: function (response) {}
    })
}

function dislikePost(slug) {
    $.ajax({
        type: 'POST',
        url: "dislike/" + slug,
        processData: false,
        contentType: false,
        success: function (response) {},
        error: function (response) {}
    })
}

{/* <script src="https://kit.fontawesome.com/016c7a8b8c.js" crossorigin="anonymous"></script>  */}