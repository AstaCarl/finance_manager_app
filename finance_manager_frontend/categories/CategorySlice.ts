import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoriesAPI } from './CategoriesAPI'
import { CategoryEntity } from './CategoryEntity'

// First, create the thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (thunkAPI) => {
    return await CategoriesAPI.getCategories()
  },
)

export const createCategory = createAsyncThunk(
    'categories/create',
    async (category: CategoryEntity, thunkAPI) => {
        // the returned value will be the content of action.payload
      return await CategoriesAPI.createCategory(category) 
    },
  )

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: number, thunkAPI) => {
    console.log("deleted category with id", id);
    return await CategoriesAPI.deleteCategory(id)
  }
)

interface CategoryState {
  categories: CategoryEntity[]
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CategoryState = {
  categories: [],
}

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Add user to the state array
      state.categories = action.payload
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.categories.push(action.payload); // action.payload is the new category
      })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
        // Remove the category from the state array
        console.log("payload", action.payload);
        
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
  },
})

export default categorySlice.reducer