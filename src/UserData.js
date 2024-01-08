import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserData = () => {

    const [userData, setUserData] = useState(null);
    const userId = 1;

    useEffect(() => {
        async function getData() {
            try {
                const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const userPostResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

                const userData = userResponse.data;
                const userPosts = userPostResponse.data;

                const mergedData = {
                    id: userData.id,
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    address: {
                        street: userData.address.street,
                        suite: userData.address.suite,
                        city: userData.address.city,
                        zipcode: userData.address.zipcode,
                        geo: {
                            lat: userData.address.geo.lat,
                            lng: userData.address.geo.lng,
                        }
                    },
                    phone: userData.phone,
                    website: userData.website,
                    company: {
                        name: userData.company.name,
                        catchPhrase: userData.company.catchPhrase,
                        bs: userData.company.bs,
                    },
                    posts: [{
                        userPosts
                    }]
                }
                setUserData(mergedData);

            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [userId])
    console.log(userData);

    return (
        <div>
            {userData ? <span>{JSON.stringify(userData)}</span> : <h2>Loading....</h2>}
        </div>
    )
}

export default UserData
