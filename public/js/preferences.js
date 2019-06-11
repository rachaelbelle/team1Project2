$(document).ready(function() {
  // Getting jQuery references for the user's personal info
  var firstNameInput = $("#firstName");
  var lastNameInput = $("#lastName");
  var userNameInput = $("#userName");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var zipCode = $("#zipCode");
  var weatherCb = $("#weatherCb").prop('checked');
  var newsCb = $("#newsCb").prop('checked');
  var trafficCb = $("#trafficCb").prop('checked');
  var quotesCb = $("#quotesCb").prop('checked');
  // eslint-disable-next-line no-unused-vars
//   var cmsForm = $("#cms");
  // Adding an event listener for when the form is submitted
  $("#cmsForm").on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(cmsForm);
    // Wont submit the post if we are missing core user info
    if (
      !firstNameInput.val().trim() ||
      !lastNameInput.val().trim() ||
      !userNameInput.val() ||
      !emailInput.val() ||
      !passwordInput.val() ||
      !zipCode.val().trim()
    ) {
      return;
    }
    // Constructing a newUser object to hand to the database
    var newUser = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      zipCode: zipCode.val().trim(),
      weather: weatherCb,
      news: newsCb,
      traffic: trafficCb,
      quotes: quotesCb
    };
    console.log(newUser);

    submitUser(newUser);
  }

  // include function to ensure that trhe data was succesfully posted prior to redirecting the user
  // function to check user session (active or no?)
  // maybe yianni's oAuth stuff will settle this?

  function submitUser(newData) {
    $.post("/api/users", newData, function() {
      debugger;
      window.location.href = "/userProfile";
    });
  }
});
