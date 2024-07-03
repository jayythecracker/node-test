const jwt = require('jsonwebtoken');
const validateToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try{
        token = token.split(' ')[1];
        const decrypt = jwt.verify(token, process.env.SECRET);
        
        req.body.user=decrypt;
        next();
    }catch(e){
        res.json({msg:e})
    }
    
    //next();
  }else{
    res.send('No token found!')
  }
};
module.exports=validateToken;
