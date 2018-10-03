$(function () {
    console.log(`here`);
    $('#logBtn').hide();

   //function to check if the check box has been clicked
   //if clicked is "true", then the button to enable log in will appear
    var approve_disclaimer = function() {
        if ($(".check").is(':checked')) {
            console.log('checked');
            $('#logBtn').fadeIn('slow');
        } else {
            console.log('unchecked');
            $('#logBtn').hide();
        }
    }

    $('.check').on("click", approve_disclaimer);
    
    M.AutoInit();
});
