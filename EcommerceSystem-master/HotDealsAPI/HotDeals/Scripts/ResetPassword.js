
//click to send token validate.
function resetpassword() {
    var getData = new QueryData();
    jom.ajax({
        url: jom.apiUrl + "security/reset-password",
        data: {
            client_token: getData.validate,
        },
        success: function (result) {
            window.location.href = "SuccessResetPassword.aspx";
        },
        fail: function (result) {
            alert("Password reset failed!");
            window.location.href = "MainMenu.aspx";
        }
    });


}

