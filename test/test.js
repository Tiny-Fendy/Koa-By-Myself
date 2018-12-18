const Koa = require('../src/main');
const app = new Koa();

app.context = {
    abk() {
        return '这里是扩展';
    }
};

app.use(async function (ctx, next) {
    console.log(1);
    await next();
});

app.use(async (ctx, next) => {
    await next();
});

app.use(async (ctx, next) => {
    ctx.body = '12345';
    console.log(ctx.abk());
});

app.listen(3005);
