$(document).ready(function() {
  console.log("ready");

  $("article i").hover(function() {
    $(this).css("color", "yellow");
  },function() {
    $(this).css("color", "#545149");
  })

});
