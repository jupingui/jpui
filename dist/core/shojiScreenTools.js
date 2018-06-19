/**
 * ShojiScreen 工具集
 * @author Brian Li
 * @email lbxxlht@163.com
 * @author 0.0.2.1
 */
define(function (require) {

    var jpui = require('./util').getNamespace('___fcui2___');

    return {

        /**
         * 向全局按钮队列中添加一个按钮，只操作队列，不进行其他任何操作
         * @interface addExpandButton
         * @param {HtmlElement} dom ShojiScreen的expand按钮
         */
        addExpandButton: function addExpandButton(dom) {
            if (!dom) return;
            jpui.shojiScreenExpandButtonArray = jpui.shojiScreenExpandButtonArray instanceof Array ? jpui.shojiScreenExpandButtonArray : [];
            var arr = jpui.shojiScreenExpandButtonArray;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === dom) return;
            }
            arr.push(dom);
        },

        /**
         * 从全局按钮队列中移除一个按钮，只操作队列，不进行其他任何操作
         * @interface removeExpandButton
         * @param {HtmlElement} dom ShojiScreen的expand按钮
         */
        removeExpandButton: function removeExpandButton(dom) {
            if (!dom) return;
            jpui.shojiScreenExpandButtonArray = jpui.shojiScreenExpandButtonArray instanceof Array ? jpui.shojiScreenExpandButtonArray : [];
            var arr = jpui.shojiScreenExpandButtonArray;
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === dom) {
                    continue;
                }
                result.push(arr[i]);
            }
            jpui.shojiScreenExpandButtonArray = result;
        },

        /**
         * 刷新所有可用按钮的位置
         * @interface freshExpandButton
         */
        freshExpandButton: function freshExpandButton() {
            jpui.shojiScreenExpandButtonArray = jpui.shojiScreenExpandButtonArray instanceof Array ? jpui.shojiScreenExpandButtonArray : [];
            var arr = jpui.shojiScreenExpandButtonArray;
            for (var i = 0; i < arr.length; i++) {
                arr[i].style.top = (i + 1) * 51 + 74 + 'px';
            }
        }
    };
});