import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPOST } from "../../axiosApi";



export const setCurrentUser = createAsyncThunk('/user', async(payload)=>{
  
    const res = await axiosPOST('auth/login/', payload)
    return res.data
    
})






export const checkIsAdmin = createAsyncThunk('/admin', async(payload)=>{
    const res = await axiosPOST('mysite/isSuperUser/', payload)
    return res.data.data
})






export const userSlice= createSlice({
    name:'user',
    initialState:{
        currentUser : null,
        isLoading:false,
        error: null,
        isAdmin: false,
        isAdminFound: false,
        isUserProfileCartOpen: false
    },
    reducers:{
        removeCurrentUser: (state, action)=>{
            state.currentUser = null
        },
        setIsAdmin: (state, action)=>{           
            state.isAdmin = action.payload
        },
        setIsUserProfileCartOpen: (state, action) => {
            state.isUserProfileCartOpen = !state.isUserProfileCartOpen
        },
        setCurrentUserAfterGoogleLogin : (state, action)=>{
            state.currentUser = action.payload
        },
        updateCurrentUser : (state, action) =>{
            state.currentUser = action.payload
        }
    },
    extraReducers(builder){
        builder
        .addCase(setCurrentUser.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(setCurrentUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.currentUser = action.payload
           
            
        
        })
        .addCase(setCurrentUser.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.code
        })

        .addCase(checkIsAdmin.fulfilled, (state, action)=>{
            state.isAdminFound = action.payload
        })
    }


})


export const  {removeCurrentUser, setIsAdmin, setIsUserProfileCartOpen, setCurrentUserAfterGoogleLogin, updateCurrentUser} =  userSlice.actions

export default userSlice.reducer
