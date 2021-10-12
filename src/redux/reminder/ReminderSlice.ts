import { createSlice } from '@reduxjs/toolkit';
import { convertRemindersToJSON } from 'src/helpers/converters';
import { ReminderState } from 'src/models';
import { RootState } from '../rootReducer';
import { addReminder, deleteReminder, getReminders } from './ReminderActions';

const initialState: ReminderState = {
  reminders: [],
  loading: false,
  error: '',
};
const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  //TODO - editReminder
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReminders.fulfilled, (state, action) => {
      state.reminders.push(...action.payload);
      localStorage.setItem(
        'reminders',
        JSON.stringify(convertRemindersToJSON(state.reminders))
      );
      state.loading = false;
    });
    builder.addCase(getReminders.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getReminders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
    builder.addCase(addReminder.fulfilled, (state, action) => {
      state.reminders.push(action.payload);
      localStorage.setItem(
        'reminders',
        JSON.stringify(convertRemindersToJSON(state.reminders))
      );
      state.loading = false;
    });
    builder.addCase(addReminder.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(addReminder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
    builder.addCase(deleteReminder.fulfilled, (state, action) => {
      state.reminders = state.reminders.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        'reminders',
        JSON.stringify(convertRemindersToJSON(state.reminders))
      );
      state.loading = false;
    });
    builder.addCase(deleteReminder.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteReminder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
    });
  },
});

export default reminderSlice.reducer;
export const reminderSelector = (state: RootState) => state.reminder;
