var express   =require("express"),
app          =express(),
bodyParser   =require("body-parser"),
mongoose     =require("mongoose"),
Campground   =require("./models/campground"),
seedDB       =require("./seeds"),
Comment      =require("./models/comment"),
LocalStrategy =require("passport-local"),
passport      =require("passport"),
methodOverride=require("method-override"),
User          =require("./models/user"),
flash        =require("connect-flash");

mongoose.connect("mongodb://crusty:crusty999@ds131914.mlab.com:31914/crusty501");
//mongoose.connect("mongodb://localhost/yelp_camp_ver11");

var commentRoutes   =require("./routes/comments"),
campgroundRoutes    =require("./routes/campgrounds"),
indexRoutes         =require("./routes/index");

app.use (methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
//seedDB();//seed the database
//comment out when manually adding comments for user association

//Passport configuration
app.use(require("express-session")({
    secret:"To be or not to be that is the question bills fav quote",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp app ver 11.0 started...")
});