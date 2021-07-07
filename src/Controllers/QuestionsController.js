const { Questions, Users } = require('../Models')
module.exports = {
    async index(req, res, next) {
        try {
            const response = await Questions.find();
            res.status(200).send({
                "Questions": response,
                "Status": 'OK'
            })
        } catch (e) {
            next(e)
        }
    },

    async details(req, res, next) {
        try {
            let { chatId } = req.params;

            if (!chatId) {
                const error = new Error('_ID not specified');
                error.status = 400;
                next(error);
            }

            let response = await Questions.find({ chatId }).sort({ createdAt: 1 }).lean();
            res.status(200).send({
                "Questions": response,
                "Status": "OK"
            })
        } catch (e) {
            next(e);
        }
    },

    async createQuestion(req, res, next) {
        try {
            const { chatId, Points, NumOfQuestion } = req.body;
            Users.findOne({ chatId }, (err, user) => {
                if (err) {
                    next(err)
                } else if (!user) {
                    res.status(200).send({
                        "Message": "User not exists",
                        "Type": 0,
                        "Status": "OK"
                    });
                } else {
                    for(let key in user.answered){
                        if(user.answered[key] == NumOfQuestion){
                            return res.status(200).send({
                                "Type": 1,
                                "Status": "OK"
                            });
                        }
                    }

                    user.points = new Number(user.points) + new Number(Points);
                    user.answered.push(NumOfQuestion)
                    
                    let data = { chatId, Points, NumOfQuestion }

                    Questions.create(data, (err, data) => {
                        if (err) {
                            next(err)
                        } else {
                            Users.findByIdAndUpdate(user._id, user, (err, data) => {
                                if (err) {
                                    next(err)
                                } else {
                                    res.status(200).send({
                                        "User": data,
                                        "Type": 2,
                                        "Status": "OK"
                                    });
                                }
                            })
                        }
                    })
                }
            })
        } catch (e) {
            next(e)
        }
    }
}