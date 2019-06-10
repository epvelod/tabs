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
  TouchableNativeFeedback,
} from 'react-native';
import { WebBrowser } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import Item from '../components/Item';
import BotonListo from '../components/BotonListo';
import ItemComponente from '../components/ItemComponente';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import respuestas from '../data/respuestas.json';

export default class Instruccion extends React.Component {
  


  constructor(props){
    super(props);

  }



  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const { id_ensamble, descripcion, instruccion, componentes } = navigation.getParam('ensamble', 'NO-ID')||{componentes:[]};
    const id_vehiculo = navigation.getParam('id_vehiculo', 'NO-ID');
    const componentesRespuesta = navigation.getParam('componentes', 'NO-ID');

    const items = componentes.map(({id_componente, descripcion, fallas}, index) => 
        <ItemComponente 
          key={index} 
          onPress={() => this.props.navigation.navigate('Fallas', {fallas: fallas})}>
          {descripcion}
        </ItemComponente>
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
        <View style={{marginBottom: 30}}>
          <Titulo>Instrucción</Titulo>
          <Descripcion style={{textAlign: 'justify' }}>
            {instruccion}
          </Descripcion>
        </View>
        <ScrollView style={{paddingLeft: 30}}>
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
