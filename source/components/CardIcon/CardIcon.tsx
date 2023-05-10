import React from 'react';
import styled from 'styled-components';

interface CardIconProps {
  children?: React.ReactNode;
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => <StyledCardIcon>{children}</StyledCardIcon>;

const StyledCardIcon = styled.div`
  background-color: none;
  font-size: 36px;
  height: 95px;
  width: 95px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: none !important;
  margin: 0 auto ${(props) => props.theme.spacing[3]}px;
`;

export default CardIcon;
