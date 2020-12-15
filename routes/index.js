const router = require("express").Router()
const Controller = require("../controllers/Controller")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/googleLogin", Controller.googleLogin)

router.use(authentication)
router.post("/tasks", Controller.addTask)
router.post("/categories", Controller.newCategory)
router.put("/categories/:id", Controller.updateCategoryName)

router.get("/tasks", Controller.getAllTask)
router.put("/tasks/:id", authorization, Controller.updateTask)
router.patch("/tasks/:id", authorization, Controller.updateCategory)
router.delete("/tasks/:id", authorization, Controller.deleteTask)
router.delete("/categories/:id", Controller.deleteCategory)


module.exports = router