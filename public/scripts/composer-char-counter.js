/* Jquery to handel computing character counter for tweet composition*/

$(document).ready(function() {
  console.log('Document is ready!');
  // Register an event handler for the textarea
  $('.new-tweet textarea').on('input', function() {

    // capture characters entered on the text area
    let currTweet = $(this).val();

    // calculate remaining characters
    let remChars = 140 - currTweet.length;

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