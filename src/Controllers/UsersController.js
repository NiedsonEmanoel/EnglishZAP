const { Users, Preferences } = require('../Models');

module.exports = {
    async index(req, res, next) {
        try {
            const response = await Users.find().sort({ points: -1 }).lean();
            res.status(200).send({
                "Users": response,
                "Status": "OK"
            })
        } catch (e) {
            next(e)
        }
    },

    async create(req, res, next) {
        try {
            let pref = await Preferences.find();

            let isAbleToRegister;

            try {
                isAbleToRegister = pref[0].isAbleToRegister
            } catch (e) {
                console.log(e)
                isAbleToRegister = true
            }

            if (isAbleToRegister == true) {
                let { fullName, chatId } = req.body;

                let data = [];

                let User = await Users.findOne({ chatId });
                try {
                    let s = User.fullName;
                    return res.status(200).send({ "Message": "Client already been registered.", "Type": 2 });
                } catch (e) {
                    data = { fullName, chatId }
                    await Users.create(data, (err, data) => {
                        if (err) {
                            next(err)
                        }
                        res.status(200).send({ data, "Type": 0 })
                    });
                }
            } else {
                res.status(200).send({
                    "Message": "Non Able to Register",
                    "Type": 1
                })
            }
        } catch (e) {
            next(e)
        }
    }
}