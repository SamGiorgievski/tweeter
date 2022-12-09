$(document).ready(function() {

  // Protects against cross site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create tweet element as html
  const createTweetElement = function(tweetObject) {

    let tweetArticle = $(`
    <article class="tweet">
      
      <div class="tweet-header">
        <div class="tweet-name-icon">
          <img class="avatars" src=${tweetObject.user.avatars}>  
          <p>${tweetObject.user.name}</p>
        </div>
          <p>${tweetObject.user.handle}</p>
      </div>

      <div class="tweet-body">
        <p>${escape(tweetObject.content.text)}</p>
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
    `);

    return tweetArticle;
  };


  // Renders tweets and prepends to html container "posted-tweets"
  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      let tweetElement = createTweetElement(tweet);
      $('.posted-tweets').prepend(tweetElement);
    }

  };

  //  New Tweet POST request
  $('#tweet-form').on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    if (data.length > 145) {
      $(".error-container").slideDown();
      $(".error-container").html("Error: Tweet is too long");
    } else if (data.length === null) {
      $(".error-container").slideDown();
      $(".error-container").html("Error: Tweet evaluated as null. Please try again");
    } else if (data.length <= 5) {
      $(".error-container").slideDown();
      $(".error-container").html("Error: Cannot tweet 0 characters");
    } else {
      $.post('/tweets', data)
        .then(function() {
          $('.posted-tweets').html("");
          loadTweets();
          $(".error-container").slideUp();
          $("#tweet-text").val("");
          $(".counter").text("140");

        });
    }
  });

  // Load tweet GET request function
  function loadTweets() {

    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    });

  }

  // Display tweets when page loads
  loadTweets();

});
