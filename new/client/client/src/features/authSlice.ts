import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    id: number
    username: string
    email: string
}

type AuthState = {
    user: User | null
    isAuthenticated: boolean
    accessToken: string | null
}

const savedAuth = localStorage.getItem('auth')

const initialState: AuthState = savedAuth
    ? { user: JSON.parse(savedAuth).user, accessToken: JSON.parse(savedAuth).accessToken, isAuthenticated: true }
    : { user: null, accessToken: null, isAuthenticated: false }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: User, accessToken: string }>) {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.accessToken = action.payload.accessToken

            localStorage.setItem('auth', JSON.stringify({
                user: action.payload.user,
                accessToken: action.payload.accessToken
            }))
        },
        logout(state) {
            state.user = null
            state.isAuthenticated = false
            state.accessToken = null

            localStorage.removeItem('auth')
        }

    },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer