// HOMER CODE:
$(document).ready(function() {
  var numberOfSteps = $(".user-guide p").length,
    width = parseInt($(".user-guide p").css("width")),
    maxWidth = (numberOfSteps - 1) * width,
    stepID = 0;

  $("ul li[data-num='1']").addClass("active");
  $(".step span").html("");

  $("body").on("click", ".user-guide__next", function() {
    var marginLeft = parseInt($(".slider-turn").css("margin-left")),
      mod = marginLeft % width;

    if (-marginLeft < maxWidth && mod === 0) {
      marginLeft -= width;

      $(".slider-turn").animate(
        {
          "margin-left": marginLeft
        },
        300
      );
      $("ul li.active").addClass("true").removeClass("active");

      $('ul li[data-num="' + ++stepID + '"]').addClass("active");
      $(".step span").html("Step " + stepID);
    }
  });

  $("body").on("click", ".user-guide__close", function() {
    $(".user-guide").animate(
      {
        opacity: 0
      },
      600
    );
    $(".user-guide").animate(
      {
        top: -1200
      },
      {
        duration: 2300,
        queue: false
      }
    );
    $(".user-guide__open").animate({
      top: "50%"
    });
  });

  $("body").on("click", ".user-guide__open", function() {
    (numberOfSteps = $(".user-guide p")
      .length), (width = parseInt($(".user-guide p").css("width"))), (maxWidth = (numberOfSteps - 1) * width);
    stepID = 0;

    $("ul li.active").removeClass("true").removeClass("active");
    $("ul li[data-num='1']").addClass("active");
    $(".step span").html("Step 1");

    $(".user-guide__open").animate({
      top: -1000
    });

    $(".user-guide").animate(
      {
        opacity: 1
      },
      400
    );

    $(".user-guide").animate(
      {
        top: "50%"
      },
      {
        duration: 800,
        queue: false
      }
    );
  });
});

//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//Hide hints
$("form span").hide();

function isPasswordValid() {
  return $password.val().length > 8;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  return isPasswordValid() && arePasswordsMatching();
}

function passwordEvent(){
    //Find out if password is valid  
    if(isPasswordValid()) {
      //Hide hint if valid
      $password.next().hide();
    } else {
      //else show hint
      $password.next().show();
    }
}

//FORM CODE

function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if(arePasswordsMatching()) {
    //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //else show hint 
    $confirmPassword.next().show();
  }
}

function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();