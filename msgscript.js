$(document).ready(function(){
  var $tweetFrame = $('#tweetFrame');
  $tweetFrame.html('');

  //Function to add tweets
  var postTweet = function(tweetNumber) {
    var tweet = streams.home[tweetNumber];
    var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetFrame);
  };

  //Populate list of followed tweeters

  //Generates original list of tweets
  var index = streams.home.length - 1;
  while(index >= 0){
    postTweet(index);
    index -= 1;
  }

  //Click handlers for buttons
  //Mouse Hover handlers for buttons
  //Add more tweets handler (constant update prefered)
});

