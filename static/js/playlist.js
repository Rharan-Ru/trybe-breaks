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

// <script src="https://kit.fontawesome.com/016c7a8b8c.js" crossorigin="anonymous"></script>