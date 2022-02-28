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

function playVideo() {
    var play = document.getElementById('play-video');
    play.innerHTML = '<i class="fa fa-pause"></i>';
    play.id = 'pause-video';
    play.setAttribute('onclick', 'pauseVideo()');
    player.playVideo();
}

function pauseVideo() {
    var play = document.getElementById('pause-video');
    play.innerHTML = '<i class="fa fa-play"></i>';
    play.id = 'play-video';
    play.setAttribute('onclick', 'playVideo()');
    player.pauseVideo();
}


function setVolume(event) {
    player.setVolume(event)
}