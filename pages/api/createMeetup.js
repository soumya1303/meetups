const mongoose = require("mongoose");

const handler = async (req, res)=>{

    await mongoose.connect("mongodb+srv://db-user:password0@cluster0.9sys7.mongodb.net/meetupDB?retryWrites=true&w=majority");

    const Meetup = mongoose.models.Meetup || mongoose.model("Meetup", new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    }))

    const meetUpItem = new Meetup({
        title:req.body.title,
        image:req.body.image,
        address:req.body.address,
        description:req.body.description
    });

    try {
        const resp = await meetUpItem.save();

        mongoose.connection.close();

        if (!resp.ok){
            throw new Error("Error in saving meetup");
        }
        res.send( new Response({msg:"Meetup saved successfully"}));

    } catch (error) {
        res.send( new Response({msg:error.message}));
    }

}

export default handler;

