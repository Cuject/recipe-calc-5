import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';

//let user_email= 'nio@gmail.com';

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, foodIndex, recipeIndex } = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipe_food_items = recipes_data[recipeIndex].food_items

    return json(recipe_food_items[foodIndex])
}

export async function PATCH(RequestEvent){
    const { params, request } = RequestEvent;
    const { user, recipeIndex, foodIndex } = params; // Should be the name of the route

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();

    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})
    //const recipes_waters = recipes_data.map((recipe_water) => {return recipe_water.water})

    const { new_qty } = await request.json()

    if(recipes_data[recipeIndex].food_items.length === 0){
        return json({message: recipes_names[recipeIndex] + " is empty, No food items can be edited"}, {status: 201});
    }else{
        if(foodIndex >= recipes_data[recipeIndex].food_items.length){
            return json({message: "index exceeds range or not valid"}, {status: 201});

        }else{

            db.collection("recipes").updateOne({
                user:user, name:recipes_names[recipeIndex], "food_items.food_ID": recipes_data[recipeIndex].food_items[foodIndex].food_ID
            }, 
                { $set: { 'food_items.$.qty': new_qty } 
            })
            
            return json({
                food_ID: recipes_data[recipeIndex].food_items[foodIndex].food_ID,
                //water : recipes_waters, //.map((nutrient) => {return (parseFloat(new_qty) * (nutrient/100))}),
                water: (((recipes_data[recipeIndex].food_items[foodIndex].water)/100) * new_qty).toFixed(2),
                energy: (((recipes_data[recipeIndex].food_items[foodIndex].energy)/100) * new_qty).toFixed(2),
                protein: (((recipes_data[recipeIndex].food_items[foodIndex].protein)/100) * new_qty).toFixed(2),
                total_fat: (((recipes_data[recipeIndex].food_items[foodIndex].total_fat)/100) * new_qty).toFixed(2),
                carbohydrates: (((recipes_data[recipeIndex].food_items[foodIndex].carbohydrates)/100) * new_qty).toFixed(2),
                ash: (((recipes_data[recipeIndex].food_items[foodIndex].ash)/100) * new_qty).toFixed(2),
                fiber: (((recipes_data[recipeIndex].food_items[foodIndex].fiber)/100) * new_qty).toFixed(2),
                sugar: (((recipes_data[recipeIndex].food_items[foodIndex].sugar)/100) * new_qty).toFixed(2),

                calcium: (((recipes_data[recipeIndex].food_items[foodIndex].calcium)/100) * new_qty).toFixed(2),
                phosphorus: (((recipes_data[recipeIndex].food_items[foodIndex].phosphorus)/100) * new_qty).toFixed(2),
                iron: (((recipes_data[recipeIndex].food_items[foodIndex].iron)/100) * new_qty).toFixed(2),
                sodium: (((recipes_data[recipeIndex].food_items[foodIndex].sodium)/100) * new_qty).toFixed(2),
                vit_A: (((recipes_data[recipeIndex].food_items[foodIndex].vit_A)/100) * new_qty).toFixed(2),
                beta_carotene: (((recipes_data[recipeIndex].food_items[foodIndex].beta_carotene)/100) * new_qty).toFixed(2),
                rae: (((recipes_data[recipeIndex].food_items[foodIndex].rae)/100) * new_qty).toFixed(2),
                thiamin: (((recipes_data[recipeIndex].food_items[foodIndex].thiamin)/100) * new_qty).toFixed(2),
                riboflavin: (((recipes_data[recipeIndex].food_items[foodIndex].riboflavin)/100) * new_qty).toFixed(2),
                niacin: (((recipes_data[recipeIndex].food_items[foodIndex].niacin)/100) * new_qty).toFixed(2),
                vit_C: (((recipes_data[recipeIndex].food_items[foodIndex].vit_C)/100) * new_qty).toFixed(2),
                FA_satu: (((recipes_data[recipeIndex].food_items[foodIndex].FA_satu)/100) * new_qty).toFixed(2),
                FA_mono: (((recipes_data[recipeIndex].food_items[foodIndex].FA_mono)/100) * new_qty).toFixed(2),
                FA_poly: (((recipes_data[recipeIndex].food_items[foodIndex].FA_poly)/100) * new_qty).toFixed(2),

                cholesterol: (((recipes_data[recipeIndex].food_items[foodIndex].cholesterol)/100) * new_qty).toFixed(2),

                food_items: recipes_data[recipeIndex].food_items,
                water_total: recipes_data[recipeIndex].food_items.map((nutrient) => {return nutrient.water}),

                qty: new_qty
            })
        }
    }
}



export async function DELETE(RequestEvent){
    const { params } = RequestEvent;
    const { user, recipeIndex, foodIndex } = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipe_food_items = recipes_data[recipeIndex].food_items
    const recipe_food_IDs = recipe_food_items.map((food_name) => {return food_name.food_ID})

    db.collection("recipes").updateOne(
        {user: user, name:recipes_names[recipeIndex]}, 
        { $pull: {food_items:{food_ID: recipes_data[recipeIndex].food_items[foodIndex].food_ID } }})

    return json(recipe_food_items[foodIndex])
}