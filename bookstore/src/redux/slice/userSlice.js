import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: true,
    value: null
  },
  reducers: {
    "setUser": (state, action) => {
      state.value = action.payload
      state.isLoading = false
    },
    "logout": (state) => {
      state.value = null
      localStorage.removeItem("access_token")
    },
    "stopLoading": (state) => {
      state.isLoading = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, logout, stopLoading } = userSlice.actions

export default userSlice.reducer