import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",

    initialState: {
        user: null
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        update: (state, action) => {
            //state.name = action.payload.name
            state.email = action.payload.email
            state.password = action.payload.password
            //state.id = action.payload.id
        },
        remove: (state) => {
            state = ""
        }
        }
    })

    export const {setUser, update, remove} = userSlice.actions
    export default userSlice.reducer