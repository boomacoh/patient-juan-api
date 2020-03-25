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
        console.log(err);
        // return res.status(statusCode).send(err.errors);
        return res.status(statusCode).send(err);
    };
}

function handleErrorMsg(res, statusCode, errorMsg) {
    return res
        .status(statusCode || 200)
        .json(errorMsg ? errorMsg : 'OK!');
}

module.exports = { handleEntityNotFound, respondWithResult, handleError, handleErrorMsg };