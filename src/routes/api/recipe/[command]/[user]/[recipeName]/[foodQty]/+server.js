import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, command, recipeName, foodQty } = params;
    
    //const client = new MongoClient(SECRET_URI)
    //const db = client.db(DB_NAME)
    //const recipes = await db.collection('recipes').find({user: user}).toArray()
    if (command == "add"){
        return json({user: user, command: command, message: "added " + String(foodQty)})
    }

    if (command == "edit"){
        return json({user: user, command: command, message: "changed " + String(foodQty)})
    }

    if (command == "delete"){
        return json({user: user, command: command, message: "deleted " + String(foodQty)})
    }



    return json({user: user, command: command, recipeName: recipeName, foodQty: foodQty})



}