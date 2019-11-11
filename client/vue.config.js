process.env.SECRET = 'test';

const path = require('path');
const configureApi = require('../server/configureApi');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src/components'),
        mixins: path.resolve(__dirname, './src/mixins'),
        utils: path.resolve(__dirname, './src/utils')
      }
    }
  },
  devServer: {
    before: configureApi
  },
  transpileDependencies: [
    'vuetify'
  ]
};
