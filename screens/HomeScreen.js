import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
} from 'react-native';

import { FileSystem, AppLoading } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion,TituloPequeno ,SubTituloPequeno} from '../components/StyledText';
import Item from '../components/Item';
import CheckItem from '../components/CheckItem';
import BotonListo from '../components/BotonListo';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import vehiculos from '../data/vehiculos.json';
import usuario from '../data/usuario.json';

import { Icon } from 'expo';



const client = new ApolloClient({
  uri: "http://10.0.0.20:8080/graphql/"
  //uri: "http://10.108.162.233:8080/graphql/"
});

export default class HomeScreen extends React.Component {


  state = {
    isLoadingComplete: false,
    modalVisible: false,
    selectedSerch: ['cliente','ubicación'],
    vehiculos: vehiculos
  };

  static navigationOptions = {
    header: null,
  };

  _loadResourcesAsync = async () => {
  };


  info = async () => {
    console.log('this.state');

  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ ...this.state, isLoadingComplete: true });
  };

  toggleModal = () => {
    console.log(this.state.modalVisible);
    this.setState({ modalVisible: !this.state.modalVisible });
    console.log(this.state.modalVisible);
  };


  filtrar = ({text}) => {
    const vehiculosF = vehiculos.filter(({ normatividad_vehiculo_persona }, index) => {

    console.log(this.state.selectedSerch.includes('cliente') && this.state.selectedSerch.includes('ubicación'));
    console.log(normatividad_vehiculo_persona.vehiculo.codigo_vehiculo);
    console.log(text);

        if(this.state.selectedSerch.includes('cliente') && this.state.selectedSerch.includes('ubicación')) {
          return normatividad_vehiculo_persona.vehiculo.codigo_vehiculo.includes(text) || normatividad_vehiculo_persona.vehiculo.ubicacion.estado.includes(text);
        }
        if(this.state.selectedSerch.includes('cliente')) {
          return normatividad_vehiculo_persona.vehiculo.codigo_vehiculo.includes(text);
        }
        if(this.state.selectedSerch.includes('ubicación')) {
          return normatividad_vehiculo_persona.vehiculo.ubicacion.estado.includes(text);
        }
      }
    );
    console.log(vehiculosF);
    this.setState({...this.state,vehiculos:vehiculosF});
  }

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


    const items = this.state.vehiculos.map(({ normatividad_vehiculo_persona }, index) => 
                     <Item 
                      key={index} 
                      titulo={normatividad_vehiculo_persona.vehiculo.codigo_vehiculo}
                      estatus={normatividad_vehiculo_persona.vehiculo.estatus}
                      onEvaluar={() => this.props.navigation.navigate('Instrucciones', { id_vehiculo: normatividad_vehiculo_persona.vehiculo.id_vehiculo })}
                      onGrafica={() => this.props.navigation.navigate('Instrucciones')}
                      onDescargar={() => this.props.navigation.navigate('Formulario')}>
                        {normatividad_vehiculo_persona.vehiculo.descripcion}
                      </Item> 
                  );

    const placeholder = "Buscar ["+this.state.selectedSerch.join("|")+"]";


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
                <Titulo>Verificaciones</Titulo>
              </TouchableWithoutFeedback>
              </View>
              <View style={{marginBottom: 40}}>
                <Descripcion>Recuerda descargar y subir tus formas usando el icono de nube.</Descripcion>
              </View>


              <View style={{
                height: 40,
                backgroundColor: '#fff', 
                padding: 5,
                    borderColor: 'gray', 
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 20
                }} >
                <View style={{
                  flex: 1, 
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  }}>
                  <Icon.FontAwesome
                    name="search"
                    size={25}
                    color="#e1e1e1"
                    style={{ 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    width: 25,
                    }}
                    />
                  <TextInput style={{ 
                    flex: 1, 
                    marginLeft: 5,
                    }} 
                    placeholder={placeholder}
                    placeholderTextColor="#808080" 
                    onChangeText={(text) => this.filtrar({text})} />


                  <TouchableWithoutFeedback
                    onPress={this.toggleModal}>
                    <Icon.FontAwesome
                      name="filter"
                      size={25}
                      color={Colors.negro}
                      style={{ 
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                      width: 25,
                      }}
                      />
                  </TouchableWithoutFeedback>
                </View>
              </View>


              <View>
                {items}
              </View>

            </View>


            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View style={{
                  paddingHorizontal: 20,
                }}>
                  <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                  }}>
                    <TituloPequeno>Filtros</TituloPequeno>
                    <TouchableWithoutFeedback
                      onPress={this.toggleModal}>
                      <Icon.FontAwesome
                        name="close"
                        size={25}
                        color={Colors.gris}
                        style={{ 
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        width: 25,
                        marginTop: 16,
                        }}
                        />
                    </TouchableWithoutFeedback>
                  </View>
                  <View
                    style={{
                      borderBottomColor: Colors.grisClaro,
                      borderBottomWidth: 1,
                    }}
                  />
                  
                  <SubTituloPequeno style={{marginTop: 10}}>Busqueda</SubTituloPequeno>
                    <CheckItem>Cliente</CheckItem>
                    <CheckItem>Ubicación</CheckItem>
                  
                  <SubTituloPequeno style={{marginTop: 10}}>Estatus</SubTituloPequeno>
                    <CheckItem>Pendiente</CheckItem>
                    <CheckItem>En proceso</CheckItem>
                    <CheckItem>Rechazada</CheckItem>
                    <CheckItem>Aprobada</CheckItem>
                    
                  <SubTituloPequeno style={{marginTop: 10}}>Cargas</SubTituloPequeno>
                    <CheckItem>Pendiente</CheckItem>
                    <CheckItem>Error de carga</CheckItem>
                    <CheckItem>Cargada</CheckItem>
                  
        <View style={{marginLeft: 10, marginBottom: 20, alignItems: 'flex-end' }}>
          
                  <BotonListo
                  onPress={this.toggleModal}>
                  </BotonListo>
          </View>

                </View>
              </View>
            </Modal>

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
