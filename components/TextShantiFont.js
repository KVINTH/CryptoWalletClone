/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';

export default function TextShantiFont(props) {
  return (
    <Text style={{ fontFamily: 'Shanti_400Regular' }}>{props.children}</Text>
  );
}
