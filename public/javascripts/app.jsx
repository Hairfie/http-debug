var Exchanges = function () {
    this.exchanges = [];
};

Exchanges.prototype.all = function () {
    return this.exchanges;
}

var ExchangeList = React.createClass({
    getInitialState: function () {
        return {requests: []};
    },

    componentDidMount: function () {
        this.props.exchanges.on('updated', (function (event) {
            this.setState({requests: exchanges.all()});
        }).bind(this));
    },

    render: function () {
        var items = this.state.requests.map(function (exchange) {
            return <ExchangeListItem request={exchange} />
        });

        return (<ul>{items}</ul>);
    }
});

var ExchangeListItem = React.createClass({
    render: function () {
        var exchange = this.props.exchange;
        return (
            <div>
                <span>{exchange.request.method}</span>
                <span>{exchange.request.path}</span>
                <span>{exchange.response.statusCode}</span>
            </div>
        );
    }
});

var App = React.createClass({
    componentWillMount: function () {
        console.log('tata');
        this.props.exchanges = new Exchanges();
    },

    render: function () {
        console.log('tata');
        return <ExchangeList exchanges={this.props.exchanges} />;
    }
});
