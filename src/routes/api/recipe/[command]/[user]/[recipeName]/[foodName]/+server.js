import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, command, recipeName, foodName } = params;
    
    //const client = new MongoClient(SECRET_URI)
    //const db = client.db(DB_NAME)
    //const recipes = await db.collection('recipes').find({user: user}).toArray()


    return json({user: user, command: command, recipeName: recipeName, foodName: foodName})



}