$(document).ready(function () {
    //enter key press onclick search function
    $('#password').keypress(function (e) {
        if (e.which == 13) {
            $('#signinbtn').click();
            return false;
        }
    });
    $('#email').keypress(function (e) {
        if (e.which == 13) {
            $('#signinbtn').click();
            return false;
        }
    });
});

/*login function with email and password */
function signin() {
    jom.ajax({
        url: jom.apiUrl + "security/login",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        success: function (result) {
            var token = result.data.token;
            var fullname = result.data.full_name;
            var member_pk = result.data.member_id_fk;
            localStorage.setItem("full_name",fullname);
            localStorage.setItem("access_token", token);
            window.location.href = "MainMenu.aspx";
        },
        fail: function (result) {

            var incorrectMsg = document.createElement('i');
            incorrectMsg.innerHTML = 'Email or Password is incorrect.';
            incorrectMsg.style.color = '#FF0000';
            incorrectMsg.id = 'incorrectmsg';

            $("#sectionappend").replaceWith(incorrectMsg);
            $("#incorrectmsg").effect("shake");
        }
    });
}