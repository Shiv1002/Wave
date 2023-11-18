var seekbar = document.getElementById('seekbar');
var masterplay = document.getElementById('masterplay');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songlist'));
let songindex = 0;

let smallplay = Array.from(document.getElementsByClassName('smallplay'));
let masterForword = document.getElementById('masterForword');
let masterBack = document.getElementById('masterBack');

let songs = [
    { index: '1', songname: "Diamond Eyes - Gravity", cover: 'images/My heart - Different heaven.jpg', src: 'songs/Diamond Eyes - Gravity [NCS Release].mp3', timestamp: '3:18' },
    { index: '2', songname: "Different Heaven & EH!DE - My Heart", cover: 'images/My heart - Different heaven.jpg', src: 'songs/Different Heaven & EH!DE - My Heart [NCS Release].mp3', timestamp: '3:18' },
    { index: '3', songname: "Electro-Light - Fall For Gravity", cover: 'images/My heart - Different heaven.jpg', src: 'songs/Electro-Light - Fall For Gravity feat. Nathan Brumley [NCS Release].mp3', timestamp: '3:18' },
    { index: '4', songname: "Heroes Tonight - Janji", cover: 'images/songbanner.jpg', src: 'songs/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3', timestamp: '3:18' },
    { index: '5', songname: "Jim Yosef & Anna Yvette - Linked ", cover: 'images/Jim Yosef & Anna Yvette - Linked [NCS Release].jpg', src: 'songs/Jim Yosef & Anna Yvette - Linked [NCS Release].mp3', timestamp: '3:18' },
    { index: '6', songname: "Cartoon - On & On (feat. Daniel Levi)", cover: 'images/My heart - Different heaven.jpg', src: 'songs/Cartoon - On & On (feat. Daniel Levi) [NCS Release].mp3', timestamp: '3:18' },
]


let audioElement = new Audio(songs[songindex].src);
songitem.forEach((Element, i) => {
    try {
        document.getElementsByClassName('songname')[i].innerHTML = songs[i].songname;
        Element.getElementsByTagName('img')[0].src = songs[i].cover;
        Element.getElementsByTagName('span')[2].innerHTML = songs[i].timestamp;
    } catch (error) {
        console.log(error);
    }


});

//audio ele ka listen hoke seekbar se sync rahega (no effect on song)
audioElement.addEventListener('timeupdate', () => {
    let currentime = (audioElement.currentTime);
    seekbar.value = (currentime / audioElement.duration) * 100;
    if (seekbar.value == 100) { masterForword.click(); };
}
);

seekbar.addEventListener('change', () => {
    audioElement.currentTime = seekbar.value * audioElement.duration / 100;
});


smallplay.forEach((Element, i) => {
    Element.addEventListener("click", function () {


        if (songindex != i) {
            console.log(Element, i, Element.id);
            songindex = Element.id;
            try {
                audioElement.src = songs[songindex].src;
            } catch (error) {
                console.log(error);
            }

            allpause();
        }
        if (audioElement.currentime < 0 || audioElement.paused)  // song is paused
        {

            audioElement.play();
            smallplay[songindex].className = "far fa-pause-circle"
            masterplay.className = "far fa-2x fa-pause-circle"
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            smallplay[songindex].className = "far fa-play-circle";
            masterplay.className = "far fa-2x fa-play-circle";
        }
        document.getElementById('songtitle').innerHTML = songs[songindex].songname;
        gif.src = songs[songindex].cover;
    })
});


masterplay.addEventListener('click', () => {


    document.getElementById('songtitle').innerHTML = songs[songindex].songname;  // name of current songindex
    gif.src = songs[songindex].cover;                                                //cavor of current song

    if (audioElement.currentime < 0 || audioElement.paused)  // song is paused
    {
        audioElement.play();
        smallplay[songindex].className = "far fa-pause-circle"
        masterplay.className = "far fa-2x fa-pause-circle"
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        smallplay[songindex].className = "far fa-play-circle";
        masterplay.className = "far fa-2x fa-play-circle";
    }

});

function allpause() {                                           // make all small icons play
    smallplay.forEach((element) => {
        element.className = "far fa-play-circle";
    })
};

masterForword.addEventListener('click', () => {

    if (songindex >= songs.length - 1) {

        songindex = 0;
    } else {

        (songindex) = parseInt(songindex) + parseInt(1);      //imp as songidex was taking 1 as string
    }

    audioElement.pause();          // pause current song icons pause
    allpause();
    console.log(audioElement.src);
    audioElement.src = songs[songindex].src;
    console.log(songindex + " forworded " + audioElement.src)

    audioElement.load();
    masterplay.click();
});

masterBack.addEventListener("click", () => {

    console.log("back clicked!!!");
    if (songindex <= 0) {
        songindex = songs.length - 1;
    } else {
        songindex -= 1;
    }
    audioElement.pause();
    allpause();
    document.getElementById('songtitle').innerHTML = songs[songindex].songname;
    try {
        audioElement.src = songs[songindex].src;
    } catch (e) {
        audioElement.onerror;
        alert("No Song Loaded!!");
    }


    console.log(songindex + " reverse ");
    audioElement.load();
    masterplay.click();


});

const changeHome = (value) => {
    document.getElementsByClassName('container')[0].className = value;
    alert(value);
}

audioElement.onerror = (e) => {

    console.log(); masterForword.click();
}


