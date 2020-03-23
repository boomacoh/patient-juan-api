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
        return res.status(statusCode).send(err.errors);
    };
}

function handleErrorMsg(res, statusCode, errorMsg) {
    console.log(JSON.stringify(res));
    return res
        .status(statusCode || 200)
        .json(errorMsg ? errorMsg : 'OK!');
}

module.exports = { handleEntityNotFound, respondWithResult, handleError, handleErrorMsg };