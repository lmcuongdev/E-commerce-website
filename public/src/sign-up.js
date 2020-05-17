$("#sign-up").click(function () {
  $("#form-group").css("display", "block");
});

$("#form-group span").click(function () {
  $("#form-group").css("display", "none");
});

$("#form-group").submit((ev) => {
  ev.preventDefault();
  //get data here
  const username = $.trim($("input[name='username']").val());
  const password = $.trim($("input[name='password']").val());
  if (username && password) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(window.location);
        if (res.session.userId) {
          window.location.reload();
        } else {
          alert("Sai tài khoản hoặc mật khẩu");
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("Chưa nhập tài khoản và mật khẩu");
  }
});
