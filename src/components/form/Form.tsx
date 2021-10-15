/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
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
import { Select } from '../common/Select';
import { Popup } from '../common/Popup';
import AddCategory from '../categories/AddCategory';

interface Props {
  categories: string[];
}

const Form: React.FC<Props> = ({ categories }) => {
  const dispatch = useDispatch();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const togglePopup = () => {
    setVisiblePopup((value) => !value);
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.toLocaleTimeString().substring(0, 5);
  const initialValues = {
    category: 'Category 01',
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
  console.log(values);
  return (
    <Container>
      <Popup
        title='Add Category'
        visible={visiblePopup}
        togglePopup={togglePopup}
      >
        <AddCategory togglePopup={togglePopup} />
      </Popup>
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
          <Select
            label='Category'
            options={categories}
            value={values.category}
            onChange={handleChange('category')}
          />
          <AddCategoryButton
            variant={'outlined'}
            colorVariant={'secondary'}
            label='Add New Category'
            startIcon={<StyledAddIcon />}
            onClick={togglePopup}
          ></AddCategoryButton>
        </CategoryContainer>
        <RadioTags value={values.tags} onChange={handleChange('tags')} />
        <TextArea
          label='Description'
          value={values.description}
          onChange={handleChange('description')}
        />
        <SaveReminderButton
          variant='contained'
          label='Save new reminder'
          type='submit'
          colorVariant='primary'
        />
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
    box-sizing: border-box;
    width: 635px;
    height: 482px;
    padding: 0px;
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
const AddCategoryButton = styled(Button)`
  height: 30px;
  width: 189px;
  border: 1px solid ${palette.blue};
  text-transform: capitalize !important;
  @media only screen and (${breakpoints.md}) {
    position: absolute !important;
    right: 0;
    height: 40px;
  }
`;
const SaveReminderButton = styled(Button)`
  height: 50px;
  width: 210px;
  font-weight: bold;
  @media only screen and (${breakpoints.md}) {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
