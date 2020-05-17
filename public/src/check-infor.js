// $(document).ready(function() {
//     $(".signup-form").on('submit', function(e) {
//         e.preventDefault();

//         var username = $(".input-username").val();
//         var password = $(".input-pass").val();
//         var firstname = $(".input-firstname").val();
//         var lastname = $(".input-lastname").val();
//         var phonenumber = $(".input-phone").val();

//         $(".error, .accept").remove();

//         if (username.length < 1) {
//             $(".input-username").after('<p class="error warning-text">This field is required</p>');
//         } else {
//             $(".input-username").after('<p class="accept warning-text">Valid</p>');
//         }
//         if (password.length < 1) {
//             $(".input-pass").after('<p class="error warning-text">This field is required</p>');
//         } else {
//             $(".input-pass").after('<p class="accept warning-text">Valid</p>');
//         }
//         if (firstname.length < 1 || lastname.length < 1) {
//             $(".input-lastname").after('<p class="error warning-text">This field is required</p>');
//         } else {
//             $(".input-lastname").after('<p class="accept warning-text">Valid</p>');
//         }
//         if (phonenumber.length < 1) {
//             $(".input-phone").after('<p class="error warning-text">This field is required</p>');
//         } else {
//             $(".input-phone").after('<p class="accept warning-text">Valid</p>');
//         }

//         if (($('#male').is(':checked') == false) && ($("#female").is(':checked') == false)) {
//             $("#gender").append('<p class="error warning-text">This field is required</p>');
//         } else {
//             $("#gender").append('<p class="accept warning-text">Valid</p>');
//         }

//         var day = parseInt($("#day").val());
//         var month = parseInt($("#month").val());
//         var year = parseInt($("#year").val());

//         var date = new Date(year, month - 1, day);
//         if (!(date.getFullYear() == year && date.getMonth() + 1 == month && date.getDate() == day)) {
//             $("#year").after('<p class="error warning-text">Invalid date</p>');
//         } else {
//             $("#year").after('<p class="accept warning-text">Valid date</p>');
//         }
//     });
// });
