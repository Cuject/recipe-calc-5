/*import { redirect, fail } from '@sveltejs/kit';
import { sha256, sha224 } from 'js-sha256';

import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 
*/
export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user , password} = params;
    
    /*client = new MongoClient(SECRET_URI);
    db = client.db(DB_NAME);

    const users = await db.collection("users").find().toArray();
    const user_emails = users.map((user_email) => {return user_email.email})
    const user_hashes = users.map((user_hash) => {return user_hash.hash})

    /*

    if (!email || !password) {
        return json({message: "Missing email or password", logged_in: false, user: user})
    }
    
    if(!user_emails.includes(email))

        return json({message: "User doesn't exist", logged_in: false, user: user})

        }else if(sha224(email+password) === user_hashes[user_emails.indexOf(email)]){

            return json({message: 'Logged in', logged_in: true, user: user})
           //(email);
        }else{

            return json({message: "Incorrect email or password", logged_in: false, user: user})
    }

    return json({message: 'Logged in', logged_in: true, user: user})*/
    return json({message: "Log In", user:user, password:password})

}