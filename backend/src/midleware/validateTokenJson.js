const jwt = require( "jsonwebtoken" );
const { token } = require("morgan");

module.exports = function(req,res,next){
    console.log("---token--->",
    // req.body.token, req.query.token, 
    req.headers['authorization']);
    const bearerHeader = req.body.token || req.query.token || req.headers['authorization'];
   
        console.log("bearerHeader in validetior----->",bearerHeader)
    
    if(typeof bearerHeader !== 'undefined')
    {
      
        // const bearer = bearerHeader.split(' ');
        // const token=bearer[1];
        const token =bearerHeader;
        console.log("token in validatior--->",token)

        jwt.verify(token, process.env.JWT_SECRET ,(err,authData)=>{
            if(err)
            {
                // res.json({result:err})
                console.log("error of jwt verify--->",err);
                return res.json( {
                    success: false,
                    message: "Failed to authenticate token.",
                } );
            }else{
                next();
            }
        })
    }
    else{
        res.send({"result":"Token not provied"});
    }
}