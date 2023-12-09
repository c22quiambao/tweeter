/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// using jQuery to render stored tweets index page
$(document).ready(function() {
  console.log('Document is ready!');

  // create object that holds old tweet data
  /*const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];*/

  // function to load tweets
  const loadtweets = function() {
    // Get tweets from  tweets url
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
       // processReceivedData(data);
        console.log("!!!!")
        console.log('Data received:', data);
        // call function to render old tweet data into the index page
        console.log("calling function renderTweets");
        renderTweets(data);
      },
      error: function(xhr, status, error) {
        // Handle errors if the request fails
        console.error('Error fetching data:', error);
      }
    });
  };

  // function to loop through the old tweet data and append to section with class "old-tweet"
  const renderTweets = function(tweets) {
    for (let element of tweets) {
      // call function to create html structure for every element found in the passed object
      const $tweet = createTweetElement(element);
      $(".old-tweet").append($tweet);
    }
  };

  // function to create tweet element to use for page rendering
  const createTweetElement = function(tweetObject) {

    // Create a new div element to represent the tweet
    const $tweet = $("<article>").addClass("tweet");

    // Create the HTML structure for the tweet content
    const html = `
      <header>
      <div>
      <img src="${tweetObject.user.avatars}" alt="User Avatar">
      <h2>${tweetObject.user.name}</h2>
      </div>
      <div>${tweetObject.user.handle}</div>
      </header>
      <p class="tweet-content">${tweetObject.content.text}</p>
      <footer>
      <div>
        <time datetime="2023-04-01">${tweetObject.created_at}</time>
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>`;

    // Set the HTML content of the tweet element
    $tweet.html(html);
    return $tweet;
  };



  // load tweets
  console.log("calling function loadtweets");
  loadtweets();

  // event listener for the form submission
  $(".tweet-line").submit(function(event) {
    // prevent default behavior of page refreshing after submit
    event.preventDefault();

    // extract form data and serialize it
    const formData = $(this).serialize();

    // Get the tweet text from the form
    const tweetText = $('#tweet-text').val();

    // Create a data object to send in the AJAX request
    const tweetData = { text: tweetText };

    // Send an AJAX POST request to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData,
      success: function() {
        // If the request is successful, clear form
        $('#tweet-text').val('');
        console.log("success ajax call");
        // Fetch and render the updated tweets
        console.log("****")
        // call function to render old tweet data into the index page
        console.log("calling function loadtweets again");
        loadtweets();
      },
      error: function(error) {
        // Handle errors if the request fails
        console.error('Error submitting tweet:', error);
      }
    });
  })
});
