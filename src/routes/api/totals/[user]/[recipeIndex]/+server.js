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
    const energy_list = recipe_data.food_items.map((item) => {return ((item.energy/100) * item.qty)})
    const protein_list = recipe_data.food_items.map((item) => {return ((item.protein/100) * item.qty)})
    const total_fat_list = recipe_data.food_items.map((item) => {return ((item.total_fat/100) * item.qty)})
    const carbohydrates_list = recipe_data.food_items.map((item) => {return ((item.carbohydrates/100) * item.qty)})
    const ash_list = recipe_data.food_items.map((item) => {return ((item.ash/100) * item.qty)})
    const fiber_list = recipe_data.food_items.map((item) => {return ((item.fiber/100) * item.qty)})
    const sugars_list = recipe_data.food_items.map((item) => {return ((item.sugars/100) * item.qty)})

    var water_total = 0;
    var energy_total = 0;
    var protein_total = 0;
    var total_fat_total = 0;
    var carbohydrates_total = 0;
    var ash_total = 0;
    var fiber_total = 0;
    var sugars_total = 0;

    water_list.forEach(element => {water_total += element});
    energy_list.forEach(element => {energy_total += element});
    protein_list.forEach(element => {protein_total += element});
    total_fat_list.forEach(element => {total_fat_total += element});
    carbohydrates_list.forEach(element => {carbohydrates_total += element});
    ash_list.forEach(element => {ash_total += element});
    fiber_list.forEach(element => {fiber_total += element});
    sugars_list.forEach(element => {sugars_total += element});
    

    return json({
        //water_list,
        recipe_totals: [water_total, protein_total, total_fat_total, carbohydrates_total, ash_total, fiber_total, sugars_total],
        sugars_list
    })
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
                    sugars: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sugars,
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
                    sugars: fct.find((foodItem) => {return foodItem.food_ID == new_food_item}).sugars,
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