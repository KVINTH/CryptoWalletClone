/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { Text } from 'react-native';
import TextCustomFont from '../TextCustomFont';

export default function CurrencyListItemSecondaryText(props) {
  return (
    <TextCustomFont>
      <Text style={{
        fontSize: 18,
        color: 'gray',
      }}
      >
        {props.children}
      </Text>
    </TextCustomFont>
  );
}
