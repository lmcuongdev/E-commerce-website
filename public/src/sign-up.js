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
