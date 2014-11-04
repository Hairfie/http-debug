var React = require('react');
var ProxyStore = require('../stores/ProxyStore');
var UnreadExchangeStore = require('../stores/UnreadExchangeStore');
var ClientActionCreators = require('../actions/ClientActionCreators');

function getStateFromStores(proxy) {
    return {
        isOpen: ProxyStore.isOpenProxy(proxy),
        numUnread: UnreadExchangeStore.getNumForProxy(proxy),
    }
}

var ProxyListItem = React.createClass({
    getInitialState: function () {
        return getStateFromStores(this.props.proxy);
    },
    componentDidMount: function () {
        ProxyStore.addChangeListener(this._onChange);
        UnreadExchangeStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        ProxyStore.removeChangeListener(this._onChange);
        UnreadExchangeStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var badge = null;
        if (!this.state.isOpen) {
            badge = <span className="badge pull-right">{this.state.numUnread}</span>;
        }

        return (
            <li className={this.state.isOpen ? 'active' : ''} onClick={this._openProxy}>
                <a href="javascript:void(0);">
                    {this.props.proxy.name}
                    {badge}
                </a>
            </li>
        );
    },
    _onChange: function () {
        this.setState(getStateFromStores(this.props.proxy));
    },
    _openProxy: function () {
        ClientActionCreators.openProxy(this.props.proxy);
    },
});

module.exports = ProxyListItem;
