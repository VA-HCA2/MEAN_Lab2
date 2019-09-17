// Onload function
"use strict";
$(function () {
    // Hide error 
    $("#error").hide();
    $("#register").hide();
    // Register a  new member 
    $("#registerForm").on("submit", (e) => {
        e.preventDefault();

        let data = {
            "username": $("#username").val(),
            "email": $("#email").val(),
            "password": $("#password").val()
        };

        // Call validate function 
        let isvalidate = validateForm();

        if (isvalidate == false) {
            $("#error").show();
            return;
        }
        $.post("http://localhost:3000/users/register", data, function () {
        })
            .done(function (res) {
                // Return to team details. 
                window.location.href = "/users/login"
            })

            .fail(function (e) {

                if (e.status === 403) {
                    $('#msg').html('User already exists. Please try another another one. ');
                } else {
                    $('#msg').html(`Error: ${e.status}`);
                }

                $('#msg').removeClass('alert-success');
                $('#msg').addClass('alert-danger');
                $('#username').focus();
            });
        $('#msg').show();
    });

    $("#resetBtn").click(function () {
        $('#msg').hide();
        $("#error").hide();
    });
});
function validateForm() {
    let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    let errMsg = [];
    if (!pattern.test($("#email").val().trim())) {
        errMsg[errMsg.length] = ("Please enter a valid Email-Address");
    }

    for (let i = 0; i < errMsg.length; i++) {
        $("<li>" + errMsg[i] + "</li>").appendTo("#error");
    }

    if (errMsg.length > 0) {
        return false
    }
    return true;
}