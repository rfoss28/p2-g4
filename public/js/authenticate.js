$(function () {
    console.log(`here @ authenticate.js`);
    $('#logBtn').hide();
    //$("#proBtn").hide();

    //function to check if the check box has been clicked
    //if clicked is "true", then the button to enable log in will appear
    var approve_disclaimer = function () {
        if ($(".check").is(':checked')) {
            console.log('checked');
            $('#logBtn').fadeIn('slow');
        } else {
            console.log('unchecked');
            $('#logBtn').hide();
        }
    }
    
    //needs to be linked into the new form. 
    var sanatize_email = function (email) {
        //regex to make sure email input is properly inputed
        let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(String(email).toLowerCase());
    }

    var email_validate = function () {
        var $result = $("#result");
        var email = $("#signupUserName").val();
        $result.text("");

        if (sanatize_email(email)) {
            console.log('yes')
            $result.text(`${email}: is valid!`);
            $result.css("color", "green");
           // $("#proBtn").show();
        } else {
            console.log('nope')
            $result.text(`${email}: invalid email`);
            $result.css("color", "red");
        }
    }

    //function to send new user data into the database.
    var send_new_user_post = function () {
        $.post("/api/users", {
            user_email: $("#signupUsername").val(),
            user_password: $("#signupPassword").val()
        }).then(function (data) {
            console.log(data);
        });
    };


    //post to send information for existing user
    var login_existing_user = function() {
        $.post("/api/user/:id", {
            user_email: $("#username").val(),
            user_password: $("#password").val()
        }).then(function(data){
            console.log(data);
        });
    };

    var check_user = function(){
        if($("#newUser")){
            $("#proBtn").show();
        }
    }

    //on click events for the post requests
    $("#existingUsr").on("click", login_existing_user);

    //on click events for buttons 
    $('.check').on("click", approve_disclaimer);
    $("#newUser").bind("click", email_validate, send_new_user_post);

    M.AutoInit(); // initialize all Materialize elements that req. JS
});
