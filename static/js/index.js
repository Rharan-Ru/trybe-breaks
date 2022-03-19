// Create Youtube embed player control - documentation reference: https://developers.google.com/youtube/iframe_api_reference

let tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
let playerVolume = 50;

let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-music', {
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(playerVolume);
    if (hasStarted) {
        document.getElementById('video-title').innerHTML = player.getVideoData().title;
    }
    return;
}

// Video buttons control
let paused = true;
let hasGif = true;

// This function play and pause video by you state reference
function playPauseVideo() {
    let play = document.getElementById('play-pause-video');
    if (paused) {
        play.innerHTML = '<i class="fa fa-pause"></i>';
        player.playVideo();
        paused = false;
        return paused;
    }
    play.innerHTML = '<i class="fa fa-play"></i>';
    player.pauseVideo();
    paused = true;
    return paused;
};

// Set volume player
function setVolume(event) {
    player.setVolume(event);
    return;
};

// Change video by id
function changeVideo(id) {
    currentMusic.className = '';
    currentMusic = document.getElementById(id);
    currentMusic.className = 'activate';

    let ytVideoMusic = document.getElementById('youtube-music');
    let videoId = ytVideoMusic.src.split('/')[4].split('?')[0];
    let newSrc;

    try {
        if (!paused) {
            newSrc = ytVideoMusic.src.replace('autoplay=0', 'autoplay=1').replace(videoId, id);
            ytVideoMusic.src = newSrc;
        } else {
            newSrc = ytVideoMusic.src.replace('autoplay=1', 'autoplay=0').replace(videoId, id);
            ytVideoMusic.src = newSrc;
        }
    } finally {
        return;
    };
};

// Get a random video-music
function randomVideo() {
    let randomMusic = musicIds[Math.floor((Math.random() * musicIds.length))];
    changeVideo(randomMusic);
    newGif();
};

// Switch to original video
function getOriginalVideo() {
    if (hasGif) {
        document.getElementById('gif-background').style.opacity = '0';
        hasGif = false;
        return hasGif;
    };
    document.getElementById('gif-background').style.opacity = '1';
    hasGif = true;
};

// Change gif animation
function changeGif() {
    document.getElementById('gif-background').style = 'opacity: 0;';
};

// Get random gifs
let gifBack;
let giphyURL;
let newGif;
let renderGif;
let musicIds = [];
let currentMusic;

// Start new random gif, reference used: https://codepen.io/ChynoDeluxe/pen/WGQzWW
$(document).ready(function () {
    musicIds = [...document.querySelectorAll('#musics > a')].map(({
        id
    }) => id);
    currentMusic = document.getElementById(musicIds[0]);
    currentMusic.className = 'activate';

    // Giphy API defaults
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
        // tag: "eniac",
        tag: "8bit-art",
        type: "random",
    };
    // Target gif-wrap container
    gifBack = document.getElementById('gif-background');
    // Giphy API URL
    giphyURL = encodeURI(
        giphy.baseURL +
        giphy.type +
        "?api_key=" +
        giphy.apiKey +
        "&tag=" +
        giphy.tag
    );

    // Call Giphy API and render data
    newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

    // Display Gif in gif wrap container
    renderGif = _giphy => {
        // Set gif as bg image
        gifBack.style.backgroundImage = "url(" + _giphy.images.original.url + ")";
    };
    newGif();
});

let hasStarted = false;
if (hasStarted === false) {
    document.onkeydown = keyPressed;
    document.onclick = clickEvent;

    function keyPressed(k) {
        if (hasStarted === false) {
            start();
        }
    };

    function clickEvent(k) {
        if (hasStarted === false) {
            start();
        }
    };
};

function start() {
    playPauseVideo();
    document.getElementById('video-title').innerHTML = player.getVideoData().title;
    document.onkeydown = keyPressed;
    function keyPressed(k) {
        console.log(k);
        let pause = 80;
        let next = 68;
        let prev = 65;
        let gif = 71;
        let nextGif = 78;
        let random = 82;

        let volRight = 39;
        let volLeft = 37;
        switch (k.keyCode) {
            case pause:
                playPauseVideo();
                break;
            case volRight:
                playerVolume === 100 ? playerVolume = 100 : playerVolume += 10;
                document.getElementById('volume').value = playerVolume;
                player.setVolume(playerVolume);
                break;
            case volLeft:
                playerVolume === 0 ? playerVolume = 0 : playerVolume -= 10;
                document.getElementById('volume').value = playerVolume;
                player.setVolume(playerVolume);
                break;
            case gif:
                getOriginalVideo();
                break;
            case nextGif:
                newGif();
                break;
            case random:
                randomVideo();
                break;
            case next:
                nextMusic();
                break;
            case prev:
                prevMusic();
                break;
        };
    };
    return hasStarted = true;
};


// Functions to open and close navbar
function openNav() {
    document.getElementById("open-nav").style.opacity = '0';
    document.getElementById("close-navbar").style.opacity = '100%';
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
};

function closeNav() {
    document.getElementById("open-nav").style.opacity = '100%';
    document.getElementById("close-navbar").style.opacity = '0';
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
};


// Functions to go to next music video or previous music video
function nextMusic() {
    currentMusic.className = '';
    currentMusic = currentMusic.nextElementSibling;
    if (currentMusic === null) {
        currentMusic = document.getElementById(musicIds[0]);
    };
    currentMusic.className = 'activate';
    changeVideo(currentMusic.id);
    return;
}

function prevMusic() {
    currentMusic.className = '';
    currentMusic = currentMusic.previousElementSibling;
    if (currentMusic === null) {
        currentMusic = document.getElementById(musicIds[musicIds.length - 1]);
    };
    currentMusic.className = 'activate';
    changeVideo(currentMusic.id);
    return;
}