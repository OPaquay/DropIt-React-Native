import React from 'react';
import { Text } from 'react-native';
import { StyledTitle, TitleContainer } from './style.js';

const Title = (props) => {
  return (
    <TitleContainer>
      <StyledTitle>{props.title}</StyledTitle>
    </TitleContainer>
  )
}

export default Title;
