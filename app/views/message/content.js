import React from 'react';
import { Text, View,  } from 'react-native';

const MessageContent = (props) => {
  return (
    <Text>{props.message.content}</Text>
  );
}

export default MessageContent;
