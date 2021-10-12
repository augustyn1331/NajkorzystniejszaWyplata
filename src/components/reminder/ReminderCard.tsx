import React from 'react';
import { flexContainer, palette, breakpoints } from 'src/styles';
import styled from 'styled-components';
import { Tags, ReminderCard as ReminderCardProps } from 'src/models/';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { deleteReminder } from 'src/redux/reminder/ReminderActions';
interface Props {
  reminder: ReminderCardProps;
}

const ReminderCard: React.FC<Props> = ({ reminder }) => {
  const dispatch = useDispatch();
  if (!reminder) return null;
  const { id, name, date, time, tags, description } = reminder;

  const handleTagsColor = () => {
    if (tags === Tags.high) {
      return '#FF0000';
    }
    if (tags === Tags.important) {
      return '#FF7F50';
    }
    return '#339900';
  };
  const getTagsLabel = () => {
    if (tags === Tags.high) {
      return 'Very High Prio';
    }
    if (tags === Tags.important) {
      return 'Important';
    }
    return 'Low Prio';
  };
  const handleDelete = () => {
    dispatch(deleteReminder(id));
  };

  return (
    <Container>
      <DeleteButton onClick={handleDelete}>
        <CloseIcon />
      </DeleteButton>
      <StyledName>{name}</StyledName>
      <Wrapper>
        <InfoWrapper>
          <StyledP>
            Date:<span>{date}</span>
          </StyledP>
          <StyledP>
            Time:<span>{time}</span>
          </StyledP>
          <StyledTags color={handleTagsColor()}>{getTagsLabel()}</StyledTags>
        </InfoWrapper>
        <StyledDescription>{description}</StyledDescription>
      </Wrapper>
    </Container>
  );
};

export default ReminderCard;

const Container = styled(flexContainer)`
  position: relative;
  height: 407px;
  width: 305px;
  background-color: ${palette.white};
  border-radius: 15px;
  padding: 16px;
  flex-direction: column;
  margin: 0px 21px 62px 21px;
  overflow-y: auto;
  @media only screen and (${breakpoints.md}) {
    margin: 62px 21px;
  }
`;
const DeleteButton = styled(IconButton)`
  position: absolute !important;
  top: 4px;
  right: 4px;
`;

const Wrapper = styled(flexContainer)`
  height: 100%;
  width: 100%;
  margin-top: 90px;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;
const InfoWrapper = styled(flexContainer)`
  position: absolute;
  top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const StyledName = styled.h2`
  position: absolute;
  top: 50px;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
`;

const StyledP = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
  span {
    margin-left: 16px;
    font-size: 16px;
    line-height: 21px;
  }
`;
const StyledTags = styled(StyledP)`
  color: ${({ color }: { color: string }) => color};
`;
const StyledDescription = styled(StyledP)`
  position: absolute;
  top: 200px;
  color: #666666;
  padding-right: 16px;
`;
