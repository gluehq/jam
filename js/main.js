
//  V A R I A B L E S

// Responsive functions

var reported_width;
var actual_width;
var prev_width;
var curr_media;
var prev_media;
var check_media;

// Make sure these correspond with CSS

var phone_limit = 414;
var plus_limit = 737;
var tablet_limit = 835;
var compact_limit = 1025;
var standard_limit = 1367;

// Scroll tracking

var page_pos;


//  F U N C T I O N S

function on_resize() {

    // Get the actual browser width

    var disabled_width;
    var scrollbar_width;

    reported_width = $(window).width();
    $('body').css('overflow', 'hidden');
    disabled_width = $(window).width();
    $('body').css('overflow', '');

    if (window.navigator.userAgent.match(/Safari/i) && !window.navigator.userAgent.match(/Chrome/i)) {
        scrollbar_width = 0;
    } else {
        scrollbar_width = disabled_width - reported_width;
    }

    prev_width = actual_width;
    actual_width = reported_width + scrollbar_width;

    // If different to set media, media query has changed

    if (actual_width < phone_limit ) {
        check_media = 'phone';
    } else if (actual_width >= phone_limit && actual_width < plus_limit) {
        check_media = 'plus';
    } else if (actual_width >= plus_limit && actual_width < tablet_limit) {
        check_media = 'tablet';
    } else if (actual_width >= tablet_limit && actual_width < compact_limit) {
        check_media = 'compact';
    } else if (actual_width >= compact_limit && actual_width < standard_limit) {
        check_media = 'standard';
    } else if (actual_width >= standard_limit) {
        check_media = 'large';
    }

    if (check_media !== curr_media) {

        prev_media = curr_media;
        curr_media = check_media;

        // Functions that need to be rerun on media change

    }

    // Functions that need to be rerun on any resizing
    
    if (actual_width >= plus_limit) {
        // ...
    }

    $('#dev-box').text(curr_media + ' ' + actual_width);

}


$(document).ready(function() {
    
    on_resize();
    $(window).resize(on_resize);

    $(window).scroll(function() {

        // Handle differing browser support for scrollTop
        if ($('html').scrollTop() !== 0) {
            page_pos = $('html').scrollTop();
        } else {
            page_pos = $('body').scrollTop();
        }

    });

});