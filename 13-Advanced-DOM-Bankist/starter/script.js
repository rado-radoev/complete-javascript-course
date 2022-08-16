'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsConent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Scrolling
// SMOOTH SCROLLING
btnScrollTo.addEventListener('click', (e) => {
  section1.scrollIntoView({behavior: 'smooth'});
});


///////////////////////////////////////
// Page Navigations
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// });
// 1. add event listener to common parent element
// 2. determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  // console.log(e.target)
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///////////////////////////////////////
// Tabbed Component
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsConent.forEach(c => c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Fade Annimatin
const handleHover = function(event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function() {
//   console.log(window.scrollY, initialCoords.top);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sicky')
//   else nav.classList.remove('sticky')
// })

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => console.log(entry))
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],

// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1)
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry)

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObeserver =  new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObeserver.observe(header);


///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry)

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};


const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})


///////////////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets)

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-300px)';
// slider.style.overflow = 'visible'

const slider = function () {
  const sliders = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = sliders.length;


  // Funcitons
  const createDots = function () {
    sliders.forEach(function(_, i)  {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }


  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"`).classList.add('dots__dot--active');
  }


  const goToSlide = function(slide) {
    sliders.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  }
  // sliders.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)
  // Next slide
  const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    }
    else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function () {
    createDots();
    goToSlide(0)
    activateDot(0);
  }
  init();

  // Event hanlder
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    // if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowRight' && nextSlide();
  })

  dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
}

slider();



///////////////////////////////////////
// LECTURES

// console.log(document)
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('#section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message)
// // header.append(message)
// header.append(message.cloneNode(true));

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());


// // Styles
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%';

// console.log(message.style.color)
// console.log(message.style.backgroundColor)

// console.log(getComputedStyle(message).color)
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

// document.documentElement.style.setProperty('--color-primary', 'orangered')

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt)
// console.log(logo.className)

// logo.alt = 'Beautiful minimalist logo'

// // Non-standard
// console.log(logo.designer)
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src)
// console.log(logo.getAttribute('src'))

// const twitterLink = document.querySelector('.twitter-link');
// console.log(twitterLink.href)
// console.log(twitterLink.getAttribute('href'))

// const navlinkbtn = document.querySelector('.nav__link--btn')
// console.log(navlinkbtn.href)
// console.log(navlinkbtn.getAttribute('href'))

// console.log(logo.dataset.versionNumber)

// // const btnScrollTo = document.querySelector('.btn--scroll-to');
// // const section1 = document.querySelector('#section--1');

// // SMOOTH SCROLLING
// btnScrollTo.addEventListener('click', (e) => {
//   const s1coords = section1.getBoundingClientRect();

//   // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

//   // window.scrollTo({
//   //   left: s1coords.left + window.scrollX,
//   //   top: s1coords.top + window.scrollY,
//   //   behavior: 'smooth'
//   // })

//   section1.scrollIntoView({behavior: 'smooth'});
// })

// const alertH1 = function(event) {
//   // alert('addEventListenr: Great!');

//   h1.removeEventListener('mouseenter', alertH1);
// }

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1)

// // h1.onmouseenter = function(event) {
// //   alert('onmouseenter: Great!')
// // }

// // rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() * (min - max + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`

// ///////////////////////////////////////
// // Event Propagation in Practice
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });


// go down child
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)


// // go up parents
// console.log(h1.parentNode)
// console.log(h1.parentElement)
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// h1.closest('h1').style.background = 'var(--gradient-primary)'

// // go sideways siblings
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// console.log(h1.previousSibling)
// console.log(h1.nextSibling)
// console.log(h1.parentElement.children)

// console.log([...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// }))
