import React from 'react'
import { useEffect } from 'react';

function IP () {
    useEffect(() => {
        fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => {
                fetch(`https://geolocation-db.com/json/548bd320-00be-11ee-82dd-87424d907439/${data.ip}`)
                .then(response => response.json())
                .then(location =>{
                    console.log(location)
                })
                .catch(error => {
                    console.log(error)
                })
            })
            .catch(error => console.error(error));
    }, []);

    return null;
}

export default IP;
