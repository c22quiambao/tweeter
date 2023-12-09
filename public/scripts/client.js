/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// using jQuery to render stored tweets index page
$(document).ready(function() {
  console.log('Document is ready!');

  // create object that holds old tweet data
  const data = [
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
  ];

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

  // call function to render old tweet data into the index page
  renderTweets(data);
});
