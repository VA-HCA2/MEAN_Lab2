// Register a  new member 

$("#registerBtn").on("submit", function(e) {
    e.preventDefault();
    alert();

    $.post("/register", $("#registerForm").serialize(), function (data) {
    })
    .done(function(res) {
        data = JSON.parse(data);
// Return to team details. 
        location.href = "/login"
    })
    
    .fail(function (xhr, status, error) {
// Server error 
       $("#errorTeam").html("Error: Team not added because of bad data")
    });
    return false;
});