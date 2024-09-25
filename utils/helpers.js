export const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}

export const handleApiError = (error) => {
    console.error('API Error:', error)
    return error.response ? error.response.data ? error.response.data.message || 'An unexpected error occurred' : 'An unexpected error occurred' : 'An unexpected error occurred'
}