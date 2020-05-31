$(document).ready(() => {
  $(".list-group-item").on("click", (ev) => {
    $(".list-group-item").removeClass("active");
    $(ev.target).addClass("active");
  });

  $("#toProfile").on("click", (ev) => {
    ev.preventDefault();
    window.history.pushState("", "", "/account/profile");
    fetch("/account/profile", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.text())
      .then((res) => $("div.col-lg-8.pb-5").html(res));
    $("form.row").attr("action", "/account/profile");
  });

  $("#toPassword").on("click", (ev) => {
    ev.preventDefault();
    window.history.pushState("", "", "/account/password");
    fetch("/account/password", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.text())
      .then((res) => $("div.col-lg-8.pb-5").html(res));
    $("form.row").attr("action", "/account/password");
  });

  $("#toHistory").on("click", (ev) => {
    ev.preventDefault();
    window.history.pushState("", "", "/account/history");
    fetch("/account/history", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.text())
      .then((res) => $("div.col-lg-8.pb-5").html(res));
  });
});
