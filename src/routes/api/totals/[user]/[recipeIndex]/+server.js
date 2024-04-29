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
    const calcium_list = recipe_data.food_items.map((item) => {return ((item.calcium/100) * item.qty)})
    const phosphorus_list = recipe_data.food_items.map((item) => {return ((item.phosphorus/100) * item.qty)})
    const iron_list = recipe_data.food_items.map((item) => {return ((item.iron/100) * item.qty)})
    const sodium_list = recipe_data.food_items.map((item) => {return ((item.sodium/100) * item.qty)})
    const vit_A_list = recipe_data.food_items.map((item) => {return ((item.vit_A/100) * item.qty)})
    const beta_carotene_list = recipe_data.food_items.map((item) => {return ((item.beta_carotene/100) * item.qty)})
    const rae_list = recipe_data.food_items.map((item) => {return ((item.rae/100) * item.qty)})
    const thiamin_list = recipe_data.food_items.map((item) => {return ((item.thiamin/100) * item.qty)})
    const riboflavin_list = recipe_data.food_items.map((item) => {return ((item.riboflavin/100) * item.qty)})
    const niacin_list = recipe_data.food_items.map((item) => {return ((item.niacin/100) * item.qty)})
    const vit_C_list = recipe_data.food_items.map((item) => {return ((item.vit_C/100) * item.qty)})
    const FA_satu_list = recipe_data.food_items.map((item) => {return ((item.FA_satu/100) * item.qty)})
    const FA_mono_list = recipe_data.food_items.map((item) => {return ((item.FA_mono/100) * item.qty)})
    const FA_poly_list = recipe_data.food_items.map((item) => {return ((item.FA_poly/100) * item.qty)})
    const cholesterol_list = recipe_data.food_items.map((item) => {return ((item.cholesterol/100) * item.qty)})

    var water_total = 0;
    var energy_total = 0;
    var protein_total = 0;
    var total_fat_total = 0;
    var carbohydrates_total = 0;
    var ash_total = 0;
    var fiber_total = 0;
    var sugars_total = 0;
    var calcium_total = 0;
    var phosphorus_total = 0;
    var iron_total = 0;
    var sodium_total = 0;
    var vit_A_total = 0;
    var beta_carotene_total = 0;
    var rae_total = 0;
    var thiamin_total = 0;
    var riboflavin_total = 0;
    var niacin_total = 0;
    var vit_C_total = 0;
    var FA_satu_total = 0;
    var FA_mono_total = 0;
    var FA_poly_total = 0;
    var cholesterol_total = 0;

    water_list.forEach(element => {water_total += element});
    energy_list.forEach(element => {energy_total += element});
    protein_list.forEach(element => {protein_total += element});
    total_fat_list.forEach(element => {total_fat_total += element});
    carbohydrates_list.forEach(element => {carbohydrates_total += element});
    ash_list.forEach(element => {ash_total += element});
    fiber_list.forEach(element => {fiber_total += element});
    sugars_list.forEach(element => {sugars_total += element});
    calcium_list.forEach(element => {calcium_total += element});
    phosphorus_list.forEach(element => {phosphorus_total += element});
    iron_list.forEach(element => {iron_total += element});
    sodium_list.forEach(element => {sodium_total += element});
    vit_A_list.forEach(element => {vit_A_total += element});
    beta_carotene_list.forEach(element => {beta_carotene_total += element});
    rae_list.forEach(element => {rae_total += element});
    thiamin_list.forEach(element => {thiamin_total += element});
    riboflavin_list.forEach(element => {riboflavin_total += element});
    niacin_list.forEach(element => {niacin_total += element});
    vit_C_list.forEach(element => {vit_C_total += element});
    FA_satu_list.forEach(element => {FA_satu_total += element});
    FA_mono_list.forEach(element => {FA_mono_total += element});
    FA_poly_list.forEach(element => {FA_poly_total += element});
    cholesterol_list.forEach(element => {cholesterol_total += element});
    

    return json({
        //water_list,
        recipe_totals: [
            water_total, 
            protein_total, 
            total_fat_total, 
            carbohydrates_total, 
            ash_total, fiber_total, 
            sugars_total, 
            energy_total,
            FA_satu_total,
            FA_mono_total,
            FA_poly_total,

            calcium_total,
            phosphorus_total,
            iron_total,
            sodium_total,
            vit_A_total,
            beta_carotene_total,
            rae_total,
            thiamin_total,
            riboflavin_total,
            niacin_total,
            vit_C_total,
            cholesterol_total
        ],
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