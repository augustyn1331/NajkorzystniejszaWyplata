import React from 'react';
import { Reminder } from 'src/models/';
import { breakpoints, palette } from 'src/styles';
import styled from 'styled-components';
import ReminderCard from 'src/components/reminder/ReminderCard';

interface Props {
  reminders: Reminder[];
}

const Reminders: React.FC<Props> = ({ reminders }) => {
  return (
    <Container>
      <Wrapper>
        {reminders.map((item, index) => (
          <ReminderCard reminder={item} key={index} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Reminders;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  margin: 40px 0 0 0;
  padding: 62px 16px 0px 16px;
  background-color: ${palette.grey};
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 14vw;
  background-color: ${palette.grey};
  @media only screen and (${breakpoints.md}) {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;
