/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import Button from 'src/components/common/Button';
import { breakpoints, palette } from 'src/styles';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { Input } from '../common/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReminderForm, Tags } from 'src/models';
import { Tags as RadioTags } from 'src/components/common/Tags';
import { TextArea } from '../common/TextArea';
import { useDispatch } from 'react-redux';
import { addReminder } from 'src/redux/reminder/ReminderActions';

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.toLocaleTimeString().substring(0, 5);
  const initialValues = {
    category: '',
    name: '',
    date,
    time,
    tags: Tags.low,
    description: '',
  };

  const onSubmit = () => {
    dispatch(addReminder(values));
  };

  //TODO Error object values should be passed down and displayed in corresponding inputs
  const { handleChange, handleSubmit, values, errors } =
    useFormik<ReminderForm>({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          label='Name'
          value={values.name}
          onChange={handleChange('name')}
        />
        <Input
          label='Date'
          type='date'
          value={values.date}
          onChange={handleChange('date')}
        />
        <Input
          label='Time'
          type='time'
          value={values.time}
          onChange={handleChange('time')}
        />
        <CategoryContainer>
          <Input label='Category' value='Category' />
          <Button
            variant='outlined'
            label='Add New Category'
            startIcon={<StyledAddIcon />}
            onClick={() => {
              console.log('Added Category');
            }}
          />
        </CategoryContainer>
        <RadioTags value={values.tags} onChange={handleChange('tags')} />
        <TextArea
          label='Description'
          value={values.description}
          onChange={handleChange('description')}
        />
        <Button variant='contained' label='Save new reminder' type='submit' />
      </form>
    </Container>
  );
};

export default Form;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${palette.white};
  padding: 0px 20px;
  margin: 40px 0;
  width: 100%;
  @media only screen and (${breakpoints.md}) {
    width: 635px;
    height: 482px;
    padding: 0px 16px;
    margin-left: 16vw;
  }
`;

const CategoryContainer = styled.div`
  @media only screen and (${breakpoints.md}) {
    display: flex;
    flex-direction: row;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  font-size: 24px !important;
  margin-right: 4px;
`;
