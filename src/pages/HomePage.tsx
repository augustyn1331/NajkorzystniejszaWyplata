import React from 'react';
import { breakpoints, flexContainer, palette, fadeIn } from 'src/styles';
import styled from 'styled-components';

const PageWrapper = styled(flexContainer)`
  ${fadeIn}
  min-height: 100vh;
  padding: 0px 16px 32px 16px;
  background: ${palette.white};
  color: ${palette.black};
  flex-direction: column;
  @media only screen and (${breakpoints.md}) {
    padding: 76px 16px 32px 16px;
  }
`;

export default function Home() {
  return (
    <PageWrapper id='Home'>
      <p>Hello world</p>
    </PageWrapper>
  );
}
