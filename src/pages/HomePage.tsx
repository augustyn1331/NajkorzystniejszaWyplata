import React, { useEffect } from 'react';
import { breakpoints, flexContainer, palette } from 'src/styles';
import styled from 'styled-components';
import Form from 'src/components/form/Form';
import Reminders from 'src/components/reminder/Reminders';
import { useDispatch, useSelector } from 'react-redux';
import { getReminders } from 'src/redux/reminder/ReminderActions';
import { reminderSelector } from 'src/redux/reminder/ReminderSlice';

const PageWrapper = styled(flexContainer)`
  padding: 70px 0px 0px 0px;
  background: ${palette.white};
  color: ${palette.black};
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (${breakpoints.md}) {
    padding: 117px 0px 0px 0px;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { reminders } = useSelector(reminderSelector);
  useEffect(() => {
    dispatch(getReminders());
  }, [dispatch]);
  //reverse() gives us default sorting from the newest reminders
  return (
    <PageWrapper id='Home'>
      <Form />
      <Reminders reminders={[...reminders].reverse()} />
    </PageWrapper>
  );
};

export default Home;
