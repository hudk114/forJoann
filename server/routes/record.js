const router = new require('koa-router')();

router.get('/list', async (ctx, next) => {
  console.log('444');
  ctx.body = 'asdfasd';
});

router.post('/upload/:type', async (ctx, next) => {
  console.log('333');
  ctx.body = 'asdfasd';
});

module.exports = router;