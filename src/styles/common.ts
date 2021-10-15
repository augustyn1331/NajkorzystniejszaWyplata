import styled, { css } from 'styled-components';
import { breakpoints } from './breakpoints';

export const flexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledPlaceholder = styled.label`
  font-size: 14px;
  line-height: 18px;
  align-self: flex-start;
  margin: 0 0 4px 0;
  @media only screen and (${breakpoints.md}) {
    position: absolute;
    bottom: 22px;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
  }
`;
export const StyledInputBase = css`
  position: relative;
  width: 100%;
  height: 40px;
  margin-bottom: 21px;
  padding: 0 8px;
  border: 1px solid #cccccc;
  @media only screen and (${breakpoints.md}) {
    width: 304px;
    margin-bottom: 20px;
    margin-left: 110px;
  }
`;
