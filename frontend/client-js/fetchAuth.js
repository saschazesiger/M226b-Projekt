



export default async function fetchAuth(url = 'https://api-time.tinyweb.net/user/list', method = 'GET', options = {}) {
    try {
        let response
        if (method === 'GET') {
            const jwt = localStorage.getItem('jwt');
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            });

        } else {
            const jwt = localStorage.getItem('jwt');
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                },
            });
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
};