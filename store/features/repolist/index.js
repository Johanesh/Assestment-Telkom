import { createSlice } from '@reduxjs/toolkit'

export const repoList = createSlice({
  name: 'repolist',
  initialState: {
    list: [],
  },
  reducers: {
    getData: state => {
      return {
          state
      };
    },
    setData: (state, action) => {
      state.list = action.payload;
    },
    clearData: state => {
      state.list = [];
    },
  }
})

// Action creators are generated for each case reducer function
export const { clearData, setData, getData } = repoList.actions

export default repoList.reducer