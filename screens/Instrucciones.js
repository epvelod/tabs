import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import Item from '../components/Item';
import ItemIntruccion from '../components/ItemIntruccion';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

export default class Instrucciones extends React.Component {
  


  constructor(props){
    super(props);

  }



  static navigationOptions = {
    header: null,
  };

  render() {
    return (
          <View style={{
              flex: 1,}}>
            <View style={{
                height: 25,
                backgroundColor: Colors.negro}}>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'stretch',
              backgroundColor: '#fff',
              paddingVertical: 10,
              paddingHorizontal: 20,
              }}>
              <View style={{marginBottom: 20}}>
                <Titulo>Intrucciones</Titulo>
              </View>

        	<ScrollView>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>
              <ItemIntruccion></ItemIntruccion>

        	</ScrollView>
            </View>
          </View>
    );
  }

}
