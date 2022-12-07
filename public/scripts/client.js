/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObject) {

  let tweetArticle = `
    <article class="tweet">
      
      <div class="tweet-header">
        <div class="tweet-name-icon">
          <img src=${tweetObject.user.avatars}>  
          <p>${tweetObject.user.name}</p>
        </div>
          <p>${tweetObject.user.handle}</p>
      </div>

      <div class="tweet-body">
        <p>${tweetObject.content.text}</p>
      </div>

      <div class="tweet-footer">
      
            <p>${timeago.format(tweetObject.created_at)}</p>

        <div class ="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
      </div>
      </div>
    </article>
    `;

  return tweetArticle;
};



const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $('.new-tweet').append(tweetElement);
  }

  return;
};


$(document).ready(function() {

//  New Tweet POST request
  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();

    $.post('/tweets', data)
      .then(() => {
        console.log("success");

      });
  });

// Load tweet GET request function
  function loadTweets () {
    
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    }) 
   
  }

  loadTweets();

});
