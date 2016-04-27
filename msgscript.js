$(document).ready(function(){
  //Set neccessary variables
  var $tweetFrame = $('#tweetFrame');
  var $followsFrame = $('#followsFrame');
  var tweetIndex = 0;
  //Clear tweetFrame and followsFrame just in case
  $tweetFrame.html('');
  $followsFrame.html('');

  //Function to create an organized timestamp, takes a Date obj and returns a string
  var orgTS = function(timestamp) {
    //Get the Hours and Minutes from the Date obj passed in
    var hr = timestamp.getHours();
    var min = timestamp.getMinutes();
    var ampm = '';

    //fix hour to 12 hour format
    if(hr === 0) {
      //if 0, change to '12' and set ampm to 'AM'
      hr = '12';
      ampm = 'AM';
    } else if (hr >= 1 && hr <= 11) {
      //if 1-11, stringify and set ampmp to 'AM'
      hr = '' + hr;
      ampm = 'AM';
    } else if(hr === 12) {
      //if 12, stringify and set ampm to 'PM'
      hr = '' + hr;
      ampm = 'PM';
    } else if (hr >= 13 && hr <= 23) {
      //if 13-23, subtract 12, stringify, and set ampm to 'PM'
      hr = '' + (hr - 12);
      ampm = 'PM';
    }

    //fix min to double-digit format
    if(min < 10) {
      //if single digit, stringify with leading 0
      min = '0' + min;
    }

    return hr + ':' + min + ' ' + ampm + ' on ' + timestamp.toLocaleDateString();
  };

  //Function to add tweets to the page
  var postTweet = function(tweetNumber) {
    var tweet = streams.home[tweetNumber];
    var $tweet = $('<div class="tweet ' + tweet.user + '"></div>');
    var $timestamp = $('<div class="timestamp">Posted at: ' + orgTS(tweet.created_at) + '</div>')
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $timestamp.appendTo($tweet);
    $tweet.prependTo($tweetFrame);
  };

  //Function to update multiple tweets
  var updateTweets = function() {
    while(tweetIndex < streams.home.length) {
      postTweet(tweetIndex);
      tweetIndex++;
    }
  };

  //Populate list of followed tweeters
  
  for(var i = 0; i < users.length; i++) {
    var $folName = $('<div class="user button"></div>');
    $folName.addClass(users[i]);
    $folName.text(users[i]);
    $folName.appendTo($followsFrame);
  }
  //access list of tweeters
  //create jQuery shortcut
  //loop through list of follows and generate list

  //Generates original list of tweets
  updateTweets();

  //Constantly update tweets every 5 seconds
  setInterval(updateTweets, 5000);

  //Click handlers for buttons
  //Mouse Hover handlers for buttons
  //Add more tweets handler (constant update prefered)
});

