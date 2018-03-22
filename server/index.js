const Koa = require('koa');
const app = new Koa();
const router = new require('koa-router')();
const index = require('./routes/index');
const record = require('./routes/record');

app.use(async (ctx, next) => {
  // TODO judge auth

  console.log('1234');
  await next();
});

router.use('/', index.routes());
router.use('/record', record.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);