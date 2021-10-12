/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Reminder, ReminderForm } from 'src/models';
import data from 'src/assets/reminders.json';
import {
  convertJSONToReminder,
  convertFormToReminder,
} from 'src/helpers/converters';

export const getReminders = createAsyncThunk<Reminder[]>(
  'reminder/getReminders',
  async () => {
    //detect first launch - if it's the first launch -> load data from assets.json, if not -> load from localstorage
    let state = { isFirstLaunch: false, checked: false };
    const hasLaunched = await localStorage.getItem('hasLaunched');
    if (!hasLaunched) {
      localStorage.setItem('hasLaunched', 'true');
      state = { isFirstLaunch: true, checked: true };
    } else {
      state = { isFirstLaunch: false, checked: true };
    }
    console.log(state.isFirstLaunch);
    if (state.isFirstLaunch && state.checked)
      return convertJSONToReminder(data);
    if (!state.isFirstLaunch && state.checked) {
      const savedReminders = (await localStorage.getItem('reminders')) ?? '';
      return convertJSONToReminder(JSON.parse(savedReminders));
    } else {
      return [];
    }
  }
);
export const addReminder = createAsyncThunk<Reminder, ReminderForm>(
  'reminder/addReminder',
  async (newReminder) => {
    return convertFormToReminder(newReminder);
  }
);
export const deleteReminder = createAsyncThunk<string, string>(
  'reminder/deleteReminder',
  async (id: string) => {
    console.log('delete', id);
    return id;
  }
);
