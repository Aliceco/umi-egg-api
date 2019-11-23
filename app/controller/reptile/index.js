'use strict';
const Controller = require('egg').Controller;

class ReptileController extends Controller {
  async capture() {
    const { ctx } = this;
    let src = ctx.request.body;
    try {
      // console.log(src);
      let res = null;
      // 定义创建接口的请求参数规则
      let createRule = {
        url: 'string',
        scope: 'object',
        userIdPrefix: 'string',
      };
      // 使用参数校验
      ctx.validate(createRule, src);
      const url = 'http://localhost:5000';
      const result = await ctx.curl(url + '/weibo/capture', {
        dataType: 'json',
        timeout: 3000,
        method: 'POST',
        data: {
          url: src.url,
          scope: JSON.stringify(src.scope),
          userIdPrefix: src.userIdPrefix,
        },
      });
      this.addRecord(src);
    } catch (e) {
      this.addRecord(src)
    }
  }
  async addRecord(src) {
    const { ctx } = this;
    try {
      let res = await ctx.service.reptile.index.add(src);
      ctx.body = {
        code: 200,
        status: 'success',
        msg: '添加爬虫记录成功',
        data: res,
      };
    } catch (e) {
      ctx.body = {
        code: 403,
        status: 'fail',
        msg: '添加爬虫记录失败',
        data: e,
        test: ctx.request.body,
      };
    }
  }
  async queryRecord() {
    const { ctx } = this;
    try {
      let res = await ctx.service.reptile.index.query();
      ctx.body = {
        code: 200,
        status: 'success',
        msg: '查询爬虫记录成功',
        data: res,
      };
    } catch (e) {
      ctx.body = {
        code: 403,
        status: 'fail',
        msg: '查询爬虫记录失败',
        data: e,
        test: ctx.request.body,
      };
    }
  }
  async deleteRecord() {
    const { ctx } = this;
    try {
      let src = ctx.request.body;
      // 定义创建接口的请求参数规则
      let createRule = {
        id: 'string',
      };
      // 使用参数校验
      ctx.validate(createRule, src);
      let res = await ctx.service.reptile.index.delete(src);
      ctx.body = {
        code: 200,
        status: 'success',
        msg: '删除爬虫记录成功',
        data: res,
      };
    } catch (e) {
      ctx.body = {
        code: 403,
        status: 'fail',
        msg: '删除爬虫记录失败',
        data: e,
        test: ctx.request.body,
      };
    }
  }
}

module.exports = ReptileController;