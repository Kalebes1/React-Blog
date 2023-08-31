import {Router} from 'express'
import * as BlogController from '../controllers/blog.controllers.js'
import multer from 'multer'


const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images")
    },
    filename:(req,file,cb)=>{
        cb(null, req.body.name)
    }
});

const router = Router()

const upload = multer({storage:storage});



// -----  USERS ROUTERS  -----

//REGISTER
router.post("/api/auth/register",BlogController.register)

//LOGIN
router.post("/api/auth/login",BlogController.login)

//UPDATE
router.put("/api/users/:id",BlogController.update)

//DELETE
router.delete("/api/users/:id",BlogController.deleteOne)

//GET USER
router.get("/api/users/:id",BlogController.getUser)


// -----  POSTS ROUTERS  -----

//CREATE POST
router.post("/api/posts/",BlogController.createPost)

//UPDATE POST
router.put("/api/posts/:id",BlogController.updatePost)

//DELETE POST
router.delete("/api/posts/:id",BlogController.deletePost)

//GET POST
router.get("/api/posts/:id",BlogController.getPost)

//GET ALL POST
router.get("/api/posts/",BlogController.getAllPosts)

// -----  CATEGORIES ROUTERS  -----

//CREATE CATEGORY
router.post("/api/categories/",BlogController.createCategory)

//GET ALL CATEGORIES
router.get("/api/categories/",BlogController.getAllCategories)

//UPLOAD
router.post("/api/upload/",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})


export default router;