import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  CheckBox,
} from 'react-native';
import { WebBrowser } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import ItemFallas from '../components/ItemFallas';
import BotonListo from '../components/BotonListo';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import fallas from '../data/fallas.json';

export default class Fallas extends React.Component {
  
  constructor(props){
    super(props);

  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const listaFallas = navigation.getParam('fallas', 'NO-ID');
    const falla = fallas.filter((e) => {
      for (var i = 0; i < listaFallas.length; i++) {
        if(listaFallas[i]===e.id_falla)
          return true;
      }
    });

    const items = falla.map(({id_falla, descripcion}, index) => 
         <ItemFallas 
          key={index} 
         onPress={() => this.props.navigation.navigate('RegistroFalla', {id_falla:id_falla})}
         onInfo={() => this.props.navigation.navigate('RegistroFalla', {id_falla:id_falla})}>
         {descripcion}
         </ItemFallas>
      );
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
         <Titulo>Fallas</Titulo>
       </View>
       <ScrollView>
        {items}
       </ScrollView>
       <View style={{marginLeft: 10, marginBottom: 20, alignItems: 'flex-end' }}>
        <BotonListo 
          onPress={() => this.props.navigation.navigate('Instruccion')}
          ></BotonListo>
        </View>
      </View>
    </View>
    );
  }

}
