/*login function with email and password */
function adminlogin() {
    jom.ajax({
        url: jom.apiUrl + "security/admin-login",
        data: {
            username: $("#username").val(),
            password: $("#password").val()
        },
        success: function (result) {
            var token = result.data.token;
            var username = result.data.username;
            localStorage.setItem("username", username);
            localStorage.setItem("admin_access_token", token);
            window.location.href = "AdminMainPage.aspx";
        },
        fail: function (result) {

            var incorrectMsg = document.createElement('i');
            incorrectMsg.innerHTML = 'Username or Password is incorrect.';
            incorrectMsg.style.color = '#FF0000';
            incorrectMsg.id = 'incorrectmsg';

            $("#sectionappend").replaceWith(incorrectMsg);
            $("#incorrectmsg").effect("shake");
        }
    });
}