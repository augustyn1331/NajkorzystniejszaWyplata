import { Reminder, ReminderForm, ReminderJSON, Tags } from 'src/models';
import { randomHexId } from './randomHexId';

export const convertJSONToReminder = (data: ReminderJSON[]): Reminder[] => {
  return data.map(
    ({
      _id,
      index,
      date,
      description,
      name,
      tags,
      category,
      guid,
      isActive,
    }) => ({
      id: _id,
      index,
      name,
      date: date.split(' ')[0],
      time: date.split(' ')[1],
      tags: convertToTagsEnum(tags),
      description,
      category,
      guid,
      isActive,
    })
  );
};
export const convertRemindersToJSON = (data: Reminder[]): ReminderJSON[] => {
  return data.map(
    ({
      id,
      date,
      time,
      description,
      name,
      tags,
      category,
      guid,
      isActive,
    }) => ({
      _id: id,
      index: Math.floor(Math.random() * 101),
      guid,
      name,
      date: date + ' ' + time,
      tags: convertToTagsEnum(tags),
      description,
      category,
      isActive,
    })
  );
};
export const convertFormToReminder = ({
  name,
  date,
  time,
  tags,
  description,
  category,
}: ReminderForm): Reminder => {
  return {
    id: randomHexId(),
    guid: randomHexId(), //TODO uuid should be implemented here(guid generator)
    index: Math.floor(Math.random() * 1001),
    name,
    date,
    time,
    tags,
    description,
    category,
    isActive: true,
  };
};

const convertToTagsEnum = (value: string) => {
  if (value === 'Very high prio') {
    return Tags.high;
  }
  if (value === 'Important') {
    return Tags.important;
  }
  return Tags.low;
};
