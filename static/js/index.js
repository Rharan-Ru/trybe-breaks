let hasStarted = false;
// Video buttons control
let paused = true;
let hasGif = true;
const videoContain = document.getElementById('contain-video');

// Get random gifs variables
let gifBack;
let giphyURL;
let newGif;
let renderGif;
let musicIds = [];
let currentMusic;

// Giphy API defaults
const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
    // tag: "eniac",
    tag: "8bit-art",
    type: "random",
};

// Create Youtube embed player control - documentation reference: https://developers.google.com/youtube/iframe_api_reference

// Player variables
let player;
let tag = document.createElement('script');
let playerVolume = 50;
let firstScriptTag = document.getElementsByTagName('script')[0];
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-music', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
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

function onPlayerStateChange(event) {
    if (event.data === 0) {
        nextMusic();
    }
}

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

// All player control/interactive functions
// Functions to go to next music video or previous music video
function nextMusic() {
    currentMusic.className = 'row thumb';
    currentMusic = currentMusic.nextElementSibling;
    if (currentMusic === null) {
        currentMusic = document.getElementById(musicIds[0]);
    };
    currentMusic.className = 'activate row thumb';
    changeVideo(currentMusic.id);
    return;
}

function prevMusic() {
    currentMusic.className = 'row thumb';
    currentMusic = currentMusic.previousElementSibling;
    if (currentMusic === null) {
        currentMusic = document.getElementById(musicIds[musicIds.length - 1]);
    };
    currentMusic.className = 'activate row thumb';
    changeVideo(currentMusic.id);
    return;
}

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
};

// Change video by id
function changeVideo(id) {
    currentMusic.className = 'row thumb';
    currentMusic = document.getElementById(id);
    currentMusic.className = 'activate row thumb';

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
    }
}

// Get a random video-music
function randomVideo() {
    let randomMusic = musicIds[Math.floor((Math.random() * musicIds.length))];
    changeVideo(randomMusic);
    newGif();
}

// Switch to original video
function getOriginalVideo() {
    if (hasGif) {
        document.getElementById('gif-background').style.opacity = '0';
        hasGif = false;
        return hasGif;
    };
    document.getElementById('gif-background').style.opacity = '1';
    hasGif = true;
}


// Start new random gif, reference used: https://codepen.io/ChynoDeluxe/pen/WGQzWW
$(document).ready(function () {
    // Define current music onload
    let musicFirst = document.querySelector('#musics > a');
    console.log(musicFirst);
    musicFirst.className = 'activate row thumb';
    currentMusic = musicFirst;

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

if (hasStarted === false) {
    window.onkeydown = keyPressed;
    window.onclick = clickEvent;

    function keyPressed() {
        if (hasStarted === false) {
            start();
        }
    };

    function clickEvent() {
        if (hasStarted === false) {
            start();
        }
    };
};

function start() {
    playPauseVideo();
    document.getElementById('video-title').innerHTML = player.getVideoData().title;
    document.onkeydown = keyPressed;
    videoContain.addEventListener('click', () => {
        playPauseVideo();
    });

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