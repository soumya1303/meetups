import React from "react";
import MeetUpList from "../components/meetups/MeetupList";
import meetUpMaster from "../components/meetupdata/meetups";
import Layout from "../components/layout/Layout";
import mongoose from "mongoose";
import Head from "next/head";

const MeetUps = (props)=>{
    return (<Layout>
                <Head>
                    <meta name="description" content="online meetup and events" />
                </Head>
                <MeetUpList meetups={JSON.parse(props.meetups)}></MeetUpList>
            </Layout>)
}

export default MeetUps;

const  getStaticProps =  async ()=>{

    await mongoose.connect("mongodb+srv://db-user:password0@cluster0.9sys7.mongodb.net/?retryWrites=true&w=majority");

    const Meetup = mongoose.model("Meetup", new mongoose.Schema({
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
    }));

    const meetUps = await Meetup.find({}, {}); 
    
    mongoose.connection.close();

    //console.log(meetUps);

    return {
        props:{
            meetups:JSON.stringify(meetUps)
        },
        revalidate:3600
    }
}

export {getStaticProps}