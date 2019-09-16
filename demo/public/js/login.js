
$(document).ready(function ()
{
    //login fuction
    $('#loginForm').on('submit', (e) =>
    {
        e.preventDefault();

        let data = {
            "username": $('#username').val(),
            "password": $('#password').val()
        };

        $.post("http://localhost:3000/users/login", data, function ()
        {
        })
            .done(function (res)
            {
                $('#msg').removeClass('alert-danger');
                window.location.href = "/leagues";
            
            })
            .fail(function (e)
            {
                    if (e.status === 403) {
                    $('#msg').html('Invalid Creds!');
                  } else {
                    $('#msg').html(`Error: ${e.status}`);
                  }
          
                  $('#msg').removeClass('alert-success');
                  $('#msg').addClass('alert-danger');  
                  $('#username').focus();
            });
            $('#msg').show();
    });
});

$("#resetBtn").click(function() {
    $('#msg').hide();
});
