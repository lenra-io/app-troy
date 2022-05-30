'use strict'

module.exports = async () => {
  return {
    widgets: require('./widgets/all.js'),
    listeners: require('./listeners/all.js'),
    rootWidget: 'main'
  }
}