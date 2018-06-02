import React from 'react';
import styled from 'styled-components';

export const ListContainer = styled.View`
  padding: 10px;
  padding-top: 20px;
  flex: 1;
`

export const List = styled.FlatList`
  padding-left: 20px;
`

export const ListElement = styled.View`
  position: relative;
  padding-bottom: 15px;
  border-left-width: ${props => props.lastChild ? '0px' :' 2px'};
  border-left-color: #47ACFF;
  padding-left: 20px;
  margin-left: ${props => props.lastChild ? '2px' :' 0px'};
`
export const BulletPoint = styled.View`
  position: absolute;
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: #47ACFF;
  background-color: ${props => props.yellow ? '#FFE458' : '#eeeeee'};
  left: -11px;
  border-radius: 100;
  top: ${props => !props.firstChild && !props.lastChild ? '50%' : props.lastChild ? '0px' : '11px'};
  margin-top: ${props => !props.lastChild && !props.firstchild ? '-11px' : '0px'};
`

export const Activity = styled.Text`
  font-family: ${props => props.bold ? 'roboto-slab-regular' : 'roboto-slab-light'};
  font-size: 16px;
`

export const Time = styled.Text`
  font-family: 'roboto-slab-thin';
  font-size: 13px;
`
