import { json } from "@sveltejs/kit";
import { sha256, sha224 } from 'js-sha256';
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, password } = params;
    
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME);

    const users = await db.collection("users").find().toArray();
    const user_emails = users.map((user_email) => {return user_email.email})
    //const user_hashes = users.map((user_hash) => {return user_hash.hash})

    if (!user || !password) {
        return json({message: "Missing email or password", logged_in: false, user: user})
    }
    
    if(user_emails.includes(user)){
            return json({message: "User Already Exists", logged_in: false, user: user})
        }else{
            db.collection("users").insertOne({email:user, hash:sha224(user+password)});
    }
    

    //cookies.set("user", email, {path: '/'});
   //(email)
   return json({message: "Successfully Registered", logged_in: true, user: user})



    //return json({message: "Log In", user:user, password:password, emails: user_emails, hashes: user_hashes})

}