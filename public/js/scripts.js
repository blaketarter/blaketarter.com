$(document).ready(function() {
    function center_top() {
        var $window = $(window);
        var $window_height = $window.height();
        var $top = $('.top');
        var $top_height = $top.height();

        return (($window_height - $top_height) / 2);
    }

    function sticky_relocate() {
        var window_top = $(window).scrollTop();
        var div_top = $('#sticky-anchor').offset().top;
        if (window_top > div_top) {
            var add = $('.name').addClass('sticky');
        }
        else {
            var remove = $('.name').removeClass('sticky');
        }
    }

    var s = skrollr.init({
        render: function(data) {
            sticky_relocate();
        }
    });

    s.refresh();

    $(window).scroll(sticky_relocate);

    $('.top').css({
        marginTop: center_top()
    });

    $('.scroll').click(function() {
        $('html, body').animate({
            scrollTop: $('.content').offset().top
        }, 1000);
    });

    $('.nav-toggle').click(function() {
        $(this).toggleClass('out');
    });

    sticky_relocate();
});