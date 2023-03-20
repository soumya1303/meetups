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

    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/");    
    
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

    return({
        paths:[
            {params:{meetupId:"64178a7541f5514e196e2970"}
            },
            {params:{meetupId:"64178c1441f5514e196e2972"}
            },
            {params:{meetupId:"64178d3d1a0f87da43708b36"}
            },
            {params:{meetupId:"64178f3a0e77764d01737109"}
            },
            {params:{meetupId:"64179ec81fa514d132dfb22c"}
            }
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

    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/");    
    
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