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
// Nav bar responsive interact
$(document).ready(() => {
  $("#menu-btn").on("click", () => {
    $("#menu-btn").fadeOut(100);
    setTimeout(() => $("#close-btn").fadeIn(100), 100);
    $("#side-menu").slideDown("fast");
  });

  $("#close-btn").on("click", () => {
    $("#close-btn").fadeOut(100);
    setTimeout(() => $("#menu-btn").fadeIn(100), 100);
    $("#side-menu").slideUp("fast");
  });
  // fix responsive nav bar
  const media = window.matchMedia("(max-width: 980px)");
  media.addEventListener("change", ({ matches }) => {
    $("#close-btn").hide();
    if (matches) {
      $("#menu-btn").show();
      $("#side-menu").hide();
    } else {
      $("#menu-btn").hide();
      $("#side-menu").show();
    }
  });
  
  $(window).scroll(function () {
         if ($(this).scrollTop() > 500) {
             $('#back-to-top').fadeIn();
         } else {
             $('#back-to-top').fadeOut();
         }
     });
     // scroll body to 0px on click
     $('#back-to-top').click(function () {
         $('#back-to-top').tooltip('hide');
         $('body,html').animate({
             scrollTop: 0
         }, 800);
         return false;
     });
     
     $('#back-to-top').tooltip('show');
  
  $(".filter-button").click(function(){
      var value = $(this).attr('data-filter');
      
      if(value == "all")
      {
          $('.filter').show('1000');
      }
      else
      {
          $(".filter").not('.'+value).hide('3000');
          $('.filter').filter('.'+value).show('3000');
          
      }
  });
});

$("#sign-up").click(function () {
  $("#form-group").css("display", "block");
});

$("#form-group span").click(function () {
  $("#form-group").css("display", "none");
});

$("#form-group").submit((ev) => {
  ev.preventDefault();
  //get data here
  const username = $("input[name='username']").val();
});
