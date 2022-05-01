const Register = require("../model/register.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    console.log("Register------>", req.body)
    const pathName = req.file.originalname;
    let payload = req.body
    payload.profile_photo = pathName;
    try{
        const user = await Register.findOne({email : req.body.email});
        if(!user){
            // Encrypt password
            payload.password = bcrypt.hashSync(req.body.password, 8);
            const register = await Register.create(payload);
            if(register){
                res.status(200)
                res.send(register);
            }
            else{
                res.status(102);
                console.log("user not registed")
            }
     }else{ 
         res.status(404);
            res.send("email alredy registed");
             res.json({
                 message:"email alredy registed"
             });
            
        }
    }catch(error){ 
        res.status(500)
    }
};

//for login validation
exports.login = async(req, res) => {
    try{
        console.log("try",req.body)
        const email = req.body.email;
        const usermail = await Register.findOne({ email : email });    
        if(usermail){
            const password = req.body.password;
            const result = bcrypt.compareSync(password, usermail.password)
            if(result){
                //creat token using jwt
                const token = await jwt.sign({email: req.body.email},process.env.JWT_SECRET,
                     {expiresIn:"30d"});
                return res.status(200).send({auth:true, token:token, userData: usermail});
            }else{
                return res.status(403).send("password does not match");
            }
        }else{
            return res.status(404).send()
        }
    }catch(error){
        console.log("catch")
        res.status(400).send("invalid Email")
        console.log(error);
    }
}


//for userdetails
exports.User = async(req,res) => {
    try{
        const id = req.params.id;
        const userdata = await Register.findById({_id : id})
        if(!req.params.id){
            res.status(500);
        }else{
            return res.status(200).send(userdata);
        }
    }catch(error){
        res.status(400).send(error);
    }

}

exports.editUser = async (req,res) =>{
    try{
        const id = req.params.id;
        const email = req.body.email;
        const user = await Register.findOne({ email : email }); 
        const password = req.body.password;
        const result = bcrypt.compareSync(password, user.password)
        if(result){
            if(req.body.password && user){
                req.body.password = bcrypt.hashSync(req.body.password, 8);
                const UpdateUser = await Register.findByIdAndUpdate( id,req.body,{new:true});
                res.status(200).send(UpdateUser);
            } else {
                res.status(404).send();
            }
        } else {
            res.status(403).send("password not matched");
        }
        
        
    }catch(errror){
        res.status(400).send(error);
    }
}


exports.profileUpdate = async(req,res) =>{
    try{
        const id = req.params.id;
        console.log(id);
        const UpdateUser = await Register.findByIdAndUpdate( id,req.body,{new:true});
        res.status(200).send(UpdateUser);
    }catch(errror){
        res.status(400).send(error);
    }
}

exports.listUser = async(req,res) =>{
    try{
        // const id = req.params.id;
        const listUser = await Register.find(); 
        res.status(200).send(listUser);
    }catch(error){
        console.log("error",error)
        res.status(400).send(error);
    }
}

exports.deleteUser = async(req,res) =>{
    try{
        const id = req.params.id;
        console.log("id of delete------>",id)
        const deleteUser = await Register.findByIdAndRemove({_id: id});
        res.status(200).send(deleteUser);
    }catch(error){
        console.log("eroor",error);
    }
}

exports.findUser = async(req,res) =>{
    try {
        console.log("req.body",req.body)
        const findUser = await Register.aggregate([
            {
                $addFields: {
                    nameFilter: {
                        $concat: ["$firstName", " ", "$lastName"],
                    }
                },
            },
            {
                $match: {
                    nameFilter: {
                        $regex: req.body.search,
                        $options: "i",
                    }
                },
            },
        ])
        console.log("forms", findUser)
        res.status(200).send(findUser)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.filesUpload = async ()=>{
    try{  
          console.log("req.body",req.body)
    }catch(error){
        console.log("log of error in catch",error)
    }
}




// exports.login = (req, res) => {
//     console.log(res.body)
//     Register.findOne({email: req.body.email})
//         .then(users => {
//             const isMatch = bcrypt.compareSync(req.body.password, users.password);
//             const token = jwt.sign({email: req.body.email}, "secretkey");
//             if (isMatch) {
//                 res.status(200).send({auth:true, token:token});
//                 return res.send(users);
//             } else {
//                 return res.status(500).send({message: "User Field Are Not Correct"});
//         }
//         }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving login."
//         });
//     });
// };