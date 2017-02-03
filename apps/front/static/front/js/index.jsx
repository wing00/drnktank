import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
require('font-awesome/css/font-awesome.css');

var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass ({
    render: function() {
        return (
            <h1>
            Hello, React!
            </h1>
        )
    }
});

ReactDOM.render(<Hello />, document.getElementById('container'));
