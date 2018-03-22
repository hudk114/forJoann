const router = new require('koa-router')();

router.get('/', async (ctx, next) => {
  console.log('123');
  ctx.body = 'asdf';
});

module.exports = router;