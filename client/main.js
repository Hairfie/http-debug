/**
 *  @jsx React.DOM
 */
var React = require('react');
var App = require('./components/App.react');
var ServerEventSources = require('./event-sources/ServerEventSources');

window.React = React;

ServerEventSources.init();

React.render(
    <App />,
    document.getElementById('app')
);
