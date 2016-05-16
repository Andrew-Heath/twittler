var tweetIndex = 0;
var usersIndex = 0;
var currentFilter = '';
var visitor = '';

$(document).ready(function(){
  //Set neccessary variables
  var $tweetFrame = $('#tweetFrame');
  var $followsFrame1 = $('#followsFrame1');
  var $followsFrame2 = $('#followsFrame2');
  //Clear tweetFrame and followsFrame just in case
  $tweetFrame.html('');
  $followsFrame1.html('');
  $followsFrame2.html('');

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
  var postTweet = function(tweetNumber, visual) {
    var tweet = streams.home[tweetNumber];
    var $tweet = $('<div class="tweet tile ' + tweet.user + '"></div>');
    var $timestamp = $('<div class="timestamp">Posted at: ' + orgTS(tweet.created_at) + '</div>')
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $timestamp.appendTo($tweet);
    $tweet.prependTo($tweetFrame);

    //first check if visuals are wanted
    if(visual){
      //hide tweet for filter purposes
      $tweet.hide();
      if(currentFilter === '' || tweet.user === currentFilter){
        //if no filter is set or user matches filter, show it
        $tweet.slideDown('slow');
      }
    } else {
      //hide tweet for filter purposes
      $tweet.hide();
      if(currentFilter === '' || tweet.user === currentFilter){
        //if no filter is set or user matches filter, show it
        $tweet.show();
      }
    }
  };

  var postUser = function(visual) {
    //access list of tweeters & create shortcut
    var $folName = $('<div class="user tile" data-name=""></div>');
    //add a Class of the user name for filter purposes
    $folName.addClass(users[usersIndex]);
    //set the name properly
    $folName.text('@' + users[usersIndex]);
    //add data property for filter purpose
    $folName.data('name', users[usersIndex]);
    //add them to page
    if((usersIndex % 2) === 0) {
      //splits the followers into two columns
      $folName.appendTo($followsFrame1);
    } else {
      $folName.appendTo($followsFrame2);
    }
    //decide if to show automatically or use slide effect
    if(visual) {
      $folName.hide();
      $folName.slideDown();
    }
  };

  //Function to update multiple tweets
  var updateTweets = function(visual) {
    while(tweetIndex < streams.home.length) {
      postTweet(tweetIndex, visual);
      tweetIndex++;
    }
  };

  //Populate list of followed tweeters
  var updateUsers = function(visual) {
    while(usersIndex < users.length) {
      postUser(visual);
      usersIndex++;
    }
  };

  //Wrapper to handle both updates
  var updatePage = function(visual) {
    updateTweets(visual);
    updateUsers(visual);
  };

  //Generates original list of tweets, does not slide
  updatePage(false);

  //Constantly update tweets every half second, with slide
  setInterval(updatePage, 1000, true);

  //Click handlers for buttons
  $('.user').on('click', function() {
    //Click button
    if(currentFilter !== $(this).data('name')) {
      //checks to see if filter is currently set to the selected user
      //Slide Up all tweets
      $('.tweet').slideUp('fast');
      //Slide Down all tweets belonging to selected user
      for(var i = 0; i < users.length; i++) {
        if($(this).data('name') === users[i]) {
          $('#tweetFrame').find('.' + users[i]).slideDown('slow');
        }
      }
      //Sets currentFilter so filter can't repeat
      currentFilter = $(this).data('name');
    } else {
      $('.tweet').slideDown('fast');
      currentFilter = '';
    }
  });

  //Click handler for opening Write own Post
  $(document).on('click', '.closed', function() {
    //Toggle whether text boxes are shown or not
    $('.post-group').slideDown('slow');
    //clear tweet box
    $('.post-group').find('.new-tweet').val('');
    //remove closed class to keep it from reopening on other clicks
    $(this).removeClass('closed');
  });

  //Click handler for Clear button
  $('.clear-frame').on('click', function() {
    //Clear visitor, username, and text area
    visitor = '';
    $('.vis-name').val('');
    $('.new-tweet').val('');
  });

  //Click Handler for Close button
  $('.close-frame').on('click', function() {
    //slideUp the form
    $('.post-group').slideUp('slow', function(){
      //readd closed class to make frame function again
      //makes sure to wait till the animation ends so it doesn't reopen
      $('.post-frame').addClass('closed');
    });
  });

  //Click handler for Post button
  $('.post-tweet').on('click', function() {
    event.preventDefault();
    if($('.new-tweet').val() !== '') {
      //save message
      visitor = $('.vis-name').val();
      var newTweet = $('.new-tweet').val();
      //use data_generator function to post tweet
      writeTweet(newTweet);
      //slideUp the form
      $('.post-group').slideUp('slow', function(){
        //readd closed class to make frame function again
        //makes sure to wait till the animation ends so it doesn't reopen
        $('.post-frame').addClass('closed');
      });
    }
  });
});