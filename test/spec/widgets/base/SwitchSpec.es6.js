/**
 * @file Specs for Switch
 * @author Brian Li (lbxxlht@163.com)
 * @date  07/03/2016
 */

define(function (require) {

    const _ = require('underscore');
    const React = require('react');
    const TestUtils = React.addons.TestUtils;
    const Switch = require('Switch.jsx');


    function realRender(Component, props = {}) {
        return TestUtils.renderIntoDocument(<Component {...props} />);
    }

    describe('Switch', () => {

        describe('Base Testing', () => {

            it('Readers a Switch with default props', () => {
                let dom = realRender(Switch);
                expect(dom.refs.container.className).toBe('jpui-switch jpui-switch-normal browser-chrome jpui-switch-off');
            });

            it('checked', () => {
                let checked = '';
                let dom = realRender(Switch, {
                    checked: 'true',
                    onChange(e) {
                        checked = e.target.checked;
                    }
                });
                TestUtils.Simulate.click(dom.refs.container);
                expect(checked).toBe(false);
            });

            it('disabled', () => {
                let checked = '';
                let dom = realRender(Switch, {
                    checked: 'true',
                    disabled: true,
                    onChange(e) {
                        checked = e.target.checked;
                    }
                });
                TestUtils.Simulate.click(dom.refs.container);
                expect(checked).toBe('');
            });
        });

    });
});
