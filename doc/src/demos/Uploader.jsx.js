define(function (require) {

    var Uploader = require('jpui/enterprise/Uploader.jsx');
    var Creater = require('./Main.jsx');

    var items = [
        {
            title: 'Normal Uploader',
            props: {}
        }
    ];

    return Creater(Uploader, items, 'onClick');

});
