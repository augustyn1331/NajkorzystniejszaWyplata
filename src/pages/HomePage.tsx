import React from 'react';
import { breakpoints, flexContainer, palette } from 'src/styles';
import styled from 'styled-components';
import Form from 'src/components/form/Form';

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
  return (
    <PageWrapper id='Home'>
      <Form />
    </PageWrapper>
  );
};

export default Home;
