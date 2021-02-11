
//  V A R I A B L E S

// Responsive functions

var reported_width;
var actual_width;
var prev_width;
var curr_media;
var prev_media;
var check_media;

// Make sure these correspond with CSS

var phone_limit = 411;
var plus_limit = 768;
var tablet_limit = 1025;
var standard_limit = 1367;

// Scroll tracking

var page_pos;

//  F U N C T I O N S

function refresh_devbox() {
    document.querySelector('#dev-box').textContent = curr_media + ' ' + actual_width + ' ' + page_pos;
}

function on_resize() {

    // Get the actual browser width

    var disabled_width;
    var scrollbar_width;

    reported_width = window.innerWidth;
    document.body.style.overflow = 'hidden';
    disabled_width = window.innerWidth;
    document.body.style.overflow = '';

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
    } else if (actual_width >= tablet_limit && actual_width < standard_limit) {
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

    refresh_devbox();

}

function on_scroll() {

    // Handle differing browser support for scrollTop
    if (document.documentElement.scrollTop !== 0) {
        page_pos = document.documentElement.scrollTop;
    } else {
        page_pos = document.body.scrollTop;
    }
    
    refresh_devbox();

}

document.addEventListener('DOMContentLoaded', function(event) {
    
    on_resize();
    window.addEventListener('resize', function(event) {
        on_resize();
    });

    on_scroll();
    window.addEventListener('scroll', function(event) {
        on_scroll();
    });

    // Remove white space from between <li>s
    var list_els = document.querySelectorAll('ul, ol');
    Array.prototype.forEach.call(list_els, function(el, i) {
        var html = list_els[i].innerHTML;
        list_els[i].innerHTML = html.replace(/(<\/li>)\s*/g, '$1');
    });

});