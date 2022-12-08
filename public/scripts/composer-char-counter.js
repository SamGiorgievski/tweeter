$(document).ready(function() {
  console.log("ready");

  $("#tweet-text").on("input", function() {
    const output = $(this).parent().find(".counter");
    let counter = $(this).val().length;
    let characterRemaining = 140 - counter;

    output.text(characterRemaining);

    if ( counter >= 140) {
      output.css('color', 'red');
    } else {
      output.css('color', 'black');
    }
  });

});

