const { Task } = require("../models")

module.exports = async (req, res, next) => {
    try {
        console.log("masuk authorized");
        const task = await Task.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!task) {
            throw {
                status: 404,
                message: "error not found"
            }
        } else {
            if (task.UserId === req.loggedInUser.id) {
                console.log("authorized");
                next()
            } else {
                throw {
                    status: 401,
                    message: "sory, you are not authorized to access this page"
                }
            } 
        }
    } catch (err) {
        next(err)
    }
}