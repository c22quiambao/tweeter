$(document).ready(function () {
  console.log('Document is ready!');
});



$(document).ready(function() {
  // Register an event handler for the textarea
  $('.new-tweet textarea').on('input', function() {

    // capture characters entered on the text area
    let currTweet = $(this).val();
    console.log("New Tweet ---> ",currTweet);

    // calculate remaining characters
    let remChars = 140 - currTweet.length;
    console.log("character remaining --->>", remChars);

    // Select the counter element
    let $counter = $(this).closest('.new-tweet').find('.counter');
    $counter.text(remChars);

    // handle css styling for when max limit of characters is reached
    if (remChars < 0) {
      $counter.addClass('limit-exceeded');
    } else {
      $counter.removeClass('limit-exceeded');
    }

  });
});