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

import formularios from '../data/formularios.json';
import respuestas from '../data/respuestas.json';

export default class Instrucciones extends React.Component {
  


  constructor(props){
    super(props);

  }



  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const id_vehiculo = navigation.getParam('id_vehiculo', 'NO-ID');
    const formulario = formularios.filter((e) => e.id_vehiculo === id_vehiculo)[0]||{instrucciones:[]};

    const items = formulario.instrucciones.map((ensamble, index) => 
        <ItemIntruccion 
          key={index} 
          onPress={() => this.props.navigation.navigate('Instruccion', {ensamble:ensamble})}
          marked={true}
        >
          {ensamble.instruccion}
        </ItemIntruccion>
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
                <Titulo>Intrucciones</Titulo>
              </View>
        	<ScrollView>
              {items}
        	</ScrollView>
            </View>
          </View>
    );
  }

}
