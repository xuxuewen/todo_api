'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        comment:'主键'
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'任务标题'
      },
      deadline:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'任务截止日期'
      },
      status:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'任务的状态，默认值1，表示未完成'
      },
      content:{
        type:Sequelize.STRING,
        comment:'任务内容'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    },{
      comment:'任务表'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos')
  }
};
