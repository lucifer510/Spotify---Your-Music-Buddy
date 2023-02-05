console.log("Welcome To Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("song/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Shubh Din",
    filePath: "song/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Ainsi Bas Laa Vidaa",
    filePath: "song/2.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "Ad Kolima", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
  {
    songName: "All The Way Up",
    filePath: "song/4.mp3",
    coverPath: "covers/4.png",
  },
  {
    songName: "Amarella Epidemic 77",
    filePath: "song/5.mp3",
    coverPath: "covers/5.jpg",
  },
  { songName: "Angetenar", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Arcade", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
  {
    songName: "Baby I Got Issues",
    filePath: "song/8.mp3",
    coverPath: "covers/8.jpg",
  },
  { songName: "Bad Style", filePath: "song/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "Balenciaga",
    filePath: "song/10.mp3",
    coverPath: "covers/10.jpg",
  },
  {
    songName: "Bananza Temperature",
    filePath: "song/11.mp3",
    coverPath: "covers/11.png",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Seting seekbar default at starting
progressBar.value = 0;


//Handle Play/Pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    makeAllPlay();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

//Listen To Events
audioElement.addEventListener("timeupdate", () => {
  console.log("Time Update");
  progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

//update seekbar every after second
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.src = `song/${songIndex+1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      masterSongName.innerText = songs[songIndex].songName;
    });
  }
);

// Previos Song
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 10;
  } else {
    songIndex--;
  }
  audioElement.src = `song/${songIndex+1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  masterSongName.innerText = songs[songIndex].songName;
});

// Next Song
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 10) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  audioElement.src = `song/${songIndex+1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  masterSongName.innerText = songs[songIndex].songName;
});
