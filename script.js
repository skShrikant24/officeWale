const songs = [
  { title:"Kya Mujhe Pyaar Hai", artist:"KK", category:["kk","chill"], id:"7bH9tGBCzFU" },
  { title:"Pehla Nasha", artist:"Udit Narayan, Sadhana Sargam", category:["90s","chill"], id:"ODu7OyAqK-Q" },
  { title:"Pal", artist:"KK", category:["kk","chill"], id:"NUqlCJTYu6I" },
  { title:"Zara Sa", artist:"KK", category:["kk","chill"], id:"-8C_2BBVWk8" },
  { title:"Tujhe Dekha To", artist:"Kumar Sanu, Lata Mangeshkar", category:["90s"], id:"cNV5hLSa9H8" },
  { title:"Yaaron", artist:"KK", category:["kk"], id:"LCfvYo3ILG0" },
  { title:"Aankhon Mein Teri", artist:"KK", category:["kk","chill"], id:"7KKVb0_IdD4" },
  { title:"Tu Hi Meri Shab Hai", artist:"KK", category:["kk","chill"], id:"mWBvudKcByg" },
  { title:"Khuda Jaane", artist:"KK, Shilpa Rao", category:["kk","chill"], id:"cmMiyZaSELo" },
  { title:"Alvida", artist:"KK", category:["kk"], id:"hM9QDpLHhdw" },
  { title:"Do Dil Mil Rahe Hain", artist:"Kumar Sanu", category:["90s","chill"], id:"eKIpHujNdX0" },
  { title:"Ghar Se Nikalte Hi", artist:"Udit Narayan", category:["90s","chill"], id:"_IcVb6hFhPs" },
  { title:"Ek Ladki Ko Dekha", artist:"Kumar Sanu", category:["90s"], id:"fTauOK8J-U8" },
  { title:"Bahon Ke Darmiyan", artist:"Alka Yagnik, Hariharan", category:["90s","chill"], id:"yx3pXbo1aBM" },
  { title:"Dheere Dheere Se Meri Zindagi Mein Aana", artist:"Anuradha Paudwal, Kumar Sanu", category:["90s"], id:"KeyfUuXPOcY" },
  { title:"Tum Se Hi", artist:"Mohit Chauhan", category:["chill"], id:"Cb6wuzOurPc" },
  { title:"Iktara", artist:"Kavita Seth", category:["chill"], id:"akjdj6iHttY" },
  { title:"Ajab Si", artist:"KK", category:["kk","chill"], id:"7KKVb0_IdD4" },
  { title:"Tera Hone Laga Hoon", artist:"Atif Aslam, Alisha Chinai", category:["chill"], id:"rTuxUAuJRyY" },
  { title:"Pee Loon", artist:"Mohit Chauhan", category:["chill"], id:"D8XFTglfSMg" },
  { title:"Ilahi", artist:"Arijit Singh", category:["chill"], id:"fdubeMFwuGs" },
  { title:"Hawayein", artist:"Arijit Singh", category:["chill"], id:"cYOB941gyXI" },
  { title:"Apna Bana Le", artist:"Arijit Singh", category:["new","chill"], id:"UEvOsQBu1jY" },
  { title:"Sahiba", artist:"Jasleen Royal, Stebin Ben", category:["new","chill"], id:"NW6Dgax2d6I" },
  { title:"Husn", artist:"Anuv Jain", category:["new","chill"], id:"gJLVTKhTnog" },
  { title:"O Maahi", artist:"Arijit Singh", category:["new","chill"], id:"Etkd-07gnxM" },
  { title:"Heeriye", artist:"Jasleen Royal, Arijit Singh", category:["new","chill"], id:"RLzC55ai0eo" },
  { title:"Ve Kamleya", artist:"Arijit Singh, Shreya Ghoshal", category:["new","chill"], id:"QXJyMpxd210" },
  { title:"Satranga", artist:"Arijit Singh", category:["new"], id:"HrnrqYxYrbk" },
  { title:"Chaleya", artist:"Arijit Singh, Shilpa Rao", category:["new","chill"], id:"VAdGW7QDJiU" },
  { title:"Phir Le Aya Dil", artist:"Arijit Singh", category:["chill"], id:"k6BnSIs3XUQ" },
  { title:"Agar Tum Saath Ho", artist:"Alka Yagnik, Arijit Singh", category:["chill"], id:"xRb8hxwN5zc" },
  { title:"Sach Keh Raha Hai Deewana", artist:"KK", category:["kk"], id:"kp-Bqr1Gtyw" },
  { title:"Tu Jo Mila", artist:"KK", category:["kk","chill"], id:"9i1Ri8kPoec" },
  { title:"Beete Lamhein", artist:"KK", category:["kk","chill"], id:"UlacMvx_VYk" },
  { title:"Dil Ibaadat", artist:"KK", category:["kk","chill"], id:"U2QNhsAgIIE" },
  { title:"Labon Ko", artist:"KK", category:["kk","chill"], id:"0OGguI0uDfE" },
  { title:"Zindagi Do Pal Ki", artist:"KK", category:["kk"], id:"r-XG86T2jNc" },
  { title:"Aashayein", artist:"KK", category:["kk"], id:"CaI0xNLpurM" },
  { title:"Dus Bahane", artist:"Shaan, KK", category:["kk"], id:"qE3DfF66DNA" }
];

let currentIndex = 27;
let currentFilter = "all";
let player = null;
let playerReady = false;
let progressTimer = null;

const songList = document.getElementById("songList");
const titleEl = document.getElementById("trackTitle");
const artistEl = document.getElementById("trackArtist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const cover = document.getElementById("cover");
const countEl = document.getElementById("songCount");
const shuffleToggle = document.getElementById("shuffleToggle");
const playerStatus = document.getElementById("playerStatus");

function fmt(sec){
  if(!Number.isFinite(sec)) return "0:00";
  const m=Math.floor(sec/60), s=String(Math.floor(sec%60)).padStart(2,"0");
  return `${m}:${s}`;
}

function youtubeUrl(song){
  return `https://www.youtube.com/watch?v=${song.id}`;
}

function filteredSongs(){
  return currentFilter==="all" ? songs.map((s,i)=>({...s,_i:i})) :
    songs.map((s,i)=>({...s,_i:i})).filter(s=>s.category.includes(currentFilter));
}

function renderSongs(){
  const list=filteredSongs();
  countEl.textContent=`${list.length} songs`;
  songList.innerHTML=list.map((s,n)=>`
    <div class="song ${s._i===currentIndex?'active':''}" data-index="${s._i}">
      <div class="num">${s._i===currentIndex?'▶':n+1}</div>
      <div>
        <div class="song-title">${s.title}</div>
        <div class="song-artist">${s.artist}</div>
      </div>
      <div class="song-cat">${s.category.includes("kk")?"KK":s.category.includes("90s")?"90s":s.category.includes("new")?"New":"Chill"}</div>
    </div>`).join("");
  [...songList.querySelectorAll(".song")].forEach(el=>{
    el.addEventListener("click",()=>selectSong(Number(el.dataset.index), true));
  });
}

function selectSong(index, shouldPlay=false){
  currentIndex=index;
  const s=songs[currentIndex];
  titleEl.textContent=s.title;
  artistEl.textContent=s.artist;
  progress.value=0;
  currentTimeEl.textContent="0:00";
  durationEl.textContent="0:00";
  renderSongs();
  if(playerReady){
    if(shouldPlay) player.loadVideoById(s.id);
    else player.cueVideoById(s.id);
  }
}

function togglePlay(){
  if(!playerReady) return;
  if(player.getPlayerState()===YT.PlayerState.PLAYING) player.pauseVideo();
  else player.playVideo();
}

function nextSong(){
  if(shuffleToggle.checked){
    let n=currentIndex;
    while(n===currentIndex && songs.length>1) n=Math.floor(Math.random()*songs.length);
    currentIndex=n;
  }else currentIndex=(currentIndex+1)%songs.length;
  selectSong(currentIndex,playerReady);
}

function prevSong(){
  currentIndex=(currentIndex-1+songs.length)%songs.length;
  selectSong(currentIndex,playerReady);
}

function updateProgress(){
  if(!playerReady || typeof player.getDuration!=="function") return;
  const current=player.getCurrentTime()||0;
  const duration=player.getDuration()||0;
  progress.value=duration ? (current/duration)*100 : 0;
  currentTimeEl.textContent=fmt(current);
  durationEl.textContent=fmt(duration);
}

function onPlayerStateChange(event){
  const playing=event.data===YT.PlayerState.PLAYING;
  playBtn.textContent=playing?"❚❚":"▶";
  playBtn.title=playing?"Pause":"Play";
  cover.classList.toggle("playing",playing);
  playerStatus.textContent=playing?"Playing with YouTube":"Press Play to listen here.";
  clearInterval(progressTimer);
  if(playing) progressTimer=setInterval(updateProgress,500);
  updateProgress();
  if(event.data===YT.PlayerState.ENDED) nextSong();
}

window.onYouTubeIframeAPIReady=function(){
  player=new YT.Player("youtubePlayer",{
    width:220,
    height:220,
    videoId:songs[currentIndex].id,
    playerVars:{playsinline:1,controls:0,rel:0,modestbranding:1},
    events:{
      onReady(){
        playerReady=true;
        playBtn.disabled=false;
        playerStatus.textContent="Press Play to listen here.";
        updateProgress();
      },
      onStateChange:onPlayerStateChange,
      onError(){
        playerStatus.textContent="This upload cannot play here. Use the ↗ button to open it on YouTube.";
        playBtn.textContent="▶";
        cover.classList.remove("playing");
      }
    }
  });
};

playBtn.disabled=true;
const youtubeApi=document.createElement("script");
youtubeApi.src="https://www.youtube.com/iframe_api";
document.head.appendChild(youtubeApi);

playBtn.addEventListener("click", togglePlay);
document.getElementById("nextBtn").addEventListener("click",nextSong);
document.getElementById("prevBtn").addEventListener("click",prevSong);
document.getElementById("shuffleBtn").addEventListener("click",()=>shuffleToggle.checked=!shuffleToggle.checked);
document.getElementById("openBtn").addEventListener("click",()=>window.open(youtubeUrl(songs[currentIndex]),"_blank","noopener"));
progress.addEventListener("input",()=>{
  if(!playerReady) return;
  const duration=player.getDuration()||0;
  player.seekTo(duration*(Number(progress.value)/100),true);
  updateProgress();
});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter=btn.dataset.filter;
    renderSongs();
  });
});

document.getElementById("modeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("light");
});

selectSong(currentIndex,false);
renderSongs();
