const btnscrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

//Learn more button scrolling
btnscrollTo.addEventListener("click", function (e) {
  const s1coor = section1.getBoundingClientRect();
  //console.log(s1coor);

  //console.log('Height',document.documentElement.clientHeight);

  // window.scrollTo(
  //      s1coor.left+window.pageXOffset,
  //      s1coor.top+window.pageYOffset]
  // );

  // window.scrollTo({
  //     left: s1coor.left+window.pageXOffset,
  //     top: s1coor.top+window.pageYOffset,
  //     behavior:'smooth'
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function(ele){
//     ele.addEventListener('click',function(e){
//         e.preventDefault();
//         console.log("Link");
//         const id=this.getAttribute('href');
//         console.log(id);
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});

//     })
// })

//1.Add Event Listner to common parent
//2.Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const tabs = document.querySelectorAll(".operations__tab");
const tabcontainer = document.querySelector(".operations__tab-container");
const operationscontent = document.querySelectorAll(".operations__content");

tabcontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //Gaurad CLause
  if (e.target !== clicked) return;

  //Remmove active class from other the Tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  //Add the tab active to clicked
  clicked.classList.add("operations__tab--active");

  //Remomve active class content fromm other content
  operationscontent.forEach((ele) =>
    ele.classList.remove("operations__content--active")
  );
  //Activate the content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade Animation
// const logo=document.querySelector('.nav__logo');
const navitems = document.querySelectorAll(".nav__item");
const nav = document.querySelector(".nav");

const handlehover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibilings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");

    sibilings.forEach((ele) => {
      if (link !== ele) ele.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//we cant pass arguments to a handler function
//Instead we can bind the handler functio0n and we can pass the arguments

/*nav.addEventListener('mouseover',function(e){
   handlehover(e,0.5);
})
nav.addEventListener('mouseout',function(e){
    handlehover(e,1)
})*/

nav.addEventListener("mouseover", handlehover.bind(0.5));
nav.addEventListener("mouseout", handlehover.bind(1));

//Adding Sticky Nav
// const section1coor=section1.getBoundingClientRect();
// window.addEventListener('scroll',function(e){
//     if(this.scrollY>section1coor.top)   nav.classList.add('sticky')
//     else nav.classList.remove('sticky')
// })

const header = document.querySelector(".header");
const navheight = nav.getBoundingClientRect().height;
const stickynav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headreobserver = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
  behavior: "smooth",
});
headreobserver.observe(header);

//REvealing the Sections
const allsections = document.querySelectorAll(".section");

const revealsection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionobserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(function (section) {
  sectionobserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading of the images
const targetimages = document.querySelectorAll("img[data-src]");
console.log(targetimages);

const loadimg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", function () {});

  observer.unobserve(entry.target);
};
const imgobserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
targetimages.forEach((img) => {
  imgobserver.observe(img);
});

//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnleft = document.querySelector(".slider__btn--left");
  const btnright = document.querySelector(".slider__btn--right");
  const dotcontainer = document.querySelector(".dots");
  let currentSlide = 0;
  const maxslide = 3;

  const createdots = function () {
    slides.forEach(function (_, i) {
      dotcontainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (currentSlide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //THese methods are for initialization of the elments instead of calling every time aftre function we will be calling all at once by init
  const init = function () {
    //this funciton inintialize the dots
    createdots();
    //this function initialize the slides to first slide as default
    goToSlide(0);
    //this function activate the dots according to slide how initially it is
    activateDot(0);
  };
  init();

  const nextSlide = function () {
    if (currentSlide == maxslide - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxslide - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  btnright.addEventListener("click", nextSlide);
  btnleft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotcontainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      currentSlide = e.target.dataset.slide;
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};
slider();

/* Instead of writing the lines each and every time, like for btnleft, for dots,for arrow keys and changing i alittle bit logic
i kept that in function of prevslide,nextslide,gotoslide by that we can call every we want instead of writing again and again*/

// btnright.addEventListener('click',function(){
//     if(currentSlide==maxslide-1)    currentSlide=0;
//     else    currentSlide++ ;
//     slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`);

// });

//1: 0,100%,200%
//2: 100,0%,200% ---> 0,100,200

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
const h1=document.querySelector('h1');
const alerth1=function(){
    h1.removeEventListener('mouseenter',alerth1);
    alert('Great this is working');
}
// h1.addEventListener('mouseenter',function(){
//     alert('Hi this is sample');
// })
h1.addEventListener('mouseenter',alerth1);
*/
