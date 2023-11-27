module.exports = requireFilter = (req, res, next)=>{
    if(!req.query.age){
        res.send("Provide the age")
    }
    else if(req.query.age<18){
        res.send("you cannot access the page")
    }
    else{
        next()
    }
    
}