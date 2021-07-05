import developmentConfig from './dev/index';
import productionConfig from './prod/index';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default () => configs[env];
