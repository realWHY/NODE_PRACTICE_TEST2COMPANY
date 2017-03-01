
module.exports = (app, passport) => {
    app.get('/', function(req, res, next){
        res.render('index',{title:'Home Page'});
        next();
    }) 
    
    app.get('/signup',(req,res)=>{
        res.render('user/signup',{title:'Sign Up'});
        next();
    })
    
     app.get('/login',(req,res)=>{
        res.render('user/login',{title:'LOG IN'});
        next();
    })
    
}