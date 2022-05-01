require("../model/register.model");
const express = require("express");
const register = require("../controller/controller");
const validatior = require("../midleware/validateTokenJson");
const router = express.Router();
const multer  = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage});
router.post('/login', register.login);
router.post('/register', upload.single('file'), register.register);
router.get('/user/:id',register.User);
router.put('/editUser/:id',register.editUser);
router.post('/profileUpdate/:id',upload.single('file'),register.profileUpdate);
router.get('/listUser',register.listUser);
router.delete('/deleteUser/:id',register.deleteUser);
router.post('/findUser',register.findUser);
router.post('/filesUpload', upload.single('file'),register.filesUpload);

module.exports = router;