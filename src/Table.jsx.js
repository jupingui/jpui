define(function (require) {

    var TableHeader = require('./tableRenderer/TableHeader.jsx');
    var NormalRenderer = require('./tableRenderer/NormalRenderer.jsx');
    var React = require('react');

    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                conf: [],
                datasource: [],
                summary: {},
                message: '',
                onAction: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {
                sortField : '',
                selected: ''
            };
        },
        // @override
        componentDidMount: function () {
            this.updateWidth();
        },
        // @override
        componentDidUpdate: function () {
            this.updateWidth();
        },
        sortHandler: function (e) {
            this.props.onAction('sort', {
                field: e.field,
                order: e.sortType
            });
        },
        actionHandler: function (type, param) {
            this.props.onAction(type, param);
        },
        updateWidth: function () {
            var container = this.refs.container;
            var table = this.refs.table;
            var conf = this.props.conf;
            var d = container.offsetWidth - table.offsetWidth;
            if (d < 15) return;
            var last = conf[conf.length - 1];
            last.width += d + 10;
            this.setState({conf: conf}); 
        },
        // @override
        render: function () {
            var me = this;
            var conf = this.props.conf;
            var summary = this.props.summary;
            // {summaryFactory()}
            return (
                <div className="fcui2-table" ref="container">
                    <table cellSpacing="0" cellPadding="0" ref="table">
                        <tbody>
                        {headerFactory()}
                        {this.props.datasource.map(lineFactory)}
                        </tbody>
                    </table>
                    <div className="fcui2-fixed-header">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                            {headerFactory()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            // 生成表头
            function headerFactory(ref) {
                var td = [];
                for (var i = 0; i < conf.length; i++) {
                    var key = 'head-' + i;
                    td.push(<TableHeader {...conf[i]} onSort={me.sortHandler} sortField={me.state.sortField} key={key}/>);
                }
                return <tr className="table-header" key="head">{td}</tr>;
            }
            // 生成数据行
            function lineFactory(item, index, arr) {
                var td = [];
                for (var i = 0; i < conf.length; i++) {
                    var props = {
                        item: item,
                        index: index,
                        conf: conf[i],
                        onAction: me.actionHandler,
                        key: 'column-' + i
                    };
                    if (conf[i].hasOwnProperty('color')) {
                        if (typeof conf[i].color === 'function') {
                            props.color = conf[i].color(item);
                        }
                        else {
                            props.color = conf[i].color + '';
                        }
                    }
                    var renderer = typeof conf[i].renderer === 'function' ? conf[i].renderer : NormalRenderer;
                    td.push(React.createElement(renderer, React.__spread({}, props)));
                }
                return <tr key={'row-' + index}>{td}</tr>;
            }
            // // 生成统计栏
            // function summaryFactory() {
            //     var td = [];
            //     td.push(<td></td>);
            //     for (var i = 0; i < conf.length; i++) {
            //         var item = conf[i];
            //         var tdStyle = {};
            //         var text = summary.hasOwnProperty(item.field) ? summary[item.field] : '-';
            //         text = (text + '').indexOf('.') > -1 ? text.toFixed(2) : text;
            //         if (typeof item.width === 'number') {
            //             tdStyle.width = item.width;
            //         }
            //         tdStyle['text-align'] = isNaN(text) ? 'left' : 'right';
            //         td.push(<td style={tdStyle}>{text}</td>);
            //     }
            //     return <tr className="table-summary">{td}</tr>
            // }
        }
    });
});