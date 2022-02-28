// Create Youtube embed player control

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-music', {
        events: {}
    });
}

// Video buttons control
var paused = true;

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
}


function setVolume(event) {
    player.setVolume(event);
    return;
}

// Activate functions in keyboard press

document.onkeydown = keyPressed;

function keyPressed(k) {
    console.log(k);
    var pause = 80;
    var random = 82;
    var next = 65;
    var prev = 68;
    switch (k.keyCode) {
        case pause:
            playPauseVideo();
            return;
    }
};
