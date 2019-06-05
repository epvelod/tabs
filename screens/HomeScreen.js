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

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';




const client = new ApolloClient({
  //uri: "http://10.0.0.20:8080/graphql/"
  uri: "http://10.108.162.233:8080/graphql/"
});

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { hide:[]};
  }

  _onPressButton(id) {
    this.state.hide.push(id);
    this.setState( { hide: this.state.hide } );
  }

  static navigationOptions = {
    header: null,
  };

  render() {
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
                <Titulo>Revisiones</Titulo>
              </View>
              <View style={{marginBottom: 40}}>
                <Descripcion>Recuerda descargar y subir tus formas usando el icono de nube.</Descripcion>
              </View>
              <Query query={gql`{
                    bookList { 
                      id 
                      name 
                      pageCount
                    } 
                  }
                `}>
                {({ loading, error, data }) => {
                  if (loading) return (<ActivityIndicator/>);
                  if (error) return (<ActivityIndicator/>);

                  return data.bookList.map(({ id, name, pageCount }, index) => {


                    if(!this.state.hide.includes(id)) {
                     return (<Item 
                      key={index} 
                      onEvaluar={() => this.props.navigation.navigate('Instrucciones')}
                      onGrafica={() => this.props.navigation.navigate('Instrucciones')}
                      onDescargar={() => this.props.navigation.navigate('Formulario')}></Item> );
                    }

                    return (null);
                  });
                }}
              </Query>

            </View>
          </View>
      </ApolloProvider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
});
