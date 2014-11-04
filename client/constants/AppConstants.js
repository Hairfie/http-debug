var keyMirror = require('react/lib/keyMirror');

function constants(names) {
    var constants = {};
    names.forEach(function (name) {
        constants[name] = name;
    });

    return constants;
};

module.exports = {
    ActionTypes: constants([
        'RECEIVE_EXCHANGE',
        'OPEN_PROXY',
    ]),
    PayloadSources: constants([
        'SERVER_ACTION',
        'CLIENT_ACTION',
    ])
};
