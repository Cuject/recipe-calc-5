import { json } from "@sveltejs/kit";
import { sha256, sha224 } from 'js-sha256';
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 

export async function POST(RequestEvent){
    const { params } = RequestEvent;
    //const { user, password } = params;

    const { user, password } = await request.json()

    
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME);

    const users = await db.collection("users").find().toArray();
    const user_emails = users.map((user_email) => {return user_email.email})
    const user_hashes = users.map((user_hash) => {return user_hash.hash})

    

    if (!user || !password) {
        return json({message: "Missing email or password", logged_in: false, user: user})
    }
    
    if(!user_emails.includes(user)){

        return json({message: "User doesn't exist", logged_in: false, user: user})

        }else if(sha224(user+password) === user_hashes[user_emails.indexOf(user)]){

            return json({message: 'Logged in', logged_in: true, user: user})
           //(email);
        }else{

        return json({message: "Incorrect email or password", logged_in: false, user: user})
    }

    return json({message: 'Logged in', logged_in: true, user: user})

    //return json({message: "Log In", user:user, password:password, emails: user_emails, hashes: user_hashes})

}