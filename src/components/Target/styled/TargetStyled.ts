import { ReactChildren, ReactNode, ReactText } from 'react';
import styled, { css } from 'styled-components';
import { TargetProps } from '../../../types/types';

interface TargetButton {
  styledBackgroundColour: string;
  styledHeight: string;
  styledWidth: string;
  styledTranslate: string;
  children?: ReactChildren | ReactNode | ReactText;
}

export const TargetStyled = styled.button<TargetButton>`
  margin: 20px;
  font-size: 16px;
  border: none;
  border-radius: 50%;
  transition: all 0.6s ease-in-out;
  text-align: center;
  color: white;
  padding: 0;

  ${({
    styledBackgroundColour,
    styledHeight,
    styledWidth,
    styledTranslate,
  }: Partial<TargetProps>) => (
    css`
      height: ${styledHeight || '30px'};
      width: ${styledWidth || '30px'};
      background: ${styledBackgroundColour || 'black'};
      transform: ${styledTranslate || 'none'}
    `
  )}
`;
