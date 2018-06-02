import React from 'react';
import styled from 'styled-components';

export const MessageView = styled.View`
  height: 100%;
`

export const SearchContainer = styled.View`
  height: 100%;
  position: relative;
`

export const ShowDirection = styled.View`
  transform: rotate(${props => props.bearing}deg);
  width: 100px;
  height: 504px;
  margin: 0 auto;
  margin-top: 0px;
  position: relative;
`

export const StyledImage = styled.Image`
  flex: 1;
  position: relative;
  resize-mode: center;
`

export const Distance = styled.Text`
  color: #ffffff;
  position: absolute;
  bottom: 40px;
  text-align: center;
  font-size: 25px;
  width: 100%;
  font-weight: bold;
`

export const AnimatedGradient = styled.Image`
  width: 100%;
  height: ${props => props.height}px;
  position: absolute;
  top: -${props => props.offset}px;
`
