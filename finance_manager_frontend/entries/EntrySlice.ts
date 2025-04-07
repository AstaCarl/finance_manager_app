import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EntriesAPI } from './EntriesAPI'
import { EntryEntity } from './EntryEntity'

// First, create the thunk
export const fetchEntries = createAsyncThunk(
  'entries/fetchAll',
  async (thunkAPI) => {
    return await EntriesAPI.getEntries()
  },
)

export const createEntry = createAsyncThunk(
    'entries/create',
    async (entry: EntryEntity, thunkAPI) => {
        // the returned value will be the content of action.payload
      return await EntriesAPI.createEntry(entry) 
    },
  )

export const deleteEntry = createAsyncThunk(
  'entries/delete',
  async (id: number, thunkAPI) => {
    return await EntriesAPI.deleteEntry(id)
  }
)

interface EntryState {
  entries: EntryEntity[]
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: EntryState = {
  entries: [],
}

// Then, handle actions in your reducers:
const entrySlice = createSlice({
  name: 'entriess',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      // Add user to the state array
      state.entries = action.payload
    })
    builder.addCase(createEntry.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);
        
        state.entries.push(action.payload); // action.payload is the new category
      })
    builder.addCase(deleteEntry.fulfilled, (state, action) => {
        // Remove the category from the state array
        console.log("payload", action.payload);
        
        state.entries = state.entries.filter(entry => entry.id !== action.payload.id)
      })
  },
})

export default entrySlice.reducer