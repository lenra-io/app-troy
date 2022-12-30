'use strict'

module.exports = async () => {
  return {
    views: require('./views/all.js'),
    listeners: require('./listeners/all.js'),
    rootView: 'main'
  }
}