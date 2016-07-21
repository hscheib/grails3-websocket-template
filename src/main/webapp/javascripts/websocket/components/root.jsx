var React = require('react');

var WebsocketStore = require('../stores/websocketStore.js');
var WebsocketActions = require('../actions/websocketActions.js');

var getStateFromStores = function () {
    return {
        messages: [],
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
        var message = WebsocketStore.getState();
        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages: messages});
    },
    openSocket: function () {
        WebsocketActions.connect();
    },
    closeSocket: function () {
        WebsocketActions.disconnect();
    },
    sendMessag: function () {
        var input = this.refs.messageBox.value;
        WebsocketActions.sendMessage(input);
    },
    render: function () {
        var messageRows = this.state.messages.map(function (message, index) {
            return (<tr id={"message"+index}>
                <td>{message}</td>
            </tr>);
        });
        return (
            <div className="container">
                <div className="row">
                    <button className="btn btn-primary" onClick={this.openSocket}>Connect</button>
                    <button className="btn btn-primary" onClick={this.closeSocket}>Disconnect</button>
                    <button className="btn btn-primary" onClick={this.sendMessag}>Send Message</button>
                    <input type="text" ref="messageBox"/>
                    <table>
                        <tbody id="eventsTable">
                        {messageRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = Root;
