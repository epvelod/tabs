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
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
  }
  
  _onItemClick(traza,respuestas,ensamble){
    traza.instruccion.ensamble = {};
    traza.instruccion.ensamble.id_ensamble = ensamble.id_ensamble;
    traza.instruccion.ensamble.componentes = ensamble.id_ensamble;
    this.props.navigation.navigate('Instruccion', 
    {
      traza:traza,
      respuestas:respuestas,
      data: ensamble
    });
  }

  render() {
    /*rescue information*/
    const { navigation } = this.props;
    const traza = navigation.getParam('traza', 
      {
        id_vehiculo:-1,
        id_normatividad: -1,
        instruccion:{}
      });
    /*find or build information*/
    const formulario = formularios.filter((e) => e.id_normatividad === traza.id_normatividad)[0] || {instrucciones:[]};
    const respuesta = respuestas.filter(
        (e) => e.id_normatividad === traza.id_normatividad
                && e.id_normatividad === traza.id_normatividad
      )[0] || {
        id_vehiculo: traza.id_vehiculo,
        id_normatividad: traza.id_normatividad,
        instrucciones: []
      };
    /*build items*/
    const items = formulario.instrucciones.map((ensamble, index) => {
      const marked = (respuesta.instrucciones.length>0) 
        && (ensamble.id_ensamble <= respuesta.instrucciones[respuesta.instrucciones.length-1].id_ensamble);
      const selected = (respuesta.instrucciones.length>0) 
        && (ensamble.id_ensamble == respuesta.instrucciones[respuesta.instrucciones.length-1].id_ensamble);
      const {componentes} = respuesta.instrucciones.filter((e) => e.id_ensamble === ensamble.id_ensamble)[0]||{};

        return (<ItemIntruccion 
                key={index} 
                onPress={() => this._onItemClick(traza,respuestas,ensamble)}
                marked={marked}
                selected={selected}>
                  {ensamble.instruccion}
                </ItemIntruccion>)
      }
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
                <Titulo>Procedimiento de verificación</Titulo>
              </View>
        	<ScrollView>
              {items}
        	</ScrollView>
            </View>
          </View>
    );
  }

}
