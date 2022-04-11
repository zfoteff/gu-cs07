$(document).ready(async() => {
    console.log("Authorized user login window loaded successfully");

    $('#back').on('click', async() => {
        /**
         * Back button callback for redirecting to index page 
         */

        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    });

    $("#login").on('click', async() => {
        /**
         * Login button callback for authenticating the password
         */

        var user = $("#username").val();
        var pass = $("#password").val();
        var requestOptions = {
            method: "POST",
            body: JSON.stringify({ username: user, password: pass })
        };
        await fetch("/login/", requestOptions)
            .then(response => response.json())
            .then(json => {
                //  Display error message if one exists
                console.log(json);
            });
    })
})