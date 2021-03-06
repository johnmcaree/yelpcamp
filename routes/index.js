var express=require("express");
var router=express.Router();

var passport=require("passport");
var User=require("../models/user");

router.get("/",function(req, res) {
    res.render("landing");
})

router.get("/register",function(req, res) {
        res.render("register");
    });
    
    //sign up logic
router.post("/register",function(req, res) {
        var newUser=new User({username:req.body.username});
        User.register(newUser,req.body.password,function(err,user){
            if(err){
                req.flash("error",err.message);
                console.log(err);
                res.redirect("/register");
            }
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to Yelpcamp " + user.username +" !!!");
                res.redirect("/campgrounds");
            })
        });
    })

//show login
router.get("/login",function(req, res) {
    res.render("login");
})
router.post("/login",passport.authenticate("local",
        {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        
        }), 
        function(req, res) {}
    );
    
router.get("/logout",function (req,res){
    req.logout();
    req.flash("success","successfully logged you out");
    res.redirect("/campgrounds");
});

module.exports=router;