$(document).ready(function() {

  // Click on the compose textarea
  $('.tweet-compose').on('focus', function() {
    $(this).animate({height:"5em"});
    $('#tweet-controls').show();
  });

  // When the compose textarea loses focus
  // $('.tweet-compose').on('blur', function() {
  //   if ($(this).val) {
  //     $(this).animate({height:"2.5em"});
  //     $('#tweet-controls').hide();
  //   }
  // });

  // Update the tweet length message
  $('.tweet-compose').on('keydown', function() {
    var MAXCHARS = 140;
    var tweetLength = $(this).val().length + 1;
    var charsLeft = MAXCHARS - tweetLength;
    $('#char-count').html(charsLeft);

    // Change the count appearance if needed
    if (charsLeft <= 10) {
      $('#char-count').addClass('warning');
    } else {
      $('#char-count').removeClass('warning');
    }

    // Disable the tweet button if needed
    if (charsLeft <= 0) {
      $('#tweet-submit').prop('disabled', true);
    } else {
      $('#tweet-submit').prop('disabled', false);
    }
  });


  $('#tweet-submit').on('click', function() {
    // copy the first tweet in the stream ... change a few values and insert it up at the top
    var tweet = $('.tweet:first').clone(true);
    tweet.find('img.avatar').prop('src', 'img/alagoon.jpg');
    tweet.find('img.avatar').prop('title', 'Johnny Doe');
    tweet.find('.fullname').html('Johnny Doe');
    tweet.find('.username').html('@johnnydoe');
    tweet.find('.tweet-text').html($('.tweet-compose').val());
    tweet.find('.time').html(Date.now());
    tweet.find('.tweet-compose').prop('placeholder', 'Reply to @johnnydoe');
    $('#stream').prepend(tweet);
  });

  $('.tweet').on('click', function() {
    var tweets = $('.tweet');
    var activeIndex = $(this).index();

    $.each(tweets, function(index, value) {
      var tweetOptions = $(this).find('.stats, .reply');
      if (index === activeIndex) {
        tweetOptions.slideToggle();
      } else {
        tweetOptions.slideUp();
      }
    });
  });

  // Bootstrap Tooltips
  $('[data-toggle="tooltip"]').tooltip({placement: 'top'});

  // Initializing the timeago plugin
  $('.time').timeago();

});