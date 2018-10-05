$(function () {
    console.log(`here @ authenticate.js`);
    $('#logBtn').hide();

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


    var sanatize_email = function (email) {
        //regex to make sure email input is properly inputed
        let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(String(email).toLowerCase());
    }

    var email_validate = function () {
        var $result = $("#result");
        var email = $("#email").val();
        $result.text("");

        if (sanatize_email(email)) {
            console.log('yes')
            $result.text(`${email}: is valid!`);
            $result.css("color", "green");
        } else {
            console.log('nope')
            $result.text(`${email}: invalid email`);
            $result.css("color", "red");
        }
    }

    // var get_usr_info = function (event) {
    //     var $email = $("#email").val();
    //     var $password = $("passwd").val();
    //     console.log('email', $email, 'passwd', $password);
    //     $signIn = $("#signIn").val();

    //     var userInfo = [];

    //     userInfo.push($email, $password);
    //     console.log(userInfo);
    // }
    // get_usr_info();
    // //listener events
    // var get_usr_info = function () {
    //     var $email = $("#Email").val();
    //     console.log('email', $email);
    // }
    // get_usr_info();

    // $("#newUser").on("submit", function(){
    //     console.log("here");
    //     let firstName = $("#fname").val();
    //     let $lastName = $("#lname").val();
    //     let $email = $("#email").val();
    //     console.log(firstName, $lastName, $email);
    // })
    var firstName = $("input#fName").val();
    var lastName  = $("input#lName").val();

    // var new_user = function() {
    //     $.post("/api/login", {
    //         firstname: firstName,
    //         lastName: lastName,

    //     }).then(function(data){
    //         console.log(data);
    //     })
    // }

    // $("#newUser").on("click", new_user);
    

    $('.check').on("click", approve_disclaimer);
    $("#validate").bind("click", email_validate);

    M.AutoInit(); // initialize all Materialize elements that req. JS
});
