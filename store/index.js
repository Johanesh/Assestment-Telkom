import { configureStore } from '@reduxjs/toolkit';
import repoListReducer from './features/repolist/index';

export default configureStore({
  reducer: {
    repolist: repoListReducer,
  }
})