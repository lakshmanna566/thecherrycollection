
const products = [
  {id:1, category:'Lips', name:'Lip Kit - Cherry Red', price:24.00, img:'product1.jpg', desc:'Iconic Lip Kit with long-lasting color.'},
  {id:2, category:'Lips', name:'Cherry Lip Gloss', price:18.00, img:'product6.jpg', desc:'High-shine cherry gloss.'},
  {id:3, category:'Lips', name:'Liquid Lipstick - Velvet', price:22.00, img:'product4.jpg', desc:'Velvety matte liquid lipstick.'},
  {id:4, category:'Eyes', name:'Black Cherry Eyeliner', price:19.00, img:'product3.jpg', desc:'Deep rich eyeliner for sultry looks.'},
  {id:5, category:'Eyes', name:'Cherry Eyeshadow Palette', price:45.00, img:'product7.jpg', desc:'12-color palette of cherry tones.'},
  {id:6, category:'Eyes', name:'Precision Pencil Liner', price:14.00, img:'product9.jpg', desc:'Smooth pencil liner for precise lines.'},
  {id:7, category:'Face', name:'Cherry Blush', price:28.00, img:'product2.jpg', desc:'Cream blush for a natural glow.'},
  {id:8, category:'Face', name:'Radiant Highlighter', price:30.00, img:'product5.jpg', desc:'Luminous highlighter for sparkle.'},
  {id:9, category:'Face', name:'Soft Bronzer', price:26.00, img:'product8.jpg', desc:'Warm bronzer for sun-kissed skin.'}
];

let cart = [];

function formatPrice(p){ return p.toFixed(2); }

function createProductCard(prod){
  const el = document.createElement('article');
  el.className = 'product';
  const imgPath = prod.img;
  el.innerHTML = `
    <div>
      <div class="img-placeholder">
        <img src="${imgPath}" alt="${prod.name}">
      </div>
      <h4>${prod.name}</h4>
      <div class="price">$${formatPrice(prod.price)}</div>
    </div>
    <div>
      <div class="controls">
        <button class="btn small view-btn" data-id="${prod.id}">View Details</button>
        <button class="btn small add-btn" data-id="${prod.id}">Add to Cart</button>
      </div>
      <div class="details" id="details-${prod.id}">${prod.desc}</div>
    </div>
  `;
  return el;
}

function renderProducts(){
  const lips = document.getElementById('lips-list');
  const eyes = document.getElementById('eyes-list');
  const face = document.getElementById('face-list');
  products.forEach(prod=>{
    const card = createProductCard(prod);
    if(prod.category === 'Lips') lips.appendChild(card);
    if(prod.category === 'Eyes') eyes.appendChild(card);
    if(prod.category === 'Face') face.appendChild(card);
  });

  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      const details = document.getElementById('details-'+id);
      if(details.style.display === 'block') details.style.display = 'none';
      else details.style.display = 'block';
    });
  });

  document.querySelectorAll('.add-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.id);
      const prod = products.find(p=>p.id===id);
      addToCart(prod);
    });
  });
}

function addToCart(prod){
  const found = cart.find(i=>i.id===prod.id);
  if(found) found.qty += 1;
  else cart.push({id:prod.id, name:prod.name, price:prod.price, qty:1});
  updateCartUI();
}

function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
  updateCartUI();
}

function updateCartUI(){
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>${item.name} x ${item.qty}</div>
      <div>$${formatPrice(item.price * item.qty)} <button class="btn small remove-btn" data-id="${item.id}">Remove</button></div>
    `;
    container.appendChild(div);
  });
  document.getElementById('cart-total').textContent = formatPrice(total);
  document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);

  document.querySelectorAll('.remove-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = Number(e.currentTarget.dataset.id);
      removeFromCart(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  document.getElementById('checkout-btn').addEventListener('click', ()=>{
    if(cart.length===0) { alert('Your cart is empty.'); return; }
    let summary = 'Order summary:\n';
    cart.forEach(i=> summary += `${i.name} x${i.qty} — $${formatPrice(i.price*i.qty)}\n`);
    summary += `Total: $${formatPrice(cart.reduce((s,i)=>s+i.price*i.qty,0))}`;
    alert(summary + '\n\n(Checkout is a demo in this package.)');
  });
});
