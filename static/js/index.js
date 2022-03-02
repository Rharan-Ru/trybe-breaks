// Create Youtube embed player control - documentation reference: https://developers.google.com/youtube/iframe_api_reference

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';

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
    event.target.setVolume(50);
    document.getElementById('video-title').innerHTML = player.getVideoData().title;
}

// Video buttons control
var paused = true;
var hasGif = true;

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

function changeVideo(id) {
    closeNav();
    var ytVideoMusic = document.getElementById('youtube-music');
    var videoId = ytVideoMusic.src.split('/')[4].split('?')[0];

    var newSrc;
    if (!paused) {
        newSrc = ytVideoMusic.src.replace('autoplay=0', 'autoplay=1').replace(videoId, id);
        ytVideoMusic.src = newSrc;
        return;
    };
    newSrc = ytVideoMusic.src.replace('autoplay=1', 'autoplay=0').replace(videoId, id);
    ytVideoMusic.src = newSrc;
    return;
};


// Start new random gif, reference used: https://codepen.io/ChynoDeluxe/pen/WGQzWW
$(document).ready(function () {
    const musicIds = [...document.querySelectorAll('#musics > a')].map(({
        id
    }) => id);

    console.log(musicIds);
    // Giphy API defaults
    const giphy = {
        baseURL: "https://api.giphy.com/v1/gifs/",
        apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
        tag: "lofi-anime",
        type: "random",
        rating: "pg-13"
    };
    // Target gif-wrap container
    var gifBack = document.getElementById('gif-background');
    // Giphy API URL
    let giphyURL = encodeURI(
        giphy.baseURL +
        giphy.type +
        "?api_key=" +
        giphy.apiKey +
        "&tag=" +
        giphy.tag +
        "&rating=" +
        giphy.rating
    );

    // Call Giphy API and render data
    var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

    // Display Gif in gif wrap container
    var renderGif = _giphy => {
        console.log(_giphy);
        // Set gif as bg image
        gifBack.style.backgroundImage = "url(" + _giphy.images.original.url + ")";
    };
    newGif();

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
                return;
            case volRight:
                var actualVol = player.getVolume();
                actualVol === 100 ? actualVol = 100 : actualVol += 10;
                console.log(actualVol);
                document.getElementById('volume').value = actualVol;
                player.setVolume(actualVol);
                return
            case volLeft:
                var actualVol = player.getVolume();
                actualVol === 0 ? actualVol = 0 : actualVol -= 10;
                console.log(actualVol);
                document.getElementById('volume').value = actualVol;
                player.setVolume(actualVol);
                return;
            case gif:
                if (hasGif) {
                    document.getElementById('gif-background').style.opacity = '0';
                    hasGif = false;
                    return hasGif;
                };
                document.getElementById('gif-background').style.opacity = '1';
                hasGif = true;
                return hasGif;
            case nextGif:
                newGif();
                return;
            case random:
                var randomMusic = musicIds[Math.floor((Math.random()*musicIds.length))];
                changeVideo(randomMusic);
                newGif();
                return;
        }
    };
    return;
});



/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// Change gif animation
function changeGif() {
    document.getElementById('gif-background').style = 'opacity: 0;';
}