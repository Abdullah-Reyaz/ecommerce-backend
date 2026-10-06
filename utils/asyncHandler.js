// AsyncHandler is a middleware that catches th error of express so that we dont need to wrap try catch block 
// It acts as wrapper around a function


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch(next);
    };
};

export { asyncHandler };