var React = require('react');
var ProxyStore = require('../stores/ProxyStore');
var ProxyListItem = require('./ProxyListItem.react');

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
        var items = this.state.proxies.map(function (proxy) {
            return <ProxyListItem proxy={proxy} />
        });

        return (
            <ul className="nav nav-pills nav-stacked">
                {items}
            </ul>
        );
    },
    _onChange: function () {
        this.setState(getStateFromStores());
    }
});

module.exports = App;
