/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Button from 'src/components/common/Button';
import { palette } from 'src/styles';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addCategory } from 'src/redux/reminder/ReminderActions';

interface Form {
  category: string;
}

interface Props {
  togglePopup: () => void;
}

const AddCategory: React.FC<Props> = ({ togglePopup }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    category: Yup.string().required('Required'),
  });
  const initialValues = {
    category: 'Category 01',
  };
  const onSubmit = () => {
    togglePopup();
    dispatch(addCategory(values.category));
  };

  //TODO Error object values should be passed down and displayed in corresponding inputs
  const { handleChange, handleSubmit, values, errors } = useFormik<Form>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });
  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <StyledAdd
          type='text'
          required
          value={values.category}
          onChange={handleChange('category')}
        />
        <SaveCategoryButton
          variant='contained'
          colorVariant='primary'
          label='Add New Category'
          type='submit'
        />
      </StyledForm>
    </Container>
  );
};

export default AddCategory;

const StyledAdd = styled.input`
  width: 304px;
  height: 40px;
  margin-bottom: 21px;
  padding: 0 8px;
  border: 1px solid #cccccc;
`;

const Container = styled.div`
  background: ${palette.white};
  padding: 32px 24px;
  height: 180px;
`;
const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const SaveCategoryButton = styled(Button)`
  height: 40px;
  width: 189px;
  font-weight: bold;
`;
