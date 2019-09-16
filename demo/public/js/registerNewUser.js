// Register a  new member 

$("#registerForm").on("submit", (e) => {
    e.preventDefault();

    let data = {
        "username": $("#username").val(),
        "email": $("#email").val(),
        "password": $("#password").val()
    };

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

$("#resetBtn").click(function() {
    $('#msg').hide();
});
