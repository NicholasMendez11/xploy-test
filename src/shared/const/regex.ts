export const emailRegex = {
    value: /\S+@\S+\.\S+/,
    message: 'Please enter a valid email address.'
}

export const passwordRegex= {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    message: 'Password must contain at least 8 characters, one uppercase, one lowercase, and one number.'
}
