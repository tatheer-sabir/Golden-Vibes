let songs = [];
let currentPage = 1;
const perPage = 19;
const clientId = '4f6cbd08';

async function fetchSongs(page = 1) {
    const offset = (page - 1) * perPage;
    const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${perPage}&offset=${offset}`);
    const data = await res.json();
    songs = data.results;
    renderSongs(songs);
}

function renderSongs(songList) {
    const grid = document.getElementById('songGrid');
    grid.innerHTML = '';
    songList.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
        <img src="${song.image}" alt="${song.name}" />
        <h3>${song.name}</h3>
        <p>${song.artist_name}</p>
    `;
    card.addEventListener('click', () => playSong(song));
    grid.appendChild(card);
    });
}

function playSong(song) {
    let player = document.getElementById('musicPlayerBar');
    if (!player) {
    player = document.createElement('div');
    player.id = 'musicPlayerBar';
    document.body.appendChild(player);
    }
    player.innerHTML = `
    <div><strong>${song.name}</strong> by ${song.artist_name}</div>
    <audio controls autoplay src="${song.audiodownload}"></audio>
    `;
}

function changePage(dir) {
    const newPage = currentPage + dir;
    if (newPage < 1) return;
    currentPage = newPage;
    fetchSongs(currentPage);
}

function setLoading(isLoading) {
  const grid = document.getElementById('songGrid');
  if (isLoading) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:50px; font-size:1.2rem; color:#b30000;">Loading songs...</div>`;
  } else {
    grid.innerHTML = '';
  }
}

async function fetchSongs(page = 1) {
  setLoading(true);
  const offset = (page - 1) * perPage;
  const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${perPage}&offset=${offset}`);
  const data = await res.json();
  songs = data.results;
  setLoading(false);
  renderSongs(songs);
}

fetchSongs(); 