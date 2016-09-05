module.exports = function (Post) {
  Post.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      ctx.instance.date = Date.now();
    }
    if (ctx.data && !ctx.data.date) {
      ctx.data.date = Date.now();
    }
    next();
  });
};
