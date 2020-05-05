$(document).ready(() => {
  console.log("cc");
  $(".carousel.slide .carousel-inner")
    .children(".carousel-item:first-child")
    .addClass("active");
});
