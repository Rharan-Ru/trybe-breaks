// Create Youtube embed player control - documentation reference: https://developers.google.com/youtube/iframe_api_reference

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var playerVolume = 50;

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

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
var paused = true;
var hasGif = true;

// This function play and pause video by you state reference
function playPauseVideo() {
    var play = document.getElementById('play-pause-video');
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
    closeNav();
    var ytVideoMusic = document.getElementById('youtube-music');
    var videoId = ytVideoMusic.src.split('/')[4].split('?')[0];
    var newSrc;

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
    var randomMusic = musicIds[Math.floor((Math.random() * musicIds.length))];
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

// Change vars by ready function 
var gifBack;
var giphyURL;
var newGif;
var renderGif;
var musicIds = [];

// Start new random gif, reference used: https://codepen.io/ChynoDeluxe/pen/WGQzWW
$(document).ready(function () {
    musicIds = [...document.querySelectorAll('#musics > a')].map(({
        id
    }) => id);

    console.log(musicIds);
    // Giphy API defaults
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
        tag: "anime-manga",
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

var hasStarted = false;
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
        var pause = 80;
        var random = 82;
        var next = 65;
        var prev = 68;
        var gif = 71;
        var nextGif = 78;
        var random = 82;

        var volRight = 39;
        var volLeft = 37;
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
        };
    };
    return hasStarted = true;
};


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("open-nav").style.opacity = '0';
    document.getElementById("close-navbar").style.opacity = '100%';
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("open-nav").style.opacity = '100%';
    document.getElementById("close-navbar").style.opacity = '0';
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
};