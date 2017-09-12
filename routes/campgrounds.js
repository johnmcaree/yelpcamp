var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middlewareObj=require("../middleware");

router.get("/",function(req, res) {
     Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("error")
        }
        else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
        })
})



router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});



router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec
    (function(err,foundCampground){
      if(err){
          console.log(err);
          console.log("ERROR");
      }
      else{
          console.log(foundCampground);
          res.render("campgrounds/show",{campground:foundCampground});
      }
    });
});

router.post("/",middlewareObj.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,image:image, price: price, description:desc,author:author};
    var author={
        id:req.user._id,
        username:req.user.username
    }
    Campground.create(newCampground,function(error, newlyCreated){
            console.log(newlyCreated);
            if(error)
            console.log(error);
            else
            res.redirect("/campgrounds");
           
        });
    
    });
    
//EDIT CAMPGROUND ROUTE
    router.get("/:id/edit",middlewareObj.checkCampgroundOwnership,function(req, res) {
        Campground.findById(req.params.id,function(err,foundCampground){
                res.render("campgrounds/edit",{campground:foundCampground});
    });
    });
    
    
//UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req,res){
        //find and up date campground
       Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,updatedCampround){
           if(err)
           res.redirect("/campgrounds");
           else{
               res.redirect("/campgrounds/" + req.params.id);
           }
           
       });
    });
    
//DESTROY CAMPGROUND
 
    router.delete("/:id",middlewareObj.checkCampgroundOwnership,function(req, res) {
        Campground.findByIdAndRemove(req.params.id,function(err,campground){
            if(err)
                res.redirect("/campgrounds");
            else
                res.redirect("/campgrounds");
    }); 
    });
    
    

    
module.exports=router;