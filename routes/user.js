
module.exports = (app, passport) => {
    app.get('/', function(req, res, next){
        res.render('index',{title:'Home Page'});
        next();
    }) ;
    
    app.get('/signup',(req,res)=>{
        console.log('listening ........signup');
        var errors = req.flash('error');
        res.render('user/signup',{title:'Sign Up', messages: errors, hasErrors:
        errors.length>0});
    });

    
    app.post('/signup', signupValidate, passport.authenticate('local.signup',{//first validate, if pass, the next enable authenticate to execute
        successRedirect:'/',
        failureRedirect:'/signup',
        failureFlash: true // when the error message is added, it willbe dispayes to user
    }));//local.signup name from passport
    
     app.get('/login',(req,res)=>{
         console.log('listening ........login');
        var errors = req.flash('error');
        res.render('user/login',{title:'LOG IN', messages: errors, hasErrors:
        errors.length>0});
    });
    
     app.post('/login', loginValidate, passport.authenticate('local.login',{//first validate, if pass, the next enable authenticate to execute
        successRedirect:'/home',
        failureRedirect:'/login',
        failureFlash: true // when the error message is added, it willbe dispayes to user
    }));//local.signup name from passport
    
     app.get('/home',(req,res)=>{
        res.render('user/home');
    });
}

function signupValidate(req,res,next){
    req.checkBody('fullname', 'Fullname is required').notEmpty();//validator methor
    req.checkBody('fullname', 'Fullname must not less than five').isLength({min:3});
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must not less than five').isLength({min:5});
    
    var errors = req.validationErrors(); // return array
    if(errors){
        var messages = [];
        errors.forEach((error)=>{
            messages.push(error.msg);
        });
        req.flash('error',messages);
        res.redirect('/signup');
    }
    else{
        return next();
    }
}

function loginValidate(req,res,next){
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must not less than five').isLength({min:5});
    
    var errors = req.validationErrors(); // return array
    if(errors){
        var messages = [];
        errors.forEach((error)=>{
            messages.push(error.msg);
        });
        req.flash('error',messages);
        res.redirect('/login');
    }
    else{
        return next();
    }
}