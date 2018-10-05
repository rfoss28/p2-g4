// Get references to page elements
$(function() {
  console.log('here @ index')
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
}

  //function to allow for the addition of medications
  //sets count globally so each time the add button is clicked
  //it increments properly, I then append the input field into the form
  //its a working example at least, would like to refactor
  var count = 2;
  $addMedication = $("#addMed");
  var add_input = function () {
    // $name = $(`placeholder="${count}"`);
    if (count <= 5) {
      $input = $("<input>");
      $icon = $("<i>")
        .addClass("material-icons delete")
        .text('cancel');

      $("#medicForm").append($input, $icon);
      console.log('count', count)
    } else {

      alert("You have added to many medications");
      $addMedication.hide(), $(".plus").hide();
    }
    count++
  };

  //grab data from submit form
  // var get_usr_info = function () {
  //   var $email = $("#email").val();
  //   console.log('email', $email);
  // }
  //get_usr_info();

  var count = 2;
  $addMedication = $("#addMed");
  var add_medication = function () {
    // $name = $(`placeholder="${count}"`);
    if (count <= 5) {
      $input = $("<input>");
      $("#medicForm").append($input, $name);
      console.log('count', count)
    } else {
      alert("You have added to many medications");
    }
    count++
  };

  var firstName = $("input#fName").val();
  var lastName  = $("input#lName").val();

  var new_user = function() {
    console.log(
      'here'
    );
      $.post("/signup", {
          firstname: firstName,
          lastName: lastName,

      }).then(function(data){
          console.log('here')
          console.log(data);
      })
  }

  $("#newUser").on("click", new_user);

  $("#existingUsr").on("click", function(){
    console.log("here");
  })

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
  $addMedication.on("click", add_input);


  M.AutoInit();
});
