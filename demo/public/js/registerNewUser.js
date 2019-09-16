// Register a  new member 

$("#registerForm").on("submit",(e) => {
    e.preventDefault();

    let data = {
        "username": $("#username").val(),
        "email": $("#email").val(),
        "password": $("#password").val()
    };

    $.post("http://localhost:3000/users/register",data, function () {
    })
    .done(function(res) {
// Return to team details. 
        window.location.href = "/users/login"
    })
    
    .fail(function ()
     {
// Server error 
       $("#errorTeam").html("Error: Team not added because of bad data")
    });

});