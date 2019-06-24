# TODO API

## Start

1. 安装依赖 ` npm i `
2. 修改 `/config/config.json` 中对应的数据库配置
3. 创建数据库 ` npx sequelize-cli db:create --env=development `
4. 初始化数据库表 `npx sequelize-cli db:migrate --env=development `
5. 启动项目 ` npm run start `
6. pm2 启动 ` pm2 start ./bin/www --name=todo_apo `


## ORM 模型创建

1. 安装 `mysql2`,`sequelize` 和 `sequelize-cli`
  
  命令: ` npm i mysql2  sequelize sequelize-cli -S`

  mysql2: 这个是nodejs 和 mysql 之间的连接 中间件，可以理解成 驱动，或者java中的 `JDBC`
  
  sequelize:这个是nodejs生态中，用的最广泛的一个 ORM 框架；支持特别多的数据库 `MySQL`，`PostgreSQL`等

  sequelize-cli：这个一个命令行工具，帮助开发者进行 数据库、数据库表、字段、数据的维护以及不同环境之间进行数据库迁移

2. 使用 `sequelize-cli` 

  1. 初始化项目配置 `npx sequelize-cli init`
  2. 启动本地数据库，并且修改 项目中的数据配置 ,注意时区到配置
  3. 执行命令 创建 数据库 `npx sequelize-cli db:create --env=development`
  4. 执行命令创建一个 生成ORM对象 的脚步`npx sequelize-cli migration:generate --name Todo`
  5. 编写模型字段文件
  6. 持久化模型到数据库 ` npx sequelize-cli db:migrate --env=development `

3. 编写 ORM 模型对象 
  需要在 `models/` 下面创建对应的model对象


## 接口实现（一） 实现单个对象的 CRUD




## 参考资料

1. [sequelizejs](http://docs.sequelizejs.com/)
2. [sequelizejs-cli](https://github.com/sequelize/cli)
3. [mysql2](https://github.com/sidorares/node-mysql2)