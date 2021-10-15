/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from 'src/components/common/Button';
import { breakpoints, palette } from 'src/styles';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input } from '../common/Input';

export interface FlowersForm {
  price: number;
  secondDayPrice: number;
}

const Form: React.FC = () => {
  const [state, setState] = useState(0);

  const validationSchema = Yup.object({
    price: Yup.string().required('Required'),
  });

  const initialValues = {
    price: 14,
    secondDayPrice: 7,
  };

  const onSubmit = () => {
    let matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const demand = [100, 200, 300, 400];
    const supply = [100, 200, 300, 400];
    const buyPrices = [12, 10, 9];
    
  };

  //TODO Error object values should be passed down and displayed in corresponding inputs
  const { handleChange, handleSubmit, values, errors } = useFormik<FlowersForm>(
    {
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    }
  );
  console.log(values);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          label='Cena 1 dnia'
          value={values.price}
          onChange={handleChange('name')}
          required
        />
        <Input
          label='Cena 2 dnia'
          value={values.secondDayPrice}
          onChange={handleChange('date')}
          required
        />
        <SaveReminderButton
          variant='contained'
          label='Oblicz'
          type='submit'
          colorVariant='primary'
        />
      </form>
      <StyledDiv>
        <p>Najkorzystniejsza wypłata nastąpi przy:</p>
        <p>{!!state && state}</p>
      </StyledDiv>
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

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background: ${palette.white};
  margin: 40px 0;
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
