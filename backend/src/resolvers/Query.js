const { forwardTo } = require("prisma-binding");
const {hasPermission} = require("../utils")
const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),

  me(parent, args, ctx, info){
    if(!ctx.request.userId){
      return null
    }
    return ctx.db.query.user({
      where: {id: ctx.request.userId}
    }, info)
  },

  async users(parent, args, ctx, info){

      if(!ctx.request.userId){
       throw new Error('You must be logged in')
      }

      hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"])
      return ctx.db.query.users({}, info)
  },
  async order(parent, args, ctx, info){
      if (!ctx.request.userId) {
        throw new Error('You must be logged in')
      }
      const order = await  ctx.db.query.order({ where: {id : args.id}}, info)


      const ownsOrder = order.user.id === ctx.request.userId
      const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN')
      if (!ownsOrder || !hasPermissionToSeeOrder) {
          throw new Error('You do not have permission to see this order')
      }
       return order
  },
  async  orders(parent, args, ctx, info){
      if (!ctx.request.userId) {
        throw new Error('You must be logged in')
      }
      const userWithPermissions = ctx.request.user.permissions.includes('ADMIN')
      const usersOrders =  await ctx.db.query.orders({where:{user:{id: ctx.request.userId}}}, info)
      let allOrders
      if(userWithPermissions){
        allOrders = await ctx.db.query.orders()
      }
      console.log('USERRRRR', usersOrders)
      console.log('AKKKKKKKKKK', allOrders)
      return usersOrders
  }
};

module.exports = Query;
