// Get references to page elements
$(function () {
  console.log("S N double O P, D O double G");

  //function to allow for the addition of medications
  //sets count globally so each time the add button is clicked
  //it increments properly, I then append the input field into the form
  //its a working example at least, would like to refactor
  var count = 3;
  $addMedication = $("#addMed");
  var add_input = function () {
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
  $addMedication.on("click", add_input);

  // Add event listeners to the submit and delete buttons
  $("#medicInput").on("click", function (event) {
    var rxList = [];

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
        rxList.push($(`#rx${i}`).val().trim());
      }
    }

    // appends medications to the medbox
    // $(".medbox").empty();

    for (i = 0; i < rxList.length; i++) {
      $(".medbox").append(`<button>${rxList[i]} \r\n\n </button>`)
        .addClass("medBtn")
    }

    //attempt to send medication of user
    if (sessionStorage.getItem('status')) {
      $.ajax({
        url: "/api/update_meds/:name",
        type: "PUT",
        data: JSON.stringify({
          user_med1: rxList[0],
          user_med2: rxList[1],
          user_med3: rxList[2],
          user_med4: rxList[3],
          user_med5: rxList[4]
        })
      }).done(element => {
        console.log(element)
      })
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
      return new Promise(function (resolve, reject) {
        $.ajax({
          method: "GET",
          dataType: "json",
          url: query,
          success: function (response) {
            resolve(response);
          },
          error: function (response) {
            reject(response);
          }
        });
      });
    }

    var promises = queryArray.map(elem => returnPromise(elem));

    //This will run once all async operations have successfully finished
    Promise.all(promises)

      // Promise.all([promises[0], promises[1], promises[2], promises[3]])

      .then(function (data) {
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
          .then(function (response) {
            var interactions = "";
            var severity = "POTENTIONAL INTERACTION, PLEASE CONSULT YOUR PHYSCIAN";

            // loops through interaction type group to get the responses from both sources
            response.fullInteractionTypeGroup.forEach(function (j, index) {
              // loops through the interactions
              j.fullInteractionType.forEach(function (i) {

                var medName = "";
                var medUrl = ""
                var medLink = "Source of Interaction: "


                if (index == 1) {
                  severity = i.interactionPair[0].severity;

                  //   interactions += i.interactionPair[0].description + " Severity: " + severity + "\r\n";
                }
                //Creates string with the interaction source to add to the interaction string
                var nameInfo = i.interactionPair[0].interactionConcept.map(function (rxNames) {

                  medUrl = rxNames.sourceConceptItem.url;
                  medName = rxNames.sourceConceptItem.name;

                  medLink += `<a href="${medUrl}" target="_blank"> ${medName} </a>`;
                  console.log(medLink);

                  // medNames += rxNames.sourceConceptItem.name + " ";
                  console.log(rxNames);
                });


                interactions += "<p>" +
                  medLink +
                  "Interaction Description: " +
                  i.interactionPair[0].description +
                  " Severity: " +
                  severity.toUpperCase() +
                  "\r\n" + "</p><br>";


              });
            });


            $(".reactions")
              // .empty()
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
    promises = [];
    codeArray = [];
    interactions = "";
    // Clear the form when submitting
    $("#rx1").val("");
    $("#rx2").val("");
    $("#rx3").val("");
    $("#rx4").val("");
    $("#rx5").val("");

    $("button").on("click", function () {
      console.log('deadline arriving')
      $(this).remove();
    })


  });

  M.AutoInit();
});