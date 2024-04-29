import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { searchTerm } = params;


    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const fct = await db.collection('fct').find().toArray()

    const searchfoodItems = fct.map((foodItem) => ({
        ...foodItem,
        searchTerms: `${foodItem.food_ID} ${foodItem.food_ND} ${foodItem.com_Name} ${foodItem.edi_Portion}`
        }));
    
    const food_NDs  = fct.map((item) => {return item.food_ND})
    const sci_Names = fct.map((item) => {return item.sci_Name})




    

    return json({
        food_NDs
    })
}