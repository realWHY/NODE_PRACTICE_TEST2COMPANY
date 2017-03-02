
module.exports = (app, passport) => {
    app.get('/', function(req, res, next){
        res.render('index',{title:'Home Page'});
        next();
    }) ;
    
    app.get('/signup',(req,res)=>{
        console.log('listening ........signup');
        res.render('user/signup',{title:'Sign Up'});
    });
    
    app.post('/signup', passport.authenticate('local.signup',{
        successRedirect:'/',
        failureRedirect:'/signup',
        failureFlash: true // when the error message is added, it willbe dispayes to user
    }));//local.signup name from passport
    
     app.get('/login',(req,res)=>{
        res.render('user/login',{title:'LOG IN'});
    });
    
}