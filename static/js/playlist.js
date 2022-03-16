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

let button = document.getElementById("enter");
let input = document.getElementById("link-input");
let ul = document.querySelector("ul");

button.addEventListener("click", function () {
    if (input.value !== '') {
        var li = document.createElement("li");
        li.className = 'list-group-item mt-1';
        li.textContent = input.value;

        let inputWithValue = document.createElement("input");
        inputWithValue.name = "links-list";
        inputWithValue.value = input.value;
        inputWithValue.type = 'hidden';

        li.appendChild(inputWithValue);
        ul.appendChild(li);
        input.value = '';
    }
    input.required = false;
})

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

