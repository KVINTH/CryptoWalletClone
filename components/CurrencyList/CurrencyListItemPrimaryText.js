/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text } from 'react-native';
import TextShantiFont from '../TextShantiFont';

export default function CurrencyListItemPrimaryText(props) {
  return (
    <TextShantiFont>
      <Text style={{ fontSize: 24 }}>
        {props.children}
      </Text>
    </TextShantiFont>
  );
}
