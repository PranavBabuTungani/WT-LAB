async function loadCatalog(){
  try{
    const res = await fetch('book_catalog.xml');
    if(!res.ok) throw new Error('Failed to load XML');
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');

    const books = Array.from(xml.getElementsByTagName('book')).map(b => {
      const title = b.getElementsByTagName('title')[0]?.textContent || '';
      const author = b.getElementsByTagName('author')[0]?.textContent || '';
      const genre = b.getElementsByTagName('genre')[0]?.textContent || '';
      const priceEl = b.getElementsByTagName('price')[0];
      const price = priceEl?.textContent || '';
      const currency = priceEl?.getAttribute('currency') || '';
      const availEl = b.getElementsByTagName('availability')[0];
      const availabilityCount = availEl?.textContent || '0';
      const status = availEl?.getAttribute('status') || (Number(availabilityCount)>0 ? 'in-stock' : 'out-of-stock');
      return { id: b.getAttribute('id'), title, author, genre, price, currency, availabilityCount: Number(availabilityCount), status };
    });

    return books;
  }catch(err){
    console.error(err);
    return null;
  }
}

function renderBooks(books){
  const container = document.getElementById('catalog');
  container.innerHTML = '';
  if(!books || books.length===0){
    container.innerHTML = '<div class="empty">No books found.</div>';
    return;
  }

  const frag = document.createDocumentFragment();
  books.forEach(b=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="title">${escapeHtml(b.title)}</div>
      <div class="author">by ${escapeHtml(b.author)}</div>
      <div class="meta">
        <div class="genre">${escapeHtml(b.genre)}</div>
        <div class="price">${escapeHtml(b.currency)} ${escapeHtml(b.price)}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="availability ${b.status === 'in-stock' ? 'in-stock' : 'out-of-stock'}">${b.status === 'in-stock' ? 'In stock' : 'Out of stock'}</div>
        <div style="color:var(--muted);font-size:0.85rem">Qty: ${b.availabilityCount}</div>
      </div>
    `;
    frag.appendChild(card);
  });
  container.appendChild(frag);
}

function escapeHtml(s){
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

function applyFilters(allBooks){
  const q = document.getElementById('search').value.trim().toLowerCase();
  const genre = document.getElementById('genreFilter').value;
  let filtered = allBooks.filter(b => {
    const hay = `${b.title} ${b.author} ${b.genre}`.toLowerCase();
    return hay.includes(q) && (genre === '' || b.genre === genre);
  });
  renderBooks(filtered);
}

(async function init(){
  const allBooks = await loadCatalog();
  if(allBooks === null){
    document.getElementById('catalog').innerHTML = '<div class="empty">Could not load catalog. Make sure <code>book_catalog.xml</code> is next to the viewer.</div>';
    return;
  }

  // populate genre filter
  const genres = Array.from(new Set(allBooks.map(b=>b.genre).filter(Boolean))).sort();
  const select = document.getElementById('genreFilter');
  genres.forEach(g=>{
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g; select.appendChild(opt);
  });

  // initial render
  renderBooks(allBooks);

  // wire controls
  document.getElementById('search').addEventListener('input', ()=>applyFilters(allBooks));
  select.addEventListener('change', ()=>applyFilters(allBooks));
  document.getElementById('refresh').addEventListener('click', async ()=>{
    const refreshed = await loadCatalog();
    if(refreshed) {
      allBooks.length = 0; allBooks.push(...refreshed);
      applyFilters(allBooks);
    }
  });
})();