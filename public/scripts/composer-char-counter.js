$(document).ready(function() {
  console.log("ready");

  $("#tweet-text").keypress(function() {
    $(this).next().children("output")[0].innerHTML = 139 - this.value.length;

    if ($(this).next().children("output")[0].innerHTML < 0) {
      $(this).next().children("output").css('color', 'red');
    }
  });

});

