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
            $('.name').addClass('sticky');
            $('.top').addClass('stuck');
        }
        else {
            $('.name').removeClass('sticky');
            $('.top').removeClass('stuck');
        }
    }
//
//    var s = skrollr.init({
//        render: function(data) {
//            sticky_relocate();
//        }
//    });

    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        var s = skrollr.init({
            forceHeight: false,
            render: function(data) {
                sticky_relocate();
            }
        });

        s.refresh();
    }

    var is_mobile = 0;


    if ($('html').hasClass('skrollr-mobile')) {
        is_mobile = 1;
    }

    $('.lazy').show().lazyload({
        effect: 'fadeIn'
    });

    $(window).scroll(sticky_relocate);

    $('.top').css({
        marginTop: center_top()
    }).fadeIn('500');

    $('.scroll').click(function() {
        var to = $(this).data('to') || '';

        var offset = 0;

        if ('.content' === to) {
            offset = 350;
        } else if ('.examples' === to) {
            offset = 200;
        }

        $('html, body').animate({
            scrollTop: $(to).offset().top - offset
        }, 1000);
    });

    $('.nav-toggle').click(function() {
        $(this).toggleClass('out');
    });

    $('.card').click(function() {
        if ($(this).data('to')) {
            var win = window.open($(this).data('to'), '_blank');
        } else {
            $('body').addClass('no-scroll');
        }
    });

    $('body').on('click', '.featherlight-close', function() {
        $('body').removeClass('no-scroll');
    });

    $('.contact').click(function() {
        $('.contact-form').addClass('active');
    });

    sticky_relocate();

//    if (is_mobile) {
//        $('body').addClass('wip');
//    }


    var dom = {
        nonUnique: [],
        unique: [],
        get: function(callback) {
            var items = document.getElementsByTagName("*");
            var itemsLength = items.length;

            for (var i = itemsLength; i--;) {
                this.nonUnique.push(items[i].nodeName);
            }

            var nonUniqueLength = this.nonUnique.length;
            var uniqueLength = '';
            var currentNode = '';
            var match = false;

            for (var c = nonUniqueLength; c--;) {
                match = false;
                currentNode = this.nonUnique[c];
                uniqueLength = this.unique.length;

                for (var w = uniqueLength; w--;) {
                    if (this.unique[w].name === currentNode) {
                        this.unique[w].count++;
                        match = true;
                    }
                }

                if (!match) {
                    this.unique.push({name: currentNode, count: 1});
                }
            }

            return callback(this.unique);
        }
    };

    dom.get(function(unique) {
        $.each(unique, function(index, node) {
            $('.dom-list').append('<li class="dom-node"><span class="node-name highlight">' + '&lt;' + node.name + '&gt;' + '</span>  <span class=""node-count">' + node.count + '</span></li>');
        });
    });
});