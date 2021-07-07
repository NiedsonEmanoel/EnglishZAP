const { Preferences } = require('../Models');
const moment = require('moment');


module.exports = {
    async index(req, res, next) {
        try {
            let response = await Preferences.find();
            if (response.length == 0) {
                res.status(200).send({
                    "Message": "I can't find the configs",
                    "Type": 0,
                    "Status": "No Content"
                })
            } else {
                res.status(200).send({
                    "Preferences": response[0],
                    "Type": 1,
                    "Status": "OK"
                })
            }
        } catch (e) {
            next(e)
        }
    },

    async createPreference(req, res, next) {
        try {
            let response = await Preferences.find();
            if (response.length == 0) {
                let QuestionOneStart = moment().toDate()
                let QuestionOneEnd = moment(QuestionOneStart).add(5, 'minutes').toDate()
                let data = { QuestionOneStart, QuestionOneEnd }
                Preferences.create(data, (err, prefer) => {
                    if (err) {
                        next(err)
                    }
                    res.status(200).send({
                        prefer,
                        "TYPE": 1
                    })
                })
            } else {
                res.status(400).send({
                    "Message": "Bad request, use PUT",
                    "Status": "Bad Request"
                })
            }
        } catch (e) {
            next(e)
        }
    },

    async tapToNext(req, res, next) {
        try {
            let response = await Preferences.find();
            if (response.length == 0) {
                res.status(400).send({
                    "Message": "Bad request, use POST",
                    "Status": "Bad Request"
                })
            } else {
                let questionNumber = response[0].QuestionNow + 1
                response[0].QuestionNow = questionNumber

                switch (questionNumber) {
                    case 2:
                        let QuestionTwoStart = moment().toDate();
                        let QuestionTwoEnd = moment(QuestionTwoStart).add(5, 'minutes').toDate();

                        response[0].QuestionTwoStart = QuestionTwoStart;
                        response[0].QuestionTwoEnd = QuestionTwoEnd;
                        break;

                    case 3:
                        let QuestionThreeStart = moment().toDate();
                        let QuestionThreeEnd = moment(QuestionThreeStart).add(5, 'minutes').toDate();

                        response[0].QuestionThreeStart = QuestionThreeStart;
                        response[0].QuestionThreeEnd = QuestionThreeEnd;
                        break;

                    case 4:
                        let QuestionFourStart = moment().toDate();
                        let QuestionFourEnd = moment(QuestionFourStart).add(5, 'minutes').toDate();

                        response[0].QuestionFourStart = QuestionFourStart;
                        response[0].QuestionFourEnd = QuestionFourEnd;
                        break;

                    case 5:
                        let QuestionFiveStart = moment().toDate();
                        let QuestionFiveEnd = moment(QuestionFiveStart).add(5, 'minutes').toDate();
                        response[0].QuestionFiveStart = QuestionFiveStart;
                        response[0].QuestionFiveEnd = QuestionFiveEnd;
                        break;

                    case 6:
                        let QuestionSixStart = moment().toDate();
                        let QuestionSixEnd = moment(QuestionSixStart).add(5, 'minutes').toDate();
                        response[0].QuestionSixStart = QuestionSixStart;
                        response[0].QuestionSixEnd = QuestionSixEnd;
                        break;

                    case 7:
                        let QuestionSevenStart = moment().toDate();
                        let QuestionSevenEnd = moment(QuestionSevenStart).add(5, 'minutes').toDate();
                        response[0].QuestionSevenStart = QuestionSevenStart;
                        response[0].QuestionSevenEnd = QuestionSevenEnd;
                        break;

                    case 8:
                        let QuestionEightStart = moment().toDate();
                        let QuestionEightEnd = moment(QuestionEightStart).add(5, 'minutes').toDate();
                        response[0].QuestionEightStart = QuestionEightStart;
                        response[0].QuestionEightEnd = QuestionEightEnd;
                        break;

                    case 9:
                        let QuestionNineStart = moment().toDate();
                        let QuestionNineEnd = moment(QuestionNineStart).add(5, 'minutes').toDate();
                        response[0].QuestionNineStart = QuestionNineStart;
                        response[0].QuestionNineEnd = QuestionNineEnd;
                        break;

                    case 10:
                        let QuestionTenStart = moment().toDate();
                        let QuestionTenEnd = moment(QuestionTenStart).add(5, 'minutes').toDate();
                        response[0].QuestionTenStart = QuestionTenStart;
                        response[0].QuestionTenEnd = QuestionTenEnd;
                        break;
                }
                Preferences.findByIdAndUpdate(response[0]._id, response[0], (err, data) => {
                    if (err) {
                        next(err)
                    }
                    res.status(200).send({
                        data,
                        "Status": "OK"
                    })
                })
            }
        } catch (e) {
            next(e)
        }
    },

    async ableTo(req, res, next) {
        try {
            let response = await Preferences.find();
            if (response.length != 0) {
                response[0].isAbleToRegister = !response[0].isAbleToRegister;
                Preferences.findByIdAndUpdate(response[0]._id, response[0], (err, data)=>{
                    if(err){
                        next(err)
                    }else{
                        res.status(200).send({
                            "Able": response[0].isAbleToRegister,
                            "Status": "OK"
                        })
                    }
                })
            } else {
                res.status(400).send({
                    "Message": "Bad request, use POST",
                    "Status": "Bad Request"
                })
            }            
        } catch (e) {
            next(e);
        }
    }
}