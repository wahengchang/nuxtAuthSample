export const API_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    COLLECTIONS: '/api/collections',
    USER: '/api/auth/user'
}

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    COLLECTIONS: '/collections',
    NEW_COLLECTION: '/collections/new'
}

export const FORM_FIELDS = {
    LOGIN: [
        { id: 'login-username', name: 'username', label: 'Username', type: 'text' },
        { id: 'login-password', name: 'password', label: 'Password', type: 'password' }
    ],
    REGISTER: [
        { id: 'register-username', name: 'username', label: 'Username', type: 'text' },
        { id: 'register-email', name: 'email', label: 'Email', type: 'email' },
        { id: 'register-password', name: 'password', label: 'Password', type: 'password' }
    ]
}