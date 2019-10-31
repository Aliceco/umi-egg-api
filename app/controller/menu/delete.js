'use strict';
const Controller = require('egg').Controller;

class MenuDeleteController extends Controller {
  // 删除菜单
  async index() {
    const { ctx } = this;
    try {
      let src = ctx.request.body;
      // 定义创建接口的请求参数规则
      let createRule = {
        id: 'string',
      };
      // 使用参数校验
      ctx.validate(createRule, src);
      let res = await ctx.service.menu.delete.index(src);
      let roleForm = {
        menu_id: src.id,
      };
      let menuRole = await ctx.service.role.configAuth.query.index(roleForm);
      menuRole = JSON.parse(JSON.stringify(menuRole));
      // console.log(menuRole);
      if (menuRole.length > 0) {
        menuRole.forEach(async(item) => {
          let deteleMenuRole = await ctx.service.role.configAuth.index.delete(item);
        })
      }
      ctx.body = {
        code: 200,
        status: 'success',
        msg: '删除菜单成功',
        data: res,
      };
    } catch (e) {
      ctx.body = {
        code: 403,
        status: 'fail',
        msg: '删除操作失败',
        data: e,
        test: ctx.request.body,
      };
    }
  }
}

module.exports = MenuDeleteController;
