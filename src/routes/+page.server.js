import { redirect } from '@sveltejs/kit';

export const load = ({cookies}) => {
    let isAdmin = false;
    let isGuest = false;
    const email = cookies.get("user");

    if (!cookies.get("user")){
        throw redirect(307, '/login') // redirect to auth route when inputting /news on browser tab
    }else if(email === "admin"){
        isAdmin = true;
        throw redirect(307, '/recipes');
    }else if(email === "guest"){
        isGuest = true;
        throw redirect(307, '/recipes');
    }else{
        throw redirect(307, '/recipes');
    }

    return {isAdmin, isGuest}
}