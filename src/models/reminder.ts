export enum Tags {
  low = 'Low Prio',
  important = 'Important',
  high = 'Very high prio',
}

interface Base {
  name: string;
  date: string;
  time: string;
  description: string;
  tags: Tags;
}
export interface Reminder extends Base {
  id: string;
  index: number;
  guid: string;
  category: string;
  isActive: boolean;
}
export interface ReminderCard extends Base {
  id: string;
}
export interface ReminderForm extends Base {
  category: string;
}
export interface ReminderJSON {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean; //TODO isActive feature
  tags: string;
  category: string;
  name: string;
  date: string;
  description: string;
}
export interface ReminderState {
  reminders: Reminder[];
  categories: string[];
  loading: boolean;
  error: string;
}
