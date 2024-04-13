import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, command, recipeName } = params;
    
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipeIndex = recipes_names.indexOf(recipeName);

    if (command == "add"){
        if(recipeName == "" || recipes_names.includes(recipeName)){ 
            return json({message: recipeName + " already exists"}, {status: 201});
        }else{
            db.collection("recipes").insertOne({user:user, name:recipeName, food_items:[] });
        }
        return json({user: user, command: command, message: "added " + String(recipeName)})
    }

    if (command == "edit"){
        if(recipeName == "" || recipes_names.includes(recipeName)){ 
            return json({message: "already exists or empty string", name:recipes_names[recipeIndex]}, {status: 201});
        }else{
            db.collection("recipes").updateOne({user:user, name:recipes_names[recipeIndex] }, {$set : {name:recipeName}});
        }
    
        return json(
            {
                user:user, name:recipeIndex
            }
        );

        //return json({user: user, command: command, message: "changed " + String(recipeName)})
    }

    if (command == "delete"){
        return json({user: user, command: command, message: "deleted " + String(recipeName)})
    }


    return json({user: user, command: command, recipeName: recipeName})



}