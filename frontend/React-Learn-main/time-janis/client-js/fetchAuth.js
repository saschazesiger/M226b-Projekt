



export default async function fetchAuth (url, options = {}){
    const jwt = localStorage.getItem('jwt');
    const response = await fetch('https://api-time.tinyweb.net/user/list', {
        method: 'GET', // Methode GET
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ0aW1lc3RhbXAiOjE3MDQzNTA1NzMsImV4cCI6MTcwNDQzNjk3M30.51ODtDBYh1cMihF94Ux26VkPkvZL7-pXDHxTmQ29CeU',
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
};