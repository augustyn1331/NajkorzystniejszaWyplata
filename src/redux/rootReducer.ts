import { combineReducers } from '@reduxjs/toolkit';
import ReminderSliceReducer from './reminder/ReminderSlice';

// Combining multiple reducers - more will be added in the future
const rootReducer = combineReducers({
  reminder: ReminderSliceReducer,
});
//We declared RootState, which we’ll use in our selectors, for strongly-typed access to our Redux state.
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
