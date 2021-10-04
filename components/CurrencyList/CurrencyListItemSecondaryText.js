/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { Text } from 'react-native';
import TextShantiFont from '../TextShantiFont';

export default function CurrencyListItemSecondaryText(props) {
  return (
    <TextShantiFont>
      <Text style={{
        fontSize: 18,
        color: 'gray',
      }}
      >
        {props.children}
      </Text>
    </TextShantiFont>
  );
}
