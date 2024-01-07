



export default async function fetchAuth (url = 'https://api-time.tinyweb.net/user/list', options = {}){
    try{
    const jwt = localStorage.getItem('jwt');
    const response = await fetch(url, {
        method: 'GET', // Methode GET
        headers: {
            'Authorization': `${jwt}`,
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();
    console.log(data);
    return data;
} catch (error) {
    console.log(error);
    return {success: false, message: error};
}
};