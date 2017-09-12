var mongoose    =require("mongoose"),
Campground      =require("./models/campground"),
Comments        =require("./models/comment");

var data=   [
    
    {
        name:"Clouds rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description:"Quisque sit amet suscipit dui. Proin cursus quam non leo pulvinar, sed dignissim mi tempus. Ut malesuada porttitor nulla, vitae suscipit lorem condimentum ac. Nam facilisis diam vitae diam lacinia dapibus. Quisque sit amet purus tempus, fermentum leo ut, gravida turpis. Donec ultricies diam sapien, a accumsan odio scelerisque id. Proin gravida nisi mi, nec dictum purus varius eget. Nulla laoreet magna ex. Cras et dui in nulla accumsan dictum. Nam ultrices sed sem a dignissim. Quisque ac suscipit libero. Donec tincidunt augue ut molestie tincidunt. Maecenas nec nisl tortor."
    },
    {
        name:"Dessert mesa",
        image:"https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description:"Quisque sit amet suscipit dui. Proin cursus quam non leo pulvinar, sed dignissim mi tempus. Ut malesuada porttitor nulla, vitae suscipit lorem condimentum ac. Nam facilisis diam vitae diam lacinia dapibus. Quisque sit amet purus tempus, fermentum leo ut, gravida turpis. Donec ultricies diam sapien, a accumsan odio scelerisque id. Proin gravida nisi mi, nec dictum purus varius eget. Nulla laoreet magna ex. Cras et dui in nulla accumsan dictum. Nam ultrices sed sem a dignissim. Quisque ac suscipit libero. Donec tincidunt augue ut molestie tincidunt. Maecenas nec nisl tortor."
    },
    {
        name:"Canyon Floor",
        image:"https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description:"Quisque sit amet suscipit dui. Proin cursus quam non leo pulvinar, sed dignissim mi tempus. Ut malesuada porttitor nulla, vitae suscipit lorem condimentum ac. Nam facilisis diam vitae diam lacinia dapibus. Quisque sit amet purus tempus, fermentum leo ut, gravida turpis. Donec ultricies diam sapien, a accumsan odio scelerisque id. Proin gravida nisi mi, nec dictum purus varius eget. Nulla laoreet magna ex. Cras et dui in nulla accumsan dictum. Nam ultrices sed sem a dignissim. Quisque ac suscipit libero. Donec tincidunt augue ut molestie tincidunt. Maecenas nec nisl tortor.bla bla bla"
    }
    
    ];
    
    function seedDB(){
        //remove all campgrounds
        Campground.remove({},function(err){
            if(err)
            console.log(err);
            
            console.log("Succesfully removed all campgrounds!");
            //add campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //             if(err)
        //             console.log(err);
        //             else
        //             console.log("Added campground");
        //             //add comments
        //             Comments.create(
        //                 {
        //                     title:"This place is great but I wish there was internet",
        //                     author:"Homer"
                        
        //             },function(err,comment)
                    
        //             {
        //                 if(err){console.log(err);}
        //                 else
        //                 {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log(campground);
        //                 }
        //             });
                    
                    
        //         });
        //     });
            
        });
        
    }
    
    module.exports=seedDB;


