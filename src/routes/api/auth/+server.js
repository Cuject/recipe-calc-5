import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';

export async function GET(RequestEvent){
    
    return json({message: "Log In"})

}