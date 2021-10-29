/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from 'src/components/common/Button';
import { breakpoints, palette } from 'src/styles';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input } from '../common/Input';

type matrix = number[][];
export interface FlowersForm {
  price: string;
  secondDayPrice: string;
}
interface Results {
  score: matrix;
  loss?: matrix;
}

const Form: React.FC = () => {
  const [state, setState] = useState<Results>({ score: [], loss: [] });

  const validationSchema = Yup.object({
    price: Yup.string().required('Required'),
  });

  const initialValues = {
    price: '14',
    secondDayPrice: '7',
  };

  const demand = [100, 200, 300, 400];
  const supply = [100, 200, 300, 400];
  const buyPrices = [12, 10, 9, 9];

  const onSubmit = () => {
    const bestScore = getBestScore();
    const maxScores = AggColumn(bestScore, 'max');
    const transpondedScores = getTranspondedMatrix(bestScore);
    console.log('funkcja max', AggColumn(transpondedScores, 'max'));
    console.log('funkcja min', AggColumn(transpondedScores, 'min'));
    getLoss(cloneArray(bestScore), maxScores);
  };

  const cloneArray = (array: matrix): matrix => {
    //clone 2d array, without this code it's always a reference
    let loss = [[0]];
    for (let i = 0; i < array.length; i++) loss[i] = [...array[i]];
    return loss;
  };
  const getBestScore = (): matrix => {
    let score = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    for (let i = 0; i < score.length; i++) {
      let value = score[i];
      for (let j = 0; j < score.length; j++) {
        if (j > i) {
          value[j] = value[i];
          // console.log('Szufladka[' + i + '][' + j + '] = ' + value[j]);
        } else {
          value[j] =
            -supply[i] * buyPrices[i] +
            (demand[j] * parseInt(values.price) +
              (supply[i] - demand[j]) * parseInt(values.secondDayPrice));
          // console.log('Szufladka[' + i + '][' + j + '] = ' + value[j]);
        }
      }
    }
    // console.log(score);
    console.log(score);
    // console.log('funkcja min', AggColumn(score, 'min'));
    // console.log(minElInColumn);
    // console.log(Math.max(...maxElInColumn));
    return score;
  };

  const getTranspondedMatrix = (array: matrix) =>
    array[0].map((x, i) => array.map((x) => x[i]));

  const AggColumn = (array: matrix, result: 'max' | 'min') => {
    let val: number[] = [];
    if (result === 'max') {
      for (let i = 0; i < array.length; i++) val[i] = Math.max(...array[i]);
    }
    if (result === 'min') {
      for (let i = 0; i < array.length; i++) val[i] = Math.min(...array[i]);
    }
    return val;
  };

  const getDecisions = (
    score: matrix,
    loss: matrix,
    maxVal: number,
    minVal: number
  ) => {
    return (
      <div>
        <h2>Kryterium Hurwicza: </h2>
      </div>
    );
  };

  const getLoss = (loss: matrix, max: number[]): matrix => {
    for (let i = 0; i < loss.length; i++) {
      let value = loss[i];
      for (let j = 0; j < loss.length; j++) {
        value[j] = max[j] - value[j];
      }
    }
    console.log(loss);
    return loss;
    // setState({ score, loss });
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
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          label='Cena 1 dnia'
          value={values.price}
          onChange={handleChange('price')}
          required
        />
        <Input
          label='Cena 2 dnia'
          value={values.secondDayPrice}
          onChange={handleChange('secondDayPrice')}
          required
        />
        <SaveReminderButton
          variant='contained'
          label='Najlepsza wyplata'
          type='submit'
          colorVariant='primary'
        />
        {/* <SaveReminderButton
          variant='outlined'
          label='Straty możliwości'
          type='submit'
          colorVariant='primary'
        /> */}
      </form>
      <StyledDiv>
        <p>Najlepsza wypłata:</p>
        {console.log(state.score)}
        {/* <p>&nbsp;{!!maxInfo && maxInfo}</p> */}
      </StyledDiv>
      {/* {getDecisions()} */}
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
