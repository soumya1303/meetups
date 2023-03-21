import React from "react";
import {useRouter} from "next/router";
import Layout from "../../components/layout/Layout";
import meetUpMaster from "../../components/meetupdata/meetups";
import MeetupItemDetails from "../../components/meetups/MeetupItemDetails";
import {MongoClient, ObjectId} from "mongodb";


const Meetup = (props)=>{

    /*
    const router = useRouter();
    const meetUpId = router.query.meetupId;
    */

    return (<Layout>
                <MeetupItemDetails meetupItem = {JSON.parse(props.meetUpItem)}/>
            </Layout>)
}

export default Meetup;

const getStaticPaths = async (context)=>{

    const client = await MongoClient.connect("mongodb+srv://db-user:password0@cluster0.9sys7.mongodb.net/meetupDB?retryWrites=true&w=majority");    
    
    const db = client.db("meetupDB");
    
    const collection = db.collection("meetups");

    const meetUps = await collection.find({}, {}).toArray();
    
    const meetupArr=[];
    meetUps.forEach((e)=>{
        meetupArr.push(e._id.toHexString());
        
    })

    console.log(meetupArr);
    
    // return ({
    //     fallback:false,
    //     paths: meetupArr.map((e)=>{
    //         params:{meetupId:e.toString()}
    //     })
    // })

    client.close();
    
    return({
        paths:[
            {params:{meetupId:"6418ef79c9444745a0f81a8f"}},
            {params:{meetupId:"6418efe3c9444745a0f81a91"}},
            {params:{meetupId:"6418f01bc9444745a0f81a93"}},
            {params:{meetupId:"6418f046c9444745a0f81a95"}}
        ],
        fallback:false
    })

}

const getStaticProps = async (context)=>{

    /*
    const meetUpId = context.params.meetupId;
    const meetUp = meetUpMaster.find((e)=>{
        if (e.id.toString()===meetUpId){
            return e
        }
    });
    */

    const client = await MongoClient.connect("mongodb+srv://db-user:password0@cluster0.9sys7.mongodb.net/?retryWrites=true&w=majority");    
    
    const meetupItemId = new ObjectId(context.params.meetupId);
    
    const db = client.db("meetupDB");
    
    const collection = db.collection("meetups");

    const meetupItem = await collection.findOne({_id: meetupItemId});

    client.close();

    return {
        props:{
            meetUpItem : JSON.stringify(meetupItem)
        }
    }
}

export {getStaticProps, getStaticPaths};