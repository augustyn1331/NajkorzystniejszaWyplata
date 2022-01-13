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
type agg = { val: number[]; index: number[] };
export interface Fields {
  price: string;
  secondDayPrice: string;
}

const Form: React.FC = () => {
  const initialValues = {
    price: '14',
    secondDayPrice: '7',
  };

  const demand = [100, 200, 300, 400];
  const supply = [100, 200, 300, 400];
  const buyPrices = [12, 10, 9, 9];

  const onSubmit = () => {};

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
        } else {
          value[j] =
            -supply[i] * buyPrices[i] +
            (demand[j] * parseInt(values.price) + (supply[i] - demand[j]) * parseInt(values.secondDayPrice));
        }
      }
    }
    return score;
  };

  // const getTranspondedMatrix = (array: matrix) => array[0].map((x, i) => array.map((x) => x[i]));

  const AggRow = (array: matrix, result: 'max' | 'min'): agg => {
    let val: number[] = [];
    let index: number[] = [];

    for (let i = 0; i < array.length; i++) {
      val[i] = result === 'max' ? Math.max(...array[i]) : Math.min(...array[i]);
      index[i] = array[i].indexOf(val[i]);
    }
    return { val, index };
  };

  const getLoss = (loss: matrix, max: number[]): matrix => {
    for (let i = 0; i < loss.length; i++) {
      let value = loss[i];
      for (let j = 0; j < loss.length; j++) {
        value[j] = max[j] - value[j];
      }
    }
    return loss;
    // setState({ score, loss });
  };
  const sumFromRow = (array: number[][]) => {
    let sum: number[] = [];
    for (let i = 0; i < array.length; i++) {
      let sumValue = 0;
      for (let j = 0; j < array[i].length; j++) {
        switch (j) {
          case 0:
            sumValue += array[i][j] * 0.2;
            break;
          case 1:
            sumValue += array[i][j] * 0.1;
            break;
          case 2:
            sumValue += array[i][j] * 0.5;
            break;
          case 3:
            sumValue += array[i][j] * 0.2;
            break;
        }
      }
      sum = [...sum, sumValue];
    }

    return sum;
  };

  //TODO Error object values should be passed down and displayed in corresponding inputs
  const { handleChange, handleSubmit, values } = useFormik<Fields>({
    initialValues,
    onSubmit,
  });
  const tabelaWyplat = getBestScore();
  const maxScores = AggRow(tabelaWyplat, 'max');
  const minScores = AggRow(tabelaWyplat, 'min');
  const stratyMozliwosci = getLoss(cloneArray(tabelaWyplat), maxScores.val);
  const owdi = maxScores.val[0] * 0.2 + maxScores.val[1] * 0.1 + maxScores.val[2] * 0.5 + maxScores.val[3] * 0.2;

  const Hurwicz = () => {
    const value = Math.max(...maxScores.val);
    const rowIndex = maxScores.val.indexOf(value);
    const columnIndex = maxScores.index[rowIndex];
    return {
      value,
      rowIndex,
      columnIndex,
    };
  };
  const Wald = () => {
    const value = Math.max(...minScores.val);
    const rowIndex = minScores.val.indexOf(value);
    const columnIndex = minScores.index[rowIndex];
    return {
      value,
      rowIndex,
      columnIndex,
    };
  };
  const Savage = () => {
    const array = AggRow(stratyMozliwosci, 'max');
    const value = Math.min(...array.val);
    const rowIndex = array.val.indexOf(value);
    const columnIndex = array.index[rowIndex];
    return {
      value,
      rowIndex,
      columnIndex,
    };
  };

  const getDecisions = () => {
    return (
      <Decisions>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium Hurwicza: {Hurwicz().value}</h3>
          </div>
          <p className='index'>
            Pozycja w tabeli: [{Hurwicz().rowIndex}, {Hurwicz().columnIndex}]
          </p>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium Walda: {Wald().value}</h3>
          </div>
          <p className='index'>
            Pozycja w tabeli: [{Wald().rowIndex}, {Wald().columnIndex}]
          </p>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium Savage: {Savage().value}</h3>
          </div>
          <p className='index'>
            Pozycja w tabeli: [{Savage().rowIndex}, {Savage().columnIndex}]
          </p>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium OW: {Math.max(...sumFromRow(cloneArray(tabelaWyplat)))}</h3>
          </div>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium OWDI: {owdi}</h3>
          </div>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>Kryterium Oczekiwanej Straty Mozliwosci: {Math.min(...sumFromRow(cloneArray(stratyMozliwosci)))}</h3>
          </div>
        </div>
        <div className='criterium'>
          <div className='value'>
            <h3>
              Oczekiwana Wartość Doskonałej Informacji: {owdi - Math.max(...sumFromRow(cloneArray(tabelaWyplat)))}
            </h3>
          </div>
        </div>
      </Decisions>
    );
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          label='Cena 1 Listopada - Wszystkich Świętych'
          value={values.price}
          onChange={handleChange('price')}
          required
        />
        <Input
          label='Cena 2 Listopada - Dzień Zaduszny'
          value={values.secondDayPrice}
          onChange={handleChange('secondDayPrice')}
          required
        />
        {/* <FormButton variant='contained' label='Najlepsza wyplata' type='submit' colorVariant='primary' /> */}
      </form>
      <StyledDiv>
        {/* <p>&nbsp;{!!maxInfo && maxInfo}</p> */}
        {!!values.price && !!values.secondDayPrice && (
          <div className='tablesWrapper'>
            <div className='tabela'>
              <p>Tabela wypłat:</p>
              <table>
                <thead>
                  <tr>
                    <th> </th>
                    <th>100</th>
                    <th>200</th>
                    <th>300</th>
                    <th>400</th>
                  </tr>
                </thead>
                {tabelaWyplat.map((row, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}00</th>
                    {row.map((value, j) => (
                      <td key={j}>{value}</td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
            <div className='tabela'>
              <p>Tabela strat:</p>
              <table>
                <thead>
                  <tr>
                    <th> </th>
                    <th>100</th>
                    <th>200</th>
                    <th>300</th>
                    <th>400</th>
                  </tr>
                </thead>
                {stratyMozliwosci.map((row, i) => (
                  <tr key={i}>
                    <th scope='row'>{i + 1}00</th>
                    {row.map((value, j) => (
                      <td key={j}>{value}</td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
            {getDecisions()}
          </div>
        )}
      </StyledDiv>
    </Container>
  );
};

export default Form;

const Decisions = styled.div`
  display: flex;
  flex-direction: column;
  .criterium {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    .value,
    .index {
      margin: 2px 20px 0 15px;
      font-size: 20px;
    }
    .value {
      display: flex;
    }
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  margin: 40px 0;
  max-width: 100vw;

  @media only screen and (${breakpoints.md}) {
    box-sizing: border-box;
    height: 482px;
    padding: 0px;
    margin-left: 8vw;
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  width: 100%;
  .tablesWrapper {
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .tabela {
    border: 1px solid black;
    max-height: 500px;
    margin: 20px 0 0 0;
    @media screen and (min-width: 768px) {
      margin: 20px 80px 0 0;
    }

    padding: 8px;
    p {
      font-size: 24px;
      margin: 12px 24px 24px 0;
    }

    table {
      align-self: center;
      border-spacing: 0;
      border: 1px solid black;
      tr {
        th {
          background-color: ${palette.black};
          color: ${palette.white};
          border: 1px solid white;
        }
        :first-child {
          th {
            border-bottom: 1px solid black !important;
          }
        }
        :last-child {
          td,
          th {
            border-bottom: 0px;
          }
        }
      }
      th,
      td {
        margin: 0;
        padding: 24px;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        text-align: center;
        :first-child {
          th {
            border: 0;
          }
        }
        :last-child {
          border-right: 0;
        }
      }
    }
  }
`;
