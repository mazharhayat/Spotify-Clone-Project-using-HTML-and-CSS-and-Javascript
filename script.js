// initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');

let songs = [
    { songName: "Warriyo - Mortals", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "Cielo", filePath: "2.mp3", coverPath: "2.jpg" },
    { songName: "DEAF KEV", filePath: "3.mp3", coverPath: "3.jpg" },
    { songName: "Different Heaven & EH!DE", filePath: "4.mp3", coverPath: "4.jpg" },
    { songName: "Janji", filePath: "5.mp3", coverPath: "5.jpg" },
    { songName: "Raabba", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Sakhiyan", filePath: "7.mp3", coverPath: "7.jpg" },
    { songName: "Bhula Dena", filePath: "8.mp3", coverPath: "8.jpg" },
    { songName: "Tumhari Qasam", filePath: "9.mp3", coverPath: "9.jpg" },
    { songName: "Salam-e-Ishq", filePath: "10.mp3", coverPath: "10.jpg" },
];

// Function to initialize the song list on page load
function initializeSongList() {
    let songListContainer = document.querySelector('.songList .songItemContainer');
    let songItemsHTML = songs.map((song, index) => `
        <div class="songItem" onclick="playSpecificSong(${index})">
            <img src="${song.coverPath}" alt="${index + 1}">
            <span class="songName">${song.songName}</span>
            <span class="songListPlay"><span class="timeStamp">05:34 <i class="fa-solid fa-play"></i> </span></span>
        </div>
    `).join('');

    songListContainer.innerHTML = songItemsHTML;
}

// Function to update the song information
function updateSongInfo() {
    let currentSong = songs[songIndex];
    document.querySelector('.songInfo img').src = currentSong.coverPath;
    document.querySelector('.songInfo').innerHTML = `<img src="${currentSong.coverPath}" width="80px" alt="playingBar">${currentSong.songName}`;
    document.title = `Spotify - ${currentSong.songName}`; // Update the page title
}

// Function to play a specific song from the list
function playSpecificSong(index) {
    songIndex = index;
    playSong();
}

// Function to play the selected song
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    updateSongInfo();
}

// Event listener for master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Event listener for time update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Event listener for progress bar change
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to play the next song
function playNext() {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
}

// Function to play the previous song
function playPrevious() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
}

// Event listener for next button
document.querySelector('.fa-forward-step').addEventListener('click', playNext);

// Event listener for previous button
document.querySelector('.fa-backward-step').addEventListener('click', playPrevious);

// Display all song names on the website
initializeSongList();

// Add the following code for volume control

let volumeSlider = document.getElementById("volumeSlider");

// Event listener for volume control
volumeSlider.addEventListener("input", () => {
    let volume = volumeSlider.value / 100; 
    audioElement.volume = volume;
});

// Function to update volume when the page loads
function updateVolume() {
    volumeSlider.value = audioElement.volume * 100; 
}


// Update initial volume
updateVolume();

// Update initial song information
updateSongInfo();
