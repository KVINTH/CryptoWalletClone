/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text } from 'react-native';
import TextCustomFont from '../TextCustomFont';

export default function CurrencyListItemPrimaryText(props) {
  return (
    <TextCustomFont>
      <Text style={{ fontSize: 24 }}>
        {props.children}
      </Text>
    </TextCustomFont>
  );
}
