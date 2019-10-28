process.env.SECRET = 'test';

const path = require('path');
const configureApi = require('../server/configureApi');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src/components'),
        mixins: path.resolve(__dirname, './src/mixins')
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
