

function refresh_grid() {

    $('#dev-grid div').each(function() {
        $(this).css('height', '');
        $(this).height($(window).height());
    });
    // $('#dev-box').text($(window).height());

    // $('#dev-grid .content-area').css('height', '');
    // $('#dev-grid .content-area').height($('body').height());

}

$(document).ready(function() {

    refresh_grid();
    $(window).resize(refresh_grid);

    $(document).keydown(function(e) {
        if (e.keyCode === 71) {
            if (!$('.dev-label').length) {
                $('div:not(.dev-label)').each(function() {
                    var classes = $(this).attr('class');
                    var id = $(this).attr('id');
                    if (classes !== undefined || id !== undefined) {
                        var html = '<div class="dev-label">';
                        if (classes !== undefined) {
                            html += classes + ' ';
                        }
                        if (id !== undefined) {
                            html += '<row class="id">' + id + '</row>';
                        }
                        html += '</div>';
                        $(this).append(html);// Changing to prepend may break js-valign() in core.js
                    }
                });
            }
            $('html').addClass('dev-mode');
            $('#dev-grid').show();
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 71) {
            $('.dev-label').each(function() {
                $(this).remove();
            });
            $('html').removeClass('dev-mode');
            $('#dev-grid').hide();
        }
    });

    // Highlight placeholder links
    
    $('a').each(function() {
        if ($(this).attr('href') === "#") {
            $(this).click(function(event) {
                event.preventDefault();
            });
            $(this).css('text-decoration', 'line-through');
        }
    });

});

