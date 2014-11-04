var React = require('react');
var ProxyStore = require('../stores/ProxyStore');
var ProxyList = require('./ProxyList.react');
var ExchangeList = require('./ExchangeList.react');

function getStateFromStores() {
    return {
        proxies     : ProxyStore.getAll(),
        openProxy   : ProxyStore.getOpenProxy(),
    };
}

var App = React.createClass({
    getInitialState: getStateFromStores,
    componentDidMount: function () {
        ProxyStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        ProxyStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-2">
                    <ProxyList />
                </div>
                <div className="col-xs-10">
                    <ExchangeList />
                </div>
            </div>
        );
    },
    _onChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = App;
