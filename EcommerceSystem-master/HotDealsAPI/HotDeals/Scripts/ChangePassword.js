function validatePass(password) {
    var passformat = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (password != null && password != "") {
        if (passformat.test(password)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

var PasswordFormatIsReady = 0;
var PasswordMatchedIsReady = 0;
var allReady = 0;

$(document).ready(function () {
    //validate new password format and not null
    $('#new_password').blur(function () {
        if ($('#new_password').val() == null || $('#new_password').val() == "") {
            $("#new_password").notify("Required!");
            PasswordFormatIsReady = 0;
        }
        else if (!validatePass($('#new_password').val())) {
            $("#new_password").notify("At least 6 character with number(s) eg. snatch123");
            PasswordFormatIsReady = 0;
        }
        else {
            $("#new_password").notify("Available.", "success");
            PasswordFormatIsReady = 1;
        }
    });

    //validate new password and confirm new password is match and not null
    $('#new_confirm_password').blur(function () {
        if ($('#new_confirm_password').val() == null || $('#new_confirm_password').val() == "") {
            $("#new_confirm_password").notify("Required!");
            PasswordMatchedIsReady = 0;
        }
        else if ($('#new_confirm_password').val() != $('#new_password').val()) {
            $("#new_confirm_password").notify("Password is not matched.");
            PasswordMatchedIsReady = 0;
        }
        else {
            $("#new_confirm_password").notify("Password Matched.", "success");
            PasswordMatchedIsReady = 1;
        }
    });
});



function confirmchangepassword() {

    if ($("#current_password").val() != null && $("#current_password").val() != "") {
        allReady = PasswordFormatIsReady + PasswordMatchedIsReady;
        if (allReady == 2){
            jom.ajax({
                url: jom.apiUrl + "security/change-password",
                data: {
                    client_password: $("#new_password").val(),
                    client_token: localStorage.getItem("access_token"),
                    client_current_password: $("#current_password").val(),
                },
                success: function (result) {
                    window.location.href = "SuccessChangePassword.aspx";
                },
                fail: function (result) {
                    var incorrectMsg = document.createElement('i');
                    incorrectMsg.innerHTML = 'Current Password is incorrect.';
                    incorrectMsg.style.color = '#FF0000';
                    incorrectMsg.id = 'incorrectmsg';

                    $("#sectionappend").replaceWith(incorrectMsg);
                    $("#incorrectmsg").effect("shake");
                }
            });
        }
    }
    else {
        $("#current_password").notify("Required!");
    }

}