const express = require('express');
const lodash = require('lodash');
const moment = require('moment');

const Joi = require('@hapi/joi');

const router = express.Router();

const models = require('../models');

const createSchema = Joi.object().keys({
  title:Joi.string().min(1).max(20).error(new Error('title 不能为空且长度不能超过20个字符')),
  deadline:Joi.date().error((errors)=>{
    return new Error('deadline 必须是日期')
  }),
  content:Joi.string().min(0).max(200).error((errors)=>{ 
    console.log(errors) 
    return new Error('content 长度不能超过200个字符')
  }),
})
const updateSchema = createSchema.keys({
  id:Joi.number().required().error(new Error('id 不能为空')),
  status:Joi.number().allow([1,2,3]).error(new Error('状态只允许 1,2,3'))
})
const deleteSchema = Joi.object().keys({
  id:Joi.number().required().error(new Error('id 不能为空'))
})
// 创建一个 新的 todo
router.post('/create',async function(req,res){
  let {title,deadline,content} = req.body;
  let result = Joi.validate({title,deadline,content},createSchema);
  if(result.error){
    res.json({
      code:-1,
      message:'创建失败',
      errmsg:result.error.message
    })
  }else{
    try {
      let todo = await models.Todo.create({
        title,
        deadline,
        content
      })
      res.json({
        code:0,
        message:'成功',
        data:{
          todo
        }
      })
    } catch (error) {
      res.json({
        code:-1,
        message:'失败',
        errmsg:error.message
      })
    }
  }
})
// 修改todo 只能修改 标题、内容和状态
router.post('/update',async function(req,res){
  let {title,deadline,content,id,status} = req.body;
  let result = Joi.validate({title,deadline,content,id,status},updateSchema);
  if(result.error){
    res.json({
      code:-1,
      message:'失败',
      errmsg:result.error.message
    })
  }else{
    try {
      let todo  = await models.Todo.findOne({
        where:{
          id
        }
      })
      if(todo){
        let newTodo = await todo.update({
          title,
          deadline,
          content,
          status
        })
        res.json({
          code:0,
          message:'成功',
          data:{
            todo:newTodo
          }
        })
      }else{
        res.json({
          code:-1,
          message:'失败',
          errmsg:'未找到需要修改的任务'
        })      
      }
    } catch (error) {
      res.json({
        code:-1,
        message:'失败',
        errmsg:error.message
      })
    }
  }
})
// 删除todo 根据id
router.post('/delete',async function(req,res){
  let {id} = req.body;
  let result = Joi.validate({id},deleteSchema);
  if(result.error){
    res.json({
      code:-1,
      message:'失败',
      errmsg:result.error.message
    })
  }else{
    try {
      let destroyRow = await models.Todo.destroy({
        where:{
          id
        }
      })
      if(destroyRow === 1){
        res.json({
          code:0,
          message:'成功',
          errmsg:'成功删除1条数据'
        })
      }else{
        res.json({
          code:-1,
          message:'失败',
          errmsg:'数据删除失败'
        })
      }
    } catch (error) {
      res.json({
        code:-1,
        message:'失败',
        errmsg:error.message
      })
    }
  }
})

// 生成校验 规则
const schema = Joi.object().keys({
  pageSize:Joi.number().integer().min(10).error(new Error('pageSize 必须是大于等于10的正整数')),
  page:Joi.number().integer().min(1).error(new Error('page 必须是大于等于1的正整数')),
  status:Joi.number().allow(-1,1,2,3).error(new Error('status 只能是 -1,1，2，3')),
})
// 查询全部的 支持分页
router.post('/list',async function(req,res){
  let { pageSize=10,page=1,status=-1} = req.body;
  // 校验入参的 有效性
  const result = Joi.validate({pageSize,page,status},schema);
  if(result.error){
    res.json({
      code:-1,
      message:'入参不合法',
      errmsg:result.error.message
    })
  }else{
    try {
      let data = await models.Todo.findAndCountAll({
        limit:pageSize,
        offset:(page-1)*pageSize,
        raw:true,
        where:status==-1?{}:{status},
        order:[
          ['deadline','ASC'],['updatedAt','DESC'],['createdAt','DESC']
        ]
      })
      res.json({
        code:0,
        message:'成功',
        data:{
          ...data
        }
      })
    } catch (error) {
      res.json({
        code:-1,
        message:'任务列表查询失败',
        errmsg:error.message
      })
    }
  }
})

module.exports = router;