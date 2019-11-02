import React from 'react';

export default {
    //TODO: the actual hostname
    api: 'localhost',

    fetchAPI: (route: String, body: Object) => fetch(`${this.api}/${route}`, { 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }),

    register: (email, password, handle) => this.fetchAPI('/account/register', {email: email, password: password, handle: handle}),
    login: (username, password) => this.fetchAPI('/account/login', {username: username, password: password}),
}