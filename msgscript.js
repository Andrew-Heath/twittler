$(document).ready(function(){
  var $tweetFrame = $('#tweetFrame');
  $tweetFrame.html('');

  //Function to add tweets
  var postTweet = function(tweetNumber) {
    var tweet = streams.home[tweetNumber];
    var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
    var $timestamp = $('<div class="timestamp">Posted at: ' + tweet.created_at + '"</div>')
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $timestamp.appendTo($tweet);
    $tweet.prependTo($tweetFrame);
  };

  //Populate list of followed tweeters

  //Generates original list of tweets
  var index = 0; //streams.home.length - 1;
  /* while(index >= 0){
    postTweet(index);
    index -= 1;
  }*/
  while(index < streams.home.length) {
    postTweet(index);
    index++;
  }

  setInterval(function() {
    while(index < streams.home.length) {
    postTweet(index);
    index++;
    }
    /*if(streams.home.length > index) {
      postTweet(index);
      index++;
    }*/
  }, 3000);

  //Attempt at auto update

  //Click handlers for buttons
  //Mouse Hover handlers for buttons
  //Add more tweets handler (constant update prefered)
});

