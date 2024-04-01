export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user } = params;
    
    return json({message: "Log In", user:user})

}