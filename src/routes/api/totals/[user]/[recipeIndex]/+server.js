import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI , DB_NAME } from '$env/static/private';



export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, recipeIndex} = params; // Should be the name of the route
    
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();

    const recipe_data = recipes_data[recipeIndex]

    const water_list = recipe_data.food_items.map((item) => {return ((item.water/100) * item.qty)})

    return json(
        recipe_data)
}



export async function POST(RequestEvent){
    const { params, request } = RequestEvent;
    const { recipeIndex, user } = params; // Should be the name of the route
    const { new_food_item } = await request.json()

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const fct = await db.collection('fct').find().toArray()

    const recipe_food_items = recipes_data[recipeIndex].food_items
    const recipe_food_IDs = recipe_food_items.map((food_name) => {return food_name.food_ID})

    if(new_food_item == "" || recipe_food_IDs.includes(new_food_item)){
        return json({message: new_food_item + "already exists"}, {status: 201});
    }else{
        db.collection("recipes").updateOne(
            {user: user, name:recipes_names[recipeIndex]}, 
            { $push: {food_items:
                {
                    food_ID: new_food_item, 
                    food_ND: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).food_ND,
                    sci_Name: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sci_Name,
                    com_Name: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).com_Name,
                    edi_Portion: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).edi_Portion,
                    water: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).water,
                    energy: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).energy,
                    protein: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).protein,
                    total_fat: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).total_fat,
                    carbohydrates: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).carbohydrates,
                    ash: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).ash,
                    fiber: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).fiber,
                    sugar: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sugar,
                    calcium: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).calcium,
                    phosphorus: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).phosphorus,
                    iron: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).iron,
                    sodium: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sodium,
                    vit_A: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).vit_A,
                    beta_carotene: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).beta_carotene,
                    rae: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).rae,
                    thiamin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).thiamin,
                    riboflavin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).riboflavin,
                    niacin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).niacin,
                    vit_C: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).vit_C,
                    FA_satu: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_satu,
                    FA_mono: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_mono,
                    FA_poly: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_poly,
                    cholesterol: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).cholesterol,
                    qty:100
                } 
            }}
        )
    }

    return json({
        food_ID: new_food_item, 
                    food_ND: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).food_ND,
                    sci_Name: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sci_Name,
                    com_Name: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).com_Name,
                    edi_Portion: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).edi_Portion,
                    water: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).water,
                    energy: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).energy,
                    protein: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).protein,
                    total_fat: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).total_fat,
                    carbohydrates: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).carbohydrates,
                    ash: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).ash,
                    fiber: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).fiber,
                    sugar: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sugar,
                    calcium: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).calcium,
                    phosphorus: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).phosphorus,
                    iron: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).iron,
                    sodium: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sodium,
                    vit_A: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).vit_A,
                    beta_carotene: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).beta_carotene,
                    rae: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).rae,
                    thiamin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).thiamin,
                    riboflavin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).riboflavin,
                    niacin: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).niacin,
                    vit_C: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).vit_C,
                    FA_satu: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_satu,
                    FA_mono: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_mono,
                    FA_poly: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).FA_poly,
                    cholesterol: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).cholesterol,
                    qty:100
    })

}


export async function PATCH(RequestEvent){
    const { params, request } = RequestEvent;
    const { recipeIndex, user} = params; // Should be the name of the route

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const { new_name } = await request.json()

    if(new_name == "" || recipes_names.includes(new_name)){ 
        return json({message: "already exists or empty string"}, {status: 201});
    }else{
        db.collection("recipes").updateOne({user:user, name:recipes_names[recipeIndex] }, {$set : {name:new_name}});
    }

    return json(
        {
            _id: recipes_data[recipeIndex]._id, 
            user:user, name: new_name, 
            food_items: recipes_data[recipeIndex].food_items 
        }
    );
}


export async function DELETE(RequestEvent){
    const { params } = RequestEvent;
    const { recipeIndex , user} = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})


    const deleted = {user: user, name:recipes_names[recipeIndex]}

    db.collection("recipes").deleteOne(deleted);

    return json(deleted)
}