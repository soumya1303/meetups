import React from "react";
import MeetUpList from "../components/meetups/MeetupList";
//import meetUpMaster from "../components/meetupdata/meetups";
import Layout from "../components/layout/Layout";
//import mongoose from "mongoose";
import Head from "next/head";
import {MongoClient, ObjectId} from "mongodb";

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

    const client = await MongoClient.connect("mongodb+srv://db-user:password0@cluster0.9sys7.mongodb.net/meetupDB?retryWrites=true&w=majority");    
    
    const db = client.db("meetupDB");
    
    const collection = db.collection("meetups");

    const meetUps = await collection.find({}, {}).toArray();

    client.close();

    return {
        props:{
            meetups:JSON.stringify( meetUps)
        },
        revalidate:3600
    }
}

export {getStaticProps}