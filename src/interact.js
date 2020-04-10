// function openmenu() {
//   document.getElementById("side-menu").style.display = "block";
//   document.getElementById("menu-btn").style.display = "none";
//   document.getElementById("close-btn").style.display = "block";
// }
// function closemenu() {
//   document.getElementById("side-menu").style.display = "none";
//   document.getElementById("menu-btn").style.display = "block";
//   document.getElementById("close-btn").style.display = "none";
// }
// refactor to
$("#menu-btn").on("click", () => {
  $("#menu-btn").hide();
  $("#close-btn").show();
  $("#side-menu").show();
});

$("#close-btn").on("click", () => {
  $("#close-btn").hide();
  $("#menu-btn").show();
  $("#side-menu").hide();
});
// fix responsive nav bar
const media = window.matchMedia("(max-width: 980px)");
media.addEventListener("change", ({ matches }) => {
  $("#close-btn").hide();
  if (matches) {
    $("#menu-btn").show();
    $("#side-menu").hide();
  } else {
    // $("#close-btn").hide();
    $("#menu-btn").hide();
    $("#side-menu").show();
  }
});
