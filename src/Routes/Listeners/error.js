module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message,
        },
    });
};