//  JAVASCRIPT FOR BOPPYS CHICKEN SHOP // 

// NAV BAR FUNCTIONALITY //

const toggleBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const navLinks = sidebar.querySelectorAll('a');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});

// MERCH CAROUSEL // 

const swiper = new Swiper('.merch-carousel', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 30,
  allowTouchMove: false,
  speed: 15000, 
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 }
  }
});

const carousel = document.querySelector('.merch-carousel');

carousel.addEventListener('mouseenter', () => {
  const wrapper = carousel.querySelector('.swiper-wrapper');
  wrapper.style.transitionDuration = '0ms'; 
  swiper.autoplay.stop();
});

carousel.addEventListener('mouseleave', () => {
  const wrapper = carousel.querySelector('.swiper-wrapper');
  wrapper.style.transitionDuration = ''; 
  swiper.autoplay.start();
});

// REVIEW SECTION - ONLY LOADS ON THE PAGE WHEN THE USER SCROLLS DOWN TO IT //

 const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.review-card').forEach(card => {
    observer.observe(card);
  });

// TOGGLE DAY / NIGHT MODE //

 const toggleButton = document.getElementById("toggleMode");

  function updateButtonLabel() {
    toggleButton.textContent = document.body.classList.contains("night-mode") 
      ? "🌙 Dark Mode" 
      : "☀️ Light Mode";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
    updateButtonLabel();
  });

  updateButtonLabel();

  // HERO SECTION SLIDESHOW //

const slides = document.querySelectorAll('.hero-section img');
let currentIndex = 0;
const intervalTime = 4000; 

window.addEventListener('load', () => {
  setTimeout(() => {
    slides[currentIndex].classList.add('active');
  }, 50); 
});

function showNextSlide() {
  slides[currentIndex].classList.remove('active'); 
  currentIndex = (currentIndex + 1) % slides.length; 
  slides[currentIndex].classList.add('active'); 
}

setInterval(showNextSlide, intervalTime);

  // CART FUNCTIONALITY //

const addToBasketButtons = document.querySelectorAll('.menu-item button, .merch-item button');
const cartCount = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
cartCount.textContent = cart.length;

addToBasketButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const itemContainer = button.closest('.menu-item') || button.closest('.merch-item');
    const name = itemContainer.querySelector('h3')?.innerText || itemContainer.querySelector('p')?.innerText;
    const description = itemContainer.querySelector('.merch-description')?.innerText || '';
    const priceText = itemContainer.querySelector('.item-price')?.innerText || itemContainer.querySelector('.merch-price')?.innerText;
    const price = parseFloat(priceText.replace('£', ''));

    const displayName = description ? `${name} — ${description}` : name;

    const item = { name: displayName, price };

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount.textContent = cart.length;

    alert(`${name} added to cart!`);
  });
});

document.getElementById('cart-button').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

// MENU SEARCH BAR + SECRET ITEM //

const searchInput = document.getElementById('menuSearchInput');
const menuItems = document.querySelectorAll('.menu-item');
const secretItem = document.querySelector('.secret-item');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm.includes('secret')) {
    secretItem.style.display = 'flex'; 
  } else {
    secretItem.style.display = 'none';
  }

  menuItems.forEach(item => {
    if (item.classList.contains('secret-item')) return; 

    const text = item.innerText.toLowerCase();

    if (text.includes(searchTerm) || searchTerm === '') {
      item.style.display = 'flex'; 
    } else {
      item.style.display = 'none';
    }
  });
});