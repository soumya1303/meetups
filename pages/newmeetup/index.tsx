import React from "react";
import {useRouter} from "next/router";
import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = ()=>{

    const router = useRouter();

    const addMeetup= async (meetUpObj)=>{

        try {
            const resp = await fetch("/api/createMeetup", {
                method:"POST",
                body:JSON.stringify(meetUpObj),
                headers:{
                    "Content-Type": "application/json"
                }
            });
    
            if (!resp.ok){
                throw new Error("Error in saving meetUp");
            }
            
            const respData = await resp.json();
            console.log(respData);
            router.push("/");
            
        } catch (error) {
            console.log(error.message); 
        }
        
    }

    return (<Layout>
                <NewMeetupForm onAddMeetup={addMeetup}></NewMeetupForm>
            </Layout>
            )
}

export default NewMeetup;