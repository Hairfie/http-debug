var React = require('react');

var ExchangeListItem = React.createClass({
    render: function () {
        var exchange = this.props.exchange,
            request  = exchange.request,
            response = exchange.response;

        if (response.statusCode >= 200 && response.statusCode < 400) {
            var statusColor = 'success';
        } else if (response.statusCode >= 400 && response.statusCode < 500) {
            var statusColor = 'warning';
        } else if (response.statusCode >= 500 && response.statusCode < 600) {
            var statusColor = 'danger';
        } else {
            var statusColor = 'default';
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    {request.method} {request.path}
                    <span className={'pull-right label label-'+statusColor}>{response.statusCode}</span>
                </div>
                <div className="panel-body">
                    <h3>Request</h3>
                    <div>{request.body}</div>

                    <h3>Response</h3>
                    <div>{response.body}</div>
                </div>
            </div>
        );
    }
});

module.exports = ExchangeListItem;
