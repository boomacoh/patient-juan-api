const sequelizeError = require('sequelize').BaseError;

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        if(err instanceof sequelizeError){
            err = err.errors[0].message
        }
        return res.status(statusCode).send(err);
    };
}

function handleErrorMsg(res, statusCode, errorMsg) {
    return res
        .status(statusCode || 500)
        .json(errorMsg ? errorMsg : 'Error!');
}

module.exports = { handleEntityNotFound, respondWithResult, handleError, handleErrorMsg };