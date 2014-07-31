$(document).ready(function () {

    var handle = $('#handle');
    var body = $('#body');

    var url = 'https://twitter.com/intent/tweet?url=http://blaketarter.com/nationalgfday&text=.{{luckygal}}%20{{message}} via &hashtags=nationalgfday,';
    var luckygal = '';
    var message = '';
    var bare = '.  via http://blaketarter.com/nationalgfday #nationalgfday';
    var count = bare.length;
    var defaultcount = handle.val().length + body.val().length;
    var left = 140 - count - defaultcount;

    $('.scroll').click(function() {
        $('html, body').animate({
            scrollTop: $('.tweet').offset().top
        }, 1000);
    });

    $('#left').text(left);

    handle.keyup(function(e) {
        left = 140 - count - $(this).val().length - body.val().length;

        $('#left').text(left);
    });

    body.keyup(function(e) {
        left = 140 - count - $(this).val().length - handle.val().length;

        $('#left').text(left);
    });

    $('.submit').click(function() {

        if (!$(this).hasClass('reset')) {
            if (0 < left) {
                var _lucky = handle.val();
                var _message = body.val();
                var _tweetUrl = '';

                if (_lucky && 1 < _lucky.length) {
                    luckygal = _lucky;
                    handle.removeClass('error');
                } else {
                    return handle.addClass('error').animate({borderWidth: 10}).animate({borderWidth: 2}).animate({borderWidth: 10}).animate({borderWidth: 2});
                }

                if (_message) {
                    message = _message;
                    body.removeClass('error');
                } else {
                    return body.addClass('error').animate({borderWidth: 10}).animate({borderWidth: 2}).animate({borderWidth: 10}).animate({borderWidth: 2});
                }

                _tweetUrl = url.replace(/{{luckygal}}/, luckygal).replace(/{{message}}/, message);

                $('.message-output').text('.' + _lucky + ' ' + _message + ' via blaketarter.com/nationalgfday #nationalgfday');

                $('.output').fadeIn();

                $('.tweeter').attr('href', _tweetUrl);

                $(this).addClass('reset');
                $(this).text('Reset');
            } else {
                handle.addClass('error').animate({borderWidth: 10}).animate({borderWidth: 2}).animate({borderWidth: 10}).animate({borderWidth: 2});
                body.addClass('error').animate({borderWidth: 10}).animate({borderWidth: 2}).animate({borderWidth: 10}).animate({borderWidth: 2});
            }
        } else {
            $('#to').val('');
            $('#body').val('');
            $('#handle').val('@');

            $('.output').fadeOut();

            $(this).removeClass('reset');
            $(this).text('Make the Tweet');
        }
    });
});