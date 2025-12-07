const gamesData = [
  { id: 'valorant',    name: 'Valorant',         logo: 'https://pbs.twimg.com/profile_images/1271880138507145216/jEx4bMW0_400x400.png' },
  { id: 'repo',        name: 'R.E.P.O',          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD_F0HJlREbbCJy4wtWi0Yz0qWawUz1fpVJg&s' },
  { id: 'fortnite',    name: 'Fortnite',         logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png' },
  { id: 'cs',     name: 'Cs',          logo: 'https://gaming-cdn.com/images/products/13664/orig/counter-strike-2-pc-juego-steam-cover.jpg?v=1695885435' },
  { id: 'amongus',     name: 'Among Us',         logo: 'https://static.wikia.nocookie.net/among-us-wiki/images/8/84/Among_Us.png/revision/latest?cb=20240408020746' },
  { id: 'makeitmeme',  name: 'Make it Meme',     logo: 'https://colyseus.io/_astro/make-it-meme-logo.5c9b2cf4_iBIWc.webp' },
  { id: 'lethal',      name: 'Lethal Company',   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuNUS1gkuSPWWWM2S-YoIsRifDASykH4HPQ&s' },
  { id: 'spiderman2',  name: 'SpiderMan 2',      logo: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png' },
  { id: 'Skribbl',name: 'Skribbl',   logo: 'https://imgmediagumlet.lbb.in/media/2020/05/5eb9149cdda0dc33a2fde6bc_1589187740390.jpg' },
  { id: 'fallguys',    name: 'Fall Guys',        logo: 'https://fallguys-db.pages.dev/static/logo.png' },
  { id: 'Gang Beasts', name: 'Gang Beasts', logo: 'https://acdn-us.mitiendanube.com/stores/001/034/003/products/gang-beasts-eec794cd36060dabc917497319649174-480-0.webp' }
];

const STORAGE_KEY = 'valorant_games_played_v2';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } 
catch(e) { saved = {}; }
gamesData.forEach(g => { if (saved[g.id] === undefined) saved[g.id] = false; });

function svgPlaceholder(text, bg="#6d28d9") {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>
    <rect width='100%' height='100%' fill='${bg}'/>
    <text x='50%' y='52%' font-size='120' text-anchor='middle' fill='white' font-family='Rajdhani, sans-serif' font-weight='700'>${text}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

const bgPool = ['#7c3aed','#9f5cff','#b026ff','#8b5cf6','#6d28d9','#5b21b6','#7b61ff'];

function renderGames() {
  const list = document.getElementById('games-list');
  list.innerHTML = '';
  gamesData.forEach((g, idx) => {
    const card = document.createElement('div');
    card.className = 'game-card';
    if (saved[g.id]) card.classList.add('played');

    const logoWrap = document.createElement('div');
    logoWrap.className = 'game-logo';
    const img = document.createElement('img');
    img.alt = g.name + ' logo';
    img.src = g.logo || svgPlaceholder(g.name.slice(0,2).toUpperCase(), bgPool[idx % bgPool.length]);
    logoWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `<div class="game-name">${g.name}</div>
                      <div class="game-sub">${saved[g.id] ? 'Jugado' : 'Pendiente'}</div>`;
    card.appendChild(logoWrap);
    card.appendChild(info);

    if (saved[g.id]) {
      const badge = document.createElement('div');
      badge.className = 'played-badge';
      badge.textContent = 'JUGADO';
      card.appendChild(badge);
    }

    card.addEventListener('click', () => {
      saved[g.id] = !saved[g.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      renderGames();
      if (saved[g.id]) {
        card.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(.98)', opacity: .9 },
          { transform: 'scale(1)', opacity: 1 }
        ], { duration: 300 });
      }
    });

    list.appendChild(card);
  });
}

renderGames();
