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
  TouchableWithoutFeedback,
} from 'react-native';

import { FileSystem, AppLoading } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Item from '../components/Item';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import vehiculos from '../data/vehiculos.json';
import usuario from '../data/usuario.json';



const client = new ApolloClient({
  uri: "http://10.0.0.20:8080/graphql/"
  //uri: "http://10.108.162.233:8080/graphql/"
});

export default class HomeScreen extends React.Component {


  state = {
    isLoadingComplete: false,
    texto: '',
  };

  static navigationOptions = {
    header: null,
  };

  _loadResourcesAsync = async () => {
  };


  info = async () => {

  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {


    const items = vehiculos.map(({ nomatividad_vehiculo_persona }, index) => 
                     <Item 
                      key={index} 
                      titulo={nomatividad_vehiculo_persona.vehiculo.codigo_vehiculo}
                      estatus={nomatividad_vehiculo_persona.vehiculo.estatus}
                      onEvaluar={() => this.props.navigation.navigate('Instrucciones', { id_vehiculo: nomatividad_vehiculo_persona.vehiculo.id_vehiculo })}
                      onGrafica={() => this.props.navigation.navigate('Instrucciones')}
                      onDescargar={() => this.props.navigation.navigate('Formulario')}>
                        {nomatividad_vehiculo_persona.vehiculo.descripcion}
                      </Item> 
                  );


    return (
      <ApolloProvider client={client}>
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
              <View>
              <TouchableWithoutFeedback onPress={this.info}>
                <Titulo>Revisiones</Titulo>
              </TouchableWithoutFeedback>
              </View>
              <View style={{marginBottom: 40}}>
                <Descripcion>Recuerda descargar y subir tus formas usando el icono de nube. {usuario.password} == {JSON.stringify(this.state.texto)}</Descripcion>
              </View>
              <View>
                {items}
              </View>

            </View>
          </View>
      </ApolloProvider>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
});
