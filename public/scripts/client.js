/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// using jQuery to render stored tweets index page
$(document).ready(function() {
  console.log('Document is ready!');
  const $errorContainer = $('#error-container');

  // Function to display an error message
  const displayError = function(message) {
    $errorContainer.addClass('visible-element');
    $errorContainer.text(message).slideDown();
  };

  // Function to hide the error message
  const hideError = function() {
    $errorContainer.removeClass('visible-element');
    $errorContainer.slideUp();
    $errorContainer.text('');
  };

  // function to load tweets
  const loadtweets = function() {

    // Get tweets from  tweets url
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {

        // call function to render old tweet data into the index page
        renderTweets(data.reverse());
      },
      error: function(xhr, status, error) {

        // Handle errors if the request fails
        console.error('Error fetching data:', error);
      }
    });
  };

  // function to loop through the old tweet data and append to section with class "old-tweet"
  const renderTweets = function(tweets) {

    // clearing existing tweets container before appending new ones
    $(".old-tweet").empty();

    // loop through tweets
    for (let element of tweets) {

      // call function to create html structure for every element found in the passed object and append to tweet container
      const $tweet = createTweetElement(element);
      $(".old-tweet").append($tweet);
    }
  };

  // function to escape special characters in a string
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // function to create tweet element to use for page rendering
  const createTweetElement = function(tweetObject) {

    // Create a new div element to represent the tweet
    const $tweet = $("<article>").addClass("tweet");
    
    // Escape user-generated content before including it in the HTML
    const escapedText = escape(tweetObject.content.text);

    // Create the HTML structure for the tweet content
    const html = `
      <header class="old-tweet-header">
      <div class="header-container">
      <img class="avatar" src="${escape(tweetObject.user.avatars)}" alt="User Avatar">
      <h3 class="user-name">${escape(tweetObject.user.name)}</h2>
      <h4 class="user-handle">${escape(tweetObject.user.handle)}</h2>
      </div>
      </header>
      <p class="old-tweet-content">${escapedText}</p>
      <footer class="old-tweet-footer">
      <div id="time">
        <time class="time-ago">${timeago.format(tweetObject.created_at)}</time>
      </div>
      <div id="icon-butons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>`;

    // Set the HTML content of the tweet element and return value
    $tweet.html(html);
    return $tweet;
  };

  // load tweets
  loadtweets();

  // event listener for the form submission
  $(".tweet-line").submit(function(event) {

    // prevent default behavior of page refreshing after submit
    event.preventDefault();

    // Get the tweet text from the form
    const tweetText = $('#tweet-text').val();

    // validation for empty tweet
    if (!tweetText.trim()) {
      displayError('Error: Your Tweet cannot be empty!');
      return;
    }

    // validation for over tweet character limit
    if (tweetText.length > 140) {
      displayError('Error: Your Tweet exceeds the maximum 140 character limit!');
      return;
    }

    // If validation passes, hide the error message
    hideError();

    // Create a data object to send in the AJAX request
    const tweetData = { text: tweetText };

    // Send an AJAX POST request to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData,
      success: function() {

        // If the request is successful, clear form and reset counter
        $('#tweet-text').val('');
        $(".counter").text(140);
       // calculate remaining characters
      let remChars = 140;

        // call function to load tweets into the index page
        loadtweets();
      },
      error: function(error) {
        // Handle errors if the request fails
        console.error('Error submitting tweet:', error);
      }
    });
  });

  // event listener for body on scroll for styling changes on mobile devices
  document.addEventListener('scroll', function() {
    const body = document.body;
    if (body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  });
});
