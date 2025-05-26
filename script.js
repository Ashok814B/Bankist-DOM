"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnscrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnscrollTo.addEventListener("click", function (e) {
  const s1coor = section1.getBoundingClientRect();
  console.log(s1coor);

  console.log(e.target.getBoundingClientRect());

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  // window.scrollTo(
  //   s1coor.left + window.pageXOffset,
  //   s1coor.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coor.left + window.pageXOffset,
  //   top: s1coor.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});

//Tabs Component
const tabs = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");

//Normal Method
/*
tabs.forEach((t) =>
  t.addEventListener("click", function () {
    console.log("Tab");
  })
);
*/

//Event Deligation
tabscontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Gaurd Clause //Instead of clicking on button if we clicked on container the clicked variable will be null to get rid of this by adding this it will not execute the remining code
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
});
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

const h1 = document.querySelector("h1");

// h1.addEventListener("mouseenter", function () {
//   alert("GReat Mouse Hovered");
// });
// h1.onmouseenter = function () {
//   alert("hi");
// };

// const alertH1 = function () {
//   alert("Hi this is great");
// };
// h1.addEventListener("mouseenter", alertH1);
// setTimeout(() => {
//   h1.removeEventListener("mouseenter", alertH1);
// }, 5000);

h1.closest("h1").style.background = "var(--gradient-primary)";

//Going sideways: sibilings
console.log(h1.previousElementSibling);
console.log(h1.nextSibling);

console.log(h1.previousSibling);
console.log(h1.nextsibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.background = "var(--gradient-primary)";
});
