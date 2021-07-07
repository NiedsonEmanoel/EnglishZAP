module.exports = {
    main: require('./Main'),
    webhooks: require('./Hooks'),
    api: require('./Api'),
    listeners: {
        'notFound': require('./Listeners/404'),
        'error': require('./Listeners/error')
    }
}