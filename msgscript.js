$(document).ready(function(){
  var $tweetFrame = $('#tweetFrame');
  $tweetFrame.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetFrame);
    index -= 1;
  }
});