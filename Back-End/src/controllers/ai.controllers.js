const aiServices=require('../services/ai.service') //fetch generatContent function for passing prompt 

module.exports.getReview =async (req,res) => {
    const code=req.body.code;
    
    if(!code){
        return res.status(400).send("Prompt is require");
    }
    
    
    const response=await aiServices(code);
    res.send(response);

}