const http = require('http');
const Context = require('./context');

// 判断是否是async定义的函数
const isAsync = (fn) => {
    const asyncFunction = Object.getPrototypeOf(async () => {}).constructor;
    return Object.getPrototypeOf(fn).constructor === asyncFunction;
};

class Koa {
    constructor() {
        this.middleware = [];
        this.context = {}; // 用于扩展ctx
        this.keys = ''; // 用于cookies签名
        this.env = process.env.NODE_ENV || 'development'; // 环境变量
    }

    use(cb) {
        if (typeof cb === 'function' && isAsync(cb)) {
            this.middleware.push(cb);
        } else {
            console.log('请已定义异步中间件');
        }
    }

    async run(ctx) {
        let flag = 0;
        const next = async () => {
            if (flag < this.middleware.length) {
                flag++;
                await this.middleware[flag - 1].call({ ctx }, ctx, next);
            }
        };
        await next();
    }

    end(ctx) {
        const { response: res } = ctx;
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8',
        });
        res.write(JSON.stringify({a: 123}));
        res.end();
    }

    callback() {
        return (req, res) => {
            let ctx = new Context(this.context, req, res);
            this.run(ctx).then(() => {
                this.end(ctx);
            });
        }
    }

    listen(port) {
        try {
            http.createServer(this.callback()).listen(port || 3001);
        } catch (e) {

        }
    }
}

module.exports = Koa;
