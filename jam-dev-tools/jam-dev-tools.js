
function label_height(label) {
    // Calculate height methodically because unpainted elements and absolute
    // positioning can return zero and overlaps will not be detected
    var label_h = 0;
    // Calculate total height of classes label
    var classes = document.querySelectorAll('.classes');
    Array.prototype.forEach.call(classes, function(el, i) {
        label_h += classes[i].outerHeight;
    });
    // If height is still zero, check for id label
    if (label_h == 0) {
        var id = document.querySelectorAll('.id');
        Array.prototype.forEach.call(id, function(el, i) {
            label_h += id[i].outerHeight;
        });
    }
    return label_h;
}

function label_width(label) {
    // Calculate width methodically because unpainted elements and absolute
    // positioning can return zero and overlaps will not be detected
    var label_w = 0;
    // Calculate total width of classes label
    var classes = document.querySelectorAll('.classes');
    Array.prototype.forEach.call(classes, function(el, i) {
        classes[i].offsetHeight;
        label_w += classes[i].outerWidth;
    });
    // If width is still zero, check for id label
    var id = document.querySelectorAll('.id');
    Array.prototype.forEach.call(id, function(el, i) {
        label_w += id[i].outerWidth;
    });
    return label_w;
}

function create_labels() {
    // Iterate through relevant divs in the page
    var divs = document.querySelectorAll('body > *:not(#dev-grid) div');
    Array.prototype.forEach.call(divs, function(el, i) {
        // Capture attributes
        var classes = divs[i].getAttribute('class');
        var id = divs[i].getAttribute('id');
        // Proceed if any exist
        if (classes !== null || id !== null) {
            // Capture div positioning
            var rect = divs[i].getBoundingClientRect();
            var child_rect = divs[i].getBoundingClientRect();
            var parent_rect = document.querySelector('#dev-grid .labels').getBoundingClientRect();
            var this_y = parseInt(child_rect.top - parent_rect.top);
            var this_x = parseInt(child_rect.left - parent_rect.left);
            // Create label html with these attributes
            var html = '<div class="dev-label" style="left: ' + this_x + 'px; top: ' + this_y + 'px;">';
            if (classes !== null) {
                html += '<div class="classes">' + classes + '</div>';
            }
            if (id !== null) {
                html += '<div class="id">' + id + '</div>';
            }
            html += '</div>';
            // Add label html to labels container
            document.querySelector('#dev-grid .labels').insertAdjacentHTML('beforeend', html);
            // Capture new label's element
            var new_el = document.querySelector('#dev-grid .labels > *:last-child');
            // Iterate through existing labels and groups
            Array.prototype.filter.call(new_el.parentNode.children, function(child) {
                if (child !== el) {
                    // Capture each sibling's positioning values without units
                    var other_x = parseInt(child.style.left);
                    var other_y = parseInt(child.style.top);
                    other_b = other_y + label_height(child);
                    other_r = other_x + label_width(child);
                    // Capture positioning values without units
                    var new_x = parseInt(new_el.style.left);
                    var new_y = parseInt(new_el.style.top);
                    var new_r = new_x + label_width(new_el);
                    // If new label overlaps an existing label or group
                    if ((new_x >= other_x && new_x < other_r || new_r >= other_x && new_r < other_r) && new_y >= other_y && new_y < other_b) {
                        // Create group if the overlapped is not a group
                        if (!child.classList.contains('dev-label-group')) {
                            // Capture existing positioning
                            var style = child.getAttribute('style');
                            // Remove positioning
                            child.removeAttribute('style');
                            // Create group and apply positioning to it
                            $(this).wrap('<div class="dev-label-group" style="' + style + '"></div>');
                            var new_html = '<div class="dev-label-group" style="' + style + '"></div>';
                            child.innerHTML = new_html;
                        }
                        // Remove label positioning
                        new_el.removeAttribute('style');
                        // Move label to group where its positioning takes over
                        var detached = new_el.parentElement.removeChild(new_el);
                        new_el.closest('.dev-label-group').appendChild(detached);
                    }
                }
            });
        }
    });
}

function remove_labels() {
    var label_divs = document.querySelectorAll('.dev-label, .dev-label-group');
    if (label_divs.length) {
        Array.prototype.forEach.call(label_divs, function(el, i) {
            label_divs[i].parentElement.removeChild(label_divs[i]);
        });
    }
}

var key_down;

function refresh_dev_tools() {

    var dev_cols = document.querySelectorAll('#dev-grid [class*=jam-cols-]');
    Array.prototype.forEach.call(dev_cols, function(el, i) {
        dev_cols[i].style.height = '';
        dev_cols[i].style.height = document.documentElement.clientHeight  + 'px';
    });

    if (key_down === 65 && document.documentElement.classList.contains('dev-mode')) {
        remove_labels();
        create_labels();
    }

}

document.addEventListener('DOMContentLoaded', function(event) {

    refresh_dev_tools();
    window.addEventListener('resize', function(event) {
        refresh_dev_tools();
    });

    document.body.onkeydown = function(e) {
        if (e.keyCode === 65) {// 'G' for grid only
            key_down = 65;
            document.documentElement.classList.add('dev-mode');
            document.querySelector('#dev-grid').style.display = 'block';
            refresh_dev_tools();
            // Prevent recreating labels while key is held down
            if (!document.querySelectorAll('.dev-label').length) {
                create_labels();
            }
        } else if (e.keyCode === 71) {// 'A' for all
            key_down = 71;
            document.documentElement.classList.add('dev-mode');
            document.querySelector('#dev-grid').style.display = 'block';
        }
    }

    document.body.onkeyup = function(e) {
        if (e.keyCode === 65) {// 'G' for grid only
            key_down = null;
            remove_labels();
            document.documentElement.classList.remove('dev-mode');
            document.querySelector('#dev-grid').style.display = '';
        } else if (e.keyCode === 71) {// 'A' for all
            key_down = null;
            document.documentElement.classList.remove('dev-mode');
            document.querySelector('#dev-grid').style.display = '';
            remove_labels();
        }
    }

});
