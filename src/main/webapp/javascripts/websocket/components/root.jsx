var React = require('react');

var WebsocketStore = require('../stores/websocketStore.js');

var getStateFromStores = function () {
    return {
        state: WebsocketStore.getState()
    }
};


var Root = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
    },
    componentDidMount: function () {
        WebsocketStore.addChangeListener(this._onChange);
    },
    componentWillUnMount: function () {
        WebsocketStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },
    render: function () {

        var state = this.state.state;

        
        return (
            
            <div>
            hello
            </div>
        );
    }
});

module.exports = Root;
