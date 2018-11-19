const http = require('http');

class Koa {
    constructor() {
        this.run = this.run.bind(this);
        this.end = this.end.bind(this);
        this.middleware = [];
        this.app = {};
        this.ctx = {};
        this.keys = '';
    }

    use(cb) {
        if (typeof cb === 'function' && typeof cb.then === 'function') {
            this.middleware.push(cb);
        }
    }

    run(res, req) {
        for(let i = 0;i < this.middleware.length;i++) {
            if (this.middleware.length > 1) {
                this.middleware[i].call({ ctx: this.ctx }, this.ctx, this.middleware[i + 1]);
            }
        }
    }

    end() {

    }

    listen(port) {
        const server = http.createServer((res, req) => {
            this.ctx.resquest = res;
            this.ctx.response = req;
            this.ctx.method = request.method;
            this.ctx.url = request.url;
            this.run(res, req);
        });
        server.listen(port || 3001);
    }

    callback(cb) {

    }
}

module.exports = Koa;
