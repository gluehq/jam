

function label_height(label) {
    // Calculate height methodically because unpainted elements and absolute
    // positioning can return zero and overlaps will not be detected
    var label_h = 0;
    // Calculate total height of classes label
    label.find('.classes').each(function() {
        label_h += $(this).outerHeight();
    });
    // If height is still zero, check for id label
    if (label_h == 0) {
        label.find('.id').each(function() {
            label_h += $(this).outerHeight();
        });
    }
    return label_h;
}

function label_width(label) {
    // Calculate width methodically because unpainted elements and absolute
    // positioning can return zero and overlaps will not be detected
    var label_w = 0;
    // Calculate total width of classes label
    label.find('.classes').each(function() {
        $(this).offsetHeight;
        label_w += $(this).outerWidth();
    });
    // If width is still zero, check for id label
    // if (label_w == 0) {
        label.find('.id').each(function() {
            label_w += $(this).outerWidth();
        });
    // }
    return label_w;
}

function create_labels() {
    // Iterate through relevant divs in the page
    $('body > *:not(#dev-grid) div').each(function() {
        // Capture attributes
        var classes = $(this).attr('class');
        var id = $(this).attr('id');
        // Proceed if any exist
        if (classes !== undefined || id !== undefined) {
            // Capture div positioning
            var this_x = parseInt($(this).offset().left);
            var this_y = parseInt($(this).offset().top);
            // Create label html with these attributes
            var html = '<div class="dev-label" style="left: ' + this_x + 'px; top: ' + this_y + 'px;">';
            if (classes !== undefined) {
                html += '<div class="classes">' + classes + '</div>';
            }
            if (id !== undefined) {
                html += '<div class="id">' + id + '</div>';
            }
            html += '</div>';
            // Add label html to labels container
            $('#dev-grid .labels').append(html);
            // Capture new label's element
            var new_el = $('#dev-grid .labels > *:last-child');
            // Iterate through existing labels and groups
            new_el.siblings().each(function() {
                // Capture each sibling's positioning values without units
                var other_x = parseInt($(this).css('left'));
                var other_y = parseInt($(this).css('top'));
                other_b = other_y + label_height($(this));
                other_r = other_x + label_width($(this));
                // Capture positioning values without units
                var new_x = parseInt(new_el.css('left'));
                var new_y = parseInt(new_el.css('top'));
                var new_r = new_x + label_width(new_el);
                // If new label overlaps an existing label or group
                if ((new_x >= other_x && new_x < other_r || new_r >= other_x && new_r < other_r) && new_y >= other_y && new_y < other_b) {
                    // Create group if the overlapped is not a group
                    if (!$(this).hasClass('dev-label-group')) {
                        // Capture existing positioning
                        var style = $(this).attr('style');
                        // Remove positioning
                        $(this).removeAttr('style');
                        // Create group and apply positioning to it
                        $(this).wrap('<div class="dev-label-group" style="' + style + '"></div>');
                    }
                    // Remove label positioning
                    new_el.removeAttr('style');
                    // Move label to group where its positioning takes over
                    var detached = new_el.detach();
                    detached.appendTo($(this).closest('.dev-label-group'));
                }
            });
        }
    });
}

function remove_labels() {
    if ($('.dev-label, .dev-label-group').length) {
        $('.dev-label, .dev-label-group').each(function() {
            $(this).remove();
        });
    }
}

var key_down;

function refresh_dev_tools() {

    $('#dev-grid [class*=jam-cols-]').each(function() {
        $(this).css('height', '');
        $(this).height($(window).height());
    });

    if (key_down === 65 && $('html').hasClass('dev-mode')) {
        remove_labels();
        create_labels();
    }

}

$(document).ready(function() {

    refresh_dev_tools();
    $(window).resize(refresh_dev_tools);

    // 'G' for grid only

    $(document).keydown(function(e) {
        if (e.keyCode === 65) {
            key_down = 65;
            $('html').addClass('dev-mode');
            $('#dev-grid').show();
            refresh_dev_tools();
            // Prevent recreating labels while key is held down
            if (!$('.dev-label').length) {
                create_labels();
            }
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 65) {
            key_down = null;
            remove_labels();
            $('html').removeClass('dev-mode');
            $('#dev-grid').hide();
        }
    });

    // 'A' for all

    $(document).keydown(function(e) {
        if (e.keyCode === 71) {
            key_down = 71;
            $('html').addClass('dev-mode');
            $('#dev-grid').show();
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 71) {
            key_down = null;
            $('html').removeClass('dev-mode');
            $('#dev-grid').hide();
            remove_labels();
        }
    });

});

