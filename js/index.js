/*
 * @Author: weimin
 * @Date:   2017-01-10 14:15:51
 * @Last Modified by:   weimin
 * @Last Modified time: 2017-01-11 16:17:19
 */


var index = (function() {
    var init = function() {
        highlight();
        pageScroll();
    };
    var highlight = function() {
        hljs.initHighlighting();
    };
    var pageScroll = function() {
        var $nav = $('.page-nav');
        var $navItems = $nav.find('.nav-item');
        var itemMap = {};
        $navItems.each(function(index, item) {
            var $this = $(item);
            var type = $this.data('type');
            var $content = $('.' + type),
                contentTop = $content.offset().top,
                contentHeight = $content.height(),
                contentBottom = contentTop + contentHeight;
            itemMap[type] = {
                index: index,
                top: contentTop,
                bottom: contentBottom
            }
        });
        console.log(itemMap)
        $nav.on('click', '.nav-item', function() {
            var $this = $(this);
            var type = $this.data('type');
            var contentTop = itemMap[type].top;
            $('html,body').animate({
                scrollTop: contentTop
            }, emphasize($this));
        });
        $(window).scroll(function() {

            var scrollTop = $(this).scrollTop();
            var type = '';
            for (var key in itemMap) {
                var item = itemMap[key];
                if (item.top <= scrollTop && item.bottom > scrollTop) {
                    type = key;
                    break;
                }
            }
            if (!type) {
                return;
            }
            var $obj = $('.nav-item').eq(itemMap[type].index);
            emphasize($obj)();
        });

        function emphasize($obj) {
            return function() {
                $navItems.removeClass('cur');
                $obj.addClass('cur');
            }
        }
    };
    return {
        init: init
    };
})();
index.init();
