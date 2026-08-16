const songs = [
  { title:"Kya Mujhe Pyaar Hai", artist:"KK", category:["kk","chill"], q:"Kya Mujhe Pyaar Hai KK official" },
  { title:"Pehla Nasha", artist:"Udit Narayan, Sadhana Sargam", category:["90s","chill"], q:"Pehla Nasha official song" },
  { title:"Pal", artist:"KK", category:["kk","chill"], q:"KK Pal official" },
  { title:"Zara Sa", artist:"KK", category:["kk","chill"], q:"Zara Sa KK official" },
  { title:"Tujhe Dekha To", artist:"Kumar Sanu, Lata Mangeshkar", category:["90s"], q:"Tujhe Dekha To official DDLJ" },
  { title:"Yaaron", artist:"KK", category:["kk"], q:"KK Yaaron official" },
  { title:"Aankhon Mein Teri", artist:"KK", category:["kk","chill"], q:"Aankhon Mein Teri KK official" },
  { title:"Tu Hi Meri Shab Hai", artist:"KK", category:["kk","chill"], q:"Tu Hi Meri Shab Hai KK official" },
  { title:"Khuda Jaane", artist:"KK, Shilpa Rao", category:["kk","chill"], q:"Khuda Jaane official song" },
  { title:"Alvida", artist:"KK", category:["kk"], q:"Alvida KK Life in a Metro official" },
  { title:"Do Dil Mil Rahe Hain", artist:"Kumar Sanu", category:["90s","chill"], q:"Do Dil Mil Rahe Hain official" },
  { title:"Ghar Se Nikalte Hi", artist:"Udit Narayan", category:["90s","chill"], q:"Ghar Se Nikalte Hi official" },
  { title:"Ek Ladki Ko Dekha", artist:"Kumar Sanu", category:["90s"], q:"Ek Ladki Ko Dekha official song 1942" },
  { title:"Bahon Ke Darmiyan", artist:"Alka Yagnik, Hariharan", category:["90s","chill"], q:"Bahon Ke Darmiyan official song" },
  { title:"Dheere Dheere Se Meri Zindagi Mein Aana", artist:"Anuradha Paudwal, Kumar Sanu", category:["90s"], q:"Dheere Dheere Se Aashiqui official song" },
  { title:"Tum Se Hi", artist:"Mohit Chauhan", category:["chill"], q:"Tum Se Hi Jab We Met official" },
  { title:"Iktara", artist:"Kavita Seth", category:["chill"], q:"Iktara Wake Up Sid official" },
  { title:"Ajab Si", artist:"KK", category:["kk","chill"], q:"Ajab Si KK official Om Shanti Om" },
  { title:"Tera Hone Laga Hoon", artist:"Atif Aslam, Alisha Chinai", category:["chill"], q:"Tera Hone Laga Hoon official" },
  { title:"Pee Loon", artist:"Mohit Chauhan", category:["chill"], q:"Pee Loon official song" },
  { title:"Ilahi", artist:"Arijit Singh", category:["chill"], q:"Ilahi Yeh Jawaani Hai Deewani official" },
  { title:"Hawayein", artist:"Arijit Singh", category:["chill"], q:"Hawayein official song" },
  { title:"Apna Bana Le", artist:"Arijit Singh", category:["new","chill"], q:"Apna Bana Le official" },
  { title:"Sahiba", artist:"Jasleen Royal, Stebin Ben", category:["new","chill"], q:"Sahiba Jasleen Royal Stebin Ben official" },
  { title:"Husn", artist:"Anuv Jain", category:["new","chill"], q:"Husn Anuv Jain official" },
  { title:"O Maahi", artist:"Arijit Singh", category:["new","chill"], q:"O Maahi official song" },
  { title:"Heeriye", artist:"Jasleen Royal, Arijit Singh", category:["new","chill"], q:"Heeriye official song" },
  { title:"Ve Kamleya", artist:"Arijit Singh, Shreya Ghoshal", category:["new","chill"], q:"Ve Kamleya official song" },
  { title:"Satranga", artist:"Arijit Singh", category:["new"], q:"Satranga official song" },
  { title:"Chaleya", artist:"Arijit Singh, Shilpa Rao", category:["new","chill"], q:"Chaleya official song" },
  { title:"Phir Le Aya Dil", artist:"Arijit Singh", category:["chill"], q:"Phir Le Aya Dil official" },
  { title:"Agar Tum Saath Ho", artist:"Alka Yagnik, Arijit Singh", category:["chill"], q:"Agar Tum Saath Ho official" },
  { title:"Sach Keh Raha Hai Deewana", artist:"KK", category:["kk"], q:"Sach Keh Raha Hai Deewana KK official" },
  { title:"Tu Jo Mila", artist:"KK", category:["kk","chill"], q:"Tu Jo Mila KK official" },
  { title:"Beete Lamhein", artist:"KK", category:["kk","chill"], q:"Beete Lamhein KK official" },
  { title:"Dil Ibaadat", artist:"KK", category:["kk","chill"], q:"Dil Ibaadat KK official" },
  { title:"Labon Ko", artist:"KK", category:["kk","chill"], q:"Labon Ko KK official" },
  { title:"Zindagi Do Pal Ki", artist:"KK", category:["kk"], q:"Zindagi Do Pal Ki KK official" },
  { title:"Aashayein", artist:"KK", category:["kk"], q:"Aashayein KK official" },
  { title:"Dus Bahane", artist:"Shaan, KK", category:["kk"], q:"Dus Bahane official song" }
];

let currentIndex = 0;
let currentFilter = "all";
let fakePlaying = false;
let timer = null;
let elapsed = 0;
const fakeDuration = 270;

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

function fmt(sec){
  const m=Math.floor(sec/60), s=String(Math.floor(sec%60)).padStart(2,"0");
  return `${m}:${s}`;
}

function youtubeUrl(song){
  return "https://www.youtube.com/results?search_query="+encodeURIComponent(song.q);
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

function selectSong(index, open=false){
  currentIndex=index;
  const s=songs[currentIndex];
  titleEl.textContent=s.title;
  artistEl.textContent=s.artist;
  elapsed=0; progress.value=0; currentTimeEl.textContent="0:00";
  durationEl.textContent=fmt(fakeDuration);
  renderSongs();
  if(open) window.open(youtubeUrl(s), "_blank", "noopener");
}

function togglePlay(){
  fakePlaying=!fakePlaying;
  playBtn.textContent=fakePlaying?"❚❚":"▶";
  cover.classList.toggle("playing", fakePlaying);
  clearInterval(timer);
  if(fakePlaying){
    timer=setInterval(()=>{
      elapsed=Math.min(fakeDuration, elapsed+1);
      progress.value=(elapsed/fakeDuration)*100;
      currentTimeEl.textContent=fmt(elapsed);
      if(elapsed>=fakeDuration) nextSong();
    },1000);
  }
}

function nextSong(){
  clearInterval(timer);
  if(shuffleToggle.checked){
    let n=currentIndex;
    while(n===currentIndex && songs.length>1) n=Math.floor(Math.random()*songs.length);
    currentIndex=n;
  }else currentIndex=(currentIndex+1)%songs.length;
  selectSong(currentIndex,false);
  if(fakePlaying) togglePlay(), togglePlay();
}

function prevSong(){
  currentIndex=(currentIndex-1+songs.length)%songs.length;
  selectSong(currentIndex,false);
}

playBtn.addEventListener("click", togglePlay);
document.getElementById("nextBtn").addEventListener("click",nextSong);
document.getElementById("prevBtn").addEventListener("click",prevSong);
document.getElementById("shuffleBtn").addEventListener("click",()=>shuffleToggle.checked=!shuffleToggle.checked);
document.getElementById("openBtn").addEventListener("click",()=>window.open(youtubeUrl(songs[currentIndex]),"_blank","noopener"));
progress.addEventListener("input",()=>{
  elapsed=fakeDuration*(Number(progress.value)/100);
  currentTimeEl.textContent=fmt(elapsed);
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

selectSong(0,false);
renderSongs();
