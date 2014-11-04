var React = require('react');

var ExchangeListItem = require('./ExchangeListItem.react');
var ProxyStore = require('../stores/ProxyStore');
var ExchangeStore = require('../stores/ExchangeStore');

function getStateFromStores() {
    var openProxy = ProxyStore.getOpenProxy();

    return {
        exchanges: openProxy ? ExchangeStore.getAllForProxy(openProxy) : []
    }
}

var ExchangeList = React.createClass({
    getInitialState: function () {
        return getStateFromStores();
    },
    componentDidMount: function () {
        ExchangeStore.addChangeListener(this._onChange);
        ProxyStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        ExchangeStore.removeChangeListener(this._onChange);
        ProxyStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var items = this.state.exchanges.map(function (exchange) {
            return <ExchangeListItem exchange={exchange} />
        });

        return <ul className="exchange-list">{items}</ul>;
    },
    _onChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = ExchangeList;
