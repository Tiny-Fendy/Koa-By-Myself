class Context {
    constructor(context, req, res) {
        Object.assign(this, context);
        this.url = req.url;
        this.method = req.method;
        this.headers = req.headers;
        this.request = req;
        this.response = res;
        this.cookies = {
            set(key, value, config) {

            },
            get(key) {

            }
        };
    }

    render() {}
}

module.exports = Context;
