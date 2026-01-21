import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Category = {
    id: number
    name: []
}

type CategoriesState = {
    list: Category[]
    selectedCategory: Category | null
}

const initialState: CategoriesState = {
    list: [],
    selectedCategory: null
}

const categSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        selectedCategory(state, action: PayloadAction<Category>) {
            state.selectedCategory = action.payload
        },
        setCategories(state, action: PayloadAction<Category[]>) {
            state.list = action.payload
        }
    }

})
export const { setCategories, selectedCategory } = categSlice.actions
export default categSlice.reducer