// Get references to page elements
$(function() {
  console.log("here @ index");
  var $exampleText = $("#example-text");
  var $exampleDescription = $("#example-description");
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/login",
        data: JSON.stringify(example)
      });
      console.log(data);
    },
    getExamples: function() {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function() {
    API.getExamples().then(function(data) {
      var $examples = data.map(function(example) {
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
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function() {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function() {
      refreshExamples();
    });
  };

  //function to allow for the addition of medications
  //sets count globally so each time the add button is clicked
  //it increments properly, I then append the input field into the form
  //its a working example at least, would like to refactor
  var count = 3;
  $addMedication = $("#addMed");
  var add_input = function() {
    // $name = $(`placeholder="${count}"`);
    if (count <= 5) {
      $input = $("<input>")
        .addClass("medField")
        .attr("id", `rx${count}`);

      $icon = $("<i>")
        .addClass("material-icons delete")
        .text("cancel");

      $("#medicForm").append($input, $icon);
      count++;
      console.log("count", count);
    } else {
      alert("You have added too many medications");
      $addMedication.hide(), $(".console.log('count', count)plus").hide();
    }
  };
  var $email = $("#username").val();
  var $passwrd = $("#password").val();
  var $existing = $("exUsr").val();
  console.log($existing);

  var existing_user = {
    email: $email,
    password: $passwrd
  };

  var form_data = $("#exUsr").serialize();

  var new_user = function() {
    console.log("here");
    $.post("/api/users", {
      user_info: existing_user
    }).then(function(data) {
      console.log("here");
      console.log(data);
    });
  };

  $("#existingUsr").on("click", new_user);

  $("#existingUsr").on("click", function() {
    console.log("here");
  });

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
  $addMedication.on("click", add_input);

  var rxCode = [];
  var rxList = [];

  $("#medicInput").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements

    // When a user clicks submit loop through 1-5 and if id

    for (i = 1; i < count; i++) {
      var inputId = `rx${i}`;

      if (
        $(`#rx${i}`)
          .val()
          .trim() !== ""
      ) {
        rxList.push(
          $(`#rx${i}`)
            .val()
            .trim()
        );
      }
    }

    console.log(rxList[0]);

    var queryArray = [];

    //retrieves codes from the api to use for the interaction search
    for (i = 0; i < rxList.length; i++) {
      var rxQuery =
        "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" + rxList[i];
      queryArray.push(rxQuery);
    }

    var codeArray = [];

    //this generates a promise
    function returnPromise(query) {
      return new Promise(function(resolve, reject) {
        $.ajax({
          method: "GET",
          dataType: "json",
          url: query,
          success: function(response) {
            resolve(response);
          },
          error: function(response) {
            reject(response);
          }
        });
      });
    }

    var promises = queryArray.map(elem => returnPromise(elem));

    //This will run once all async operations have successfully finished
    Promise.all(promises)

      // Promise.all([promises[0], promises[1], promises[2], promises[3]])

      .then(function(data) {
        // console.log("this is the data: " + data[0].idGroup.rxnormId[0]);

        data.forEach((elem, index) =>
          console.log(`this is the ${index} elem  ${elem.idGroup.rxnormId[0]}`)
        );

        //load codes into code array
        data.forEach((elem, index) =>
          codeArray.push(`${elem.idGroup.rxnormId[0]}`)
        );

        //everything successful, handle data here
        // data is array of results IN ORDER they were passed

        var queryURL =
          "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=";

        //creates query url fpr drug interactions

        for (j = 0; j < codeArray.length; j++) {
          console.log("Code Array" + codeArray.length);
          //just add the code for the first code
          if (j == 0) {
            queryURL += codeArray[j].toString();
          }
          // add  "+" before the remaining codes
          else {
            queryURL += "+" + codeArray[j];
          }
        }

        $.ajax({
          url: queryURL,
          method: "GET"
          // headers:{ 'Accept': 'text/plain'},
        })
          .then(function(response) {
            var interactions = "";
            var severity = "POTENTIONAL WARNING CONSULT YOUR PHYSCIAN";

            // loops through interaction type group to get the responses from both sources
            response.fullInteractionTypeGroup.forEach(function(j, index) {
              // loops through the interactions
              j.fullInteractionType.forEach(function(i) {
                var medNames = "Source of Interaction: ";

                if (index == 1) {
                  severity = i.interactionPair[0].severity;

                  //   interactions += i.interactionPair[0].description + " Severity: " + severity + "\r\n";
                }
                //Creates sting with the interaction source to add to the interaction string
                i.interactionPair[0].interactionConcept.map(function(rxNames) {
                 
                  medNames += rxNames.sourceConceptItem.name + " ";
                  // console.log(nameArray);
                });

                interactions +=
                  medNames +
                  "Interaction Description: " +
                  i.interactionPair[0].description +
                  " Severity: " +
                  severity.toUpperCase() +
                  "\r\n";

                // console.log(interactions);
                // console.log(severity);
              });
            });
            console.log(interactions);

            var printedMedList="";
            rxList.forEach(function(medication){
              printedMedList+= medication + "\r\n";
            // });


            $(".medbox")
            .empty()
            .append(printedMedList);
        })

            $(".reactions")
              .empty()
              .append(interactions);
          })
          .catch(error =>
            alert(
              "Please enter a valid medication name.  Fields cannot be left blank" +
                error
            )
          );
      })
      .catch(error =>
        alert(
          "Please enter a valid medication name.  Fields cannot be left blank" +
            error
        )
      );

    // console.log(codeArray);
    queryURL = "";
    rxQuery = "";
    rxList = [];
    promises = [];
    codeArray = [];
    interactions = "";
    // Clear the form when submitting
    $("#rx1").val("");
    $("#rx2").val("");
    $("#rx3").val("");
    $("#rx4").val("");
    $("#rx5").val("");
  });

  M.AutoInit();
});
