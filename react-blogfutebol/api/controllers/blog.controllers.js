import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import { createError } from '../utils/error.js';



// -----  USERS ROUTERS  -----

export const register =  async (req, res)=>{

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })
    try{

    const user = await newUser.save();
    res.status(200).json(user);

    res.data && window.location.replace("/login");

    }catch(err){

        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json(err)
        }else{
            res.status(500).json(err)
            console.log(err)
        }

       
    }
}

export const login = async (req, res, next)=>{

    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json("Usuário não existe!")
    
        const validated = await bcrypt.compare(
        req.body.password, 
        user.password
        );
        if(!validated)
         return res.status(400).json("Usuário ou Senha Incorretos!");

        const { password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
}

export const update = async (req, res)=>{
    if(req.body.userId === req.params.id){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new: true});
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("You can update only your account!")
    }
    
}

export const deleteOne = async (req, res)=>{
    if(req.body.userId === req.params.id){

        const user = await User.findById(req.params.id);
        
        if(!user) return res.status(404).json("User not found!");
        try{
            await Post.deleteMany({username: user.username})
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted!")
         }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(401).json("You can delete only your account!")
    }
}



export const getUser = async (req, res)=>{

    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
    
}




// -----  POSTS ROUTERS  -----

export const createPost = async (req, res)=>{

   const newPost = new Post(req.body)
   try{
        const savedPost = await newPost.save();
        res.status(200 ).json(savedPost)
   }catch(err){
     res.status(500).json(err)
   }
}


export const updatePost = async (req, res)=>{

    try{
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                    }, {new: true});
                    res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("You can update only your post");
        }
    }catch(err){
            res.status(500).json(err)
    }
}


export const deletePost = async (req, res)=>{

    try{
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.delete()
                 res.status(200).json("Post has been delete!");
            } catch (err) {
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("You can delete only your post");
        }
    }catch(err){
            res.status(500).json(err)
    }
 
    
}

export const getPost = async (req, res)=>{

    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
    
}

export const getAllPosts = async (req, res)=>{

    const username = req.query.user;
    const catName = req.query.cat;

    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
    
}


// -----  CATEGORIES ROUTERS  -----


export const createCategory = async (req, res)=>{
    const newCat = new Category(req.body); 
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err)
    }
    
}

export const getAllCategories = async (req, res)=>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err)
    }
    
}


