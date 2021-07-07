const mongoose = require('mongoose')
module.exports = {
    Connect() {
        mongoose.connect(process.env.MONGO, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        }, (err) => {
            if (err) {
                console.info('- MongoDB not connected.', err);
                this.Connect()
            } else {
                console.info('- MongoDB connected.');
                mongoose.Promise = global.Promise;
            }
        });
    }
};