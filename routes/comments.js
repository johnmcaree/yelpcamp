var express=require("express");
var router=express.Router({mergeParams:true});
var Comment=require("../models/comment");
var Campground=require("../models/campground");
var middlewareObj=require("../middleware");


router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
//find canmpground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        console.log(err);
        else
        res.render("comments/new",{campground:campground});
    });
})
//add a new comment
router.post("/",middlewareObj.isLoggedIn,function(req,res){
 
   Campground.findById(req.params.id, function(error, campground){
            if(error)
            console.log(error);
            else
              Comment.create(req.body.comment,function(err, comment){
                  if(err){
                    req.flash("error","Something went wrong");
                  }
                  else{
                      comment.author.id=req.user._id;
                      comment.author.username=req.user.username;
                      comment.save();
                      campground.comments.push(comment);
                      campground.save();
                      console.log(comment);
                      req.flash("success","Comment sucessfully created");
                      res.redirect('/campgrounds/' + campground._id);
                  }
              });
        });
    });
    
router.get("/:comment_id/edit",function(req,res){
        Comment.findById(req.params.comment_id,function(err, foundComment) {
            if(err)
            res.redirect("back")
            else
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        });
    });
    
//comments update
router.put("/:comment_id", middlewareObj.checkCommentOwnership,function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log(err);
            console.log("there has been an error");
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
     });
});

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           res.redirect("back");
       }
       else{
           req.flash("success","Comment sucessfully deleted!");
           res.redirect("/campgrounds/"+ req.params.id);
       }
   });
});
//middleware islogged in
module.exports=router;