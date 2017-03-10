var Company = require('../models/company');
var async = require('async');

module.exports = (app)=>{
    app.get('/review/:id',(req,res)=>{  
        var messg = req.flash('success');
        Company.findOne({'_id':req.params.id},(err,data)=>{
            res.render('company/review',{title:'Company review', user:req.user, data:data, msg:messg, hasMsg:messg.length>0});
        })
    });
    
        app.post('/review/:id', (req, res) => {
        async.waterfall([
            function(callback){
                Company.findOne({'_id':req.params.id}, (err, result) => {
                    console.log('result',result);
                    callback(err, result);
                });
            },
            
            function(result, callback){
                Company.update({
                    '_id': req.params.id
                },
                {
                    $push: {
                        companyRating: {
                            companyName: req.body.sender,//from rating.js
                            userFullname: req.user.fullname,
                            userRole: req.user.role,
                            companyImage: req.user.company.image,
                            userRating: req.body.clickedValue,//from rating.js
                            userReview: req.body.review//from rating.js
                        }, 
                        ratingNumber: req.body.clickedValue       
                    },
                    $inc: {ratingSum: req.body.clickedValue}
                }, (err) => {
                    req.flash('success', 'Your review has been added.');
                    res.redirect('/review/'+req.params.id)
                })
            }
        ])
    });
}