/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openPlaylistForm() {
    let mySide = document.getElementById("mySidenav");
    document.getElementById("close-navbar").style.opacity = '100%';
    mySide.style.width = "25%";
    mySide.style.visibility = "visible";
    document.getElementById("main").style.marginRight = "300px";
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closePlaylistForm() {
    let mySide = document.getElementById("mySidenav");
    document.getElementById("close-navbar").style.opacity = '0';
    mySide.style.width = "0";
    mySide.style.visibility = "hidden";
    document.getElementById("main").style.marginRight = "0";
};

var button = document.getElementById("enter");
var input = document.getElementById("link-input");
var ul = document.querySelector("ul");

button.addEventListener("click", function () {
    if (input.value !== '') {
        var li = document.createElement("li");
        li.className = 'list-group-item mt-1';
        li.textContent = input.value;
        ul.appendChild(li);
        input.value = '';
    }
})