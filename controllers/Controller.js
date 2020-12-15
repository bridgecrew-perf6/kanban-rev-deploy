const { User, Task, Category } = require("../models")
const { comparePass } = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GID);

class Controller {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const input = { name, email, password }
            const user = await User.create(input)
            res.status(201).json({id: user.id, email: user.email})
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                throw{
                    status: 400,
                    message: "invalid email or password"
                }
            } else if(comparePass(password, user.password)) {
                const payload = {
                    name: user.name,
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token, name: user.name })
            } else {
                throw{
                    status: 400,
                    message: "invalid email or password"
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async googleLogin(req, res, next) {
        let payload;
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            console.log(payload);
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
                .then(user => {
                    console.log("masuk1");
                    if (user) {
                        return user
                    } else {
                        return User.create({
                            name: payload.email,
                            email: payload.email,
                            password: process.env.G_PASS
                        })
                    }
                })
                .then(user => {
                    console.log("masuk2");
                    const access_token = generateToken({ email: user.email, id: user.id, name: user.name })
                    res.status(200).json({ access_token })
                })
        })
        .catch(err => {
            next(err)
        })
    }
    //==================================to table task
    static async addTask(req, res, next) { //create task - post
        try {
            const UserId = req.loggedInUser.id
            const { title, CategoryId  } = req.body
            const input = { title, UserId, CategoryId }
            const task = await Task.create(input, { 
                where: {
                    CategoryId: CategoryId
                },
                returning: true 
            })
            console.log("mdsfasdf", task);
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }
    static async getAllTask(req, res, next) { //show all task - post
        let dataTask;
        Task.findAll({include: [User, Category]})
        .then(task => {
            dataTask = task
            return Category.findAll()
        })
        .then(cat => {
            res.status(200).json({dataTask, cat})
        })
        .catch(err => {
            next(err)
        });
    }
    static async getTaskById(req, res, next) { //show all task - post
        try {
            const task = await Task.findAll({
                where: {
                    UserId: req.loggedInUser.id
                },
                include: [User, Category]
            })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }
    static async updateTask(req, res, next) { // update task - put
        try {
            const { title } = req.body
            const input = { title }
            const task = await Task.update(input, { 
                where: { 
                    id: req.params.id 
                }, 
                returning: true 
            })
            res.status(200).json(task[1][0])
        } catch (err) {
            next(err)
        }
    }   
    static async updateCategory(req, res, next) { // update category - patch
        try {
            const { CategoryId } = req.body
            const input = { CategoryId }
            const task = await Task.update(input, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            res.status(200).json(task[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async deleteTask(req, res, next) { // delete task - delete
        try {
            const task = await Task.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `task with id: ${+req.params.id}, success to deleted`})
        } catch (err) {
            next(err)
        }
    }
    //==================================to table category
    static async newCategory(req, res, next) { //create category - post
        try {
            const { categoryName } = req.body
            const input = { categoryName }
            const category = await Category.create(input, { returning: true })
            res.status(201).json(category)
        } catch (err) {
            next(err)
        }
    }
    static async updateCategoryName(req, res, next) { //update category - put
        try {
            const { categoryName } = req.body
            const input = { categoryName }
            const category = await Category.update(input, { 
                where: {
                    id: req.params.id
                },
                returning: true 
            })
            res.status(200).json(category[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async deleteCategory(req, res, next) { // delete task - delete
        try {
            const task = await Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `Category with id: ${+req.params.id}, success to deleted`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller