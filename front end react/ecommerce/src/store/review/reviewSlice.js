
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDELETE, axiosGET, axiosPATCH, axiosPOST, axiosPUT } from "../../axiosApi";




export const fetchReviews = createAsyncThunk('/reviews', async (payload) => {
    //payload => productId

    const res = await axiosGET('mysite/review/')
    const allReviews = res.data

    const filteredReviews = allReviews.filter((review) => review.product == payload)

  

    const reviewWithUsername =await Promise.all( filteredReviews.map(async (review) => {
        const userId = review.user
        const res = await axiosGET(`mysite/user/${userId}/`)
        const username = res.data.username
        return Object.assign({}, review, { username: username })

    }))
 

    console.log("Filtered review :  >>>>>>>>>>>>>>>>>>>>> ", filteredReviews, "New reviews   : ", reviewWithUsername);



    return reviewWithUsername
})


export const addReview = createAsyncThunk('/addReview', async(payload)=>{
    const res = await axiosPOST('mysite/review/', payload)
    
    return res.data
})













const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        isLoading: false,
        error: null,
        isReviewCartOpen: false


    },
    reducers: {
        setIsReviewCartOpen: (state, action) => {
            state.isReviewCartOpen = !state.isReviewCartOpen
        },
    },

    extraReducers(builder) {
        builder
            .addCase(fetchReviews.pending, (state, action) => {
                state.isLoading = true
            })

            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false
                state.reviews = action.payload

            })

            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.code
            })

            .addCase(addReview.fulfilled, (state, action)=>{
                console.log("Review added successfully!");

            })


    }
})



export const { setIsReviewCartOpen } = reviewSlice.actions

export default reviewSlice.reducer

