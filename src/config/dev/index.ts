import database from './database/index';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 80,
  // 数据库配置
  DATABASE_CONFIG: database,
};
