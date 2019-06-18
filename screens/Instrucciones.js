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

import { AppLoading, FileSystem, } from 'expo';

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Item from '../components/Item';
import ItemIntruccion from '../components/ItemIntruccion';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import formularios from '../data/formularios.json';

export default class Instrucciones extends React.Component {
  folderPath = `${FileSystem.documentDirectory}formas`;
  static navigationOptions = {
    header: null,
  };
  state = {
    /*View*/
    isLoadingComplete: false,
    respuestas:[],
    respuesta:{},
    traza:{} 
  };
  constructor(props){
    super(props);
  }
  
  /*Loading method*/
  _loadResourcesAsync = async () => {
    /*rescue information*/
    const { navigation } = this.props;
    const traza = navigation.getParam('traza', 
      {
        id_vehiculo:-1,
        id_normatividad: -1,
        instruccion:{}
      });

    const formulario = formularios.filter((e) => e.id_normatividad === traza.id_normatividad)[0] || {instrucciones:[]};

    const content =  await FileSystem.readAsStringAsync(`${this.folderPath}/respuestas.json`, { encoding: FileSystem.EncodingTypes.UTF8 });
    const obj = JSON.parse(content)||[];
    let respuesta;
    let containAnswer = false;

    for (var i = 0; i < obj.length; i++) {
      if(obj[i].id_normatividad === traza.id_normatividad && obj[i].id_normatividad === traza.id_normatividad) {
        respuesta = obj[i];
        respuesta.instrucciones = respuesta.instrucciones.length > 0 ? respuesta.instrucciones: [formulario.instrucciones[0]];
        containAnswer = true;
      }
    }

    if(!containAnswer) {
      respuesta = {
        id_vehiculo: traza.id_vehiculo,
        id_normatividad: traza.id_normatividad,
        instrucciones: [formulario.instrucciones[0]]
      };
      
      obj.push(respuesta);

      await FileSystem.writeAsStringAsync(
        `${this.folderPath}/respuestas.json`, 
        JSON.stringify(obj), 
        { encoding: FileSystem.EncodingTypes.UTF8 });
    }

    console.log(obj);

    this.setState({
      ...this.state,
      respuestas:obj,
      respuesta:respuesta,
      traza:traza 
    });
  };

  _handleLoadingError = error => {
  };
  _handleFinishLoading = () => {
    this.setState({ ...this.state, isLoadingComplete: true });
  };
  _onItemClick(ensamble){
    this.state.traza.instruccion.ensamble = {};
    this.state.traza.instruccion.ensamble.id_ensamble = ensamble.id_ensamble;
    this.state.traza.instruccion.ensamble.componentes = ensamble.id_ensamble;

    this.props.navigation.navigate('Instruccion', 
    {
      traza:this.state.traza,
      respuestas:this.state.respuestas,
      data: ensamble
    });
  }

  render() {
    /*Cargando...*/
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 

    /*find or build information*/
    const formulario = formularios.filter((e) => e.id_normatividad === this.state.traza.id_normatividad)[0] || {instrucciones:[]};
    const respuesta = this.state.respuesta;
    console.log(respuesta);
    /*build items*/
    const items = formulario.instrucciones.map((ensamble, index) => {
      const marked = (respuesta.instrucciones.length>0) 
        && (ensamble.id_ensamble <= respuesta.instrucciones[respuesta.instrucciones.length-1].id_ensamble);
      const selected = (respuesta.instrucciones.length>0) 
        && (ensamble.id_ensamble == respuesta.instrucciones[respuesta.instrucciones.length-1].id_ensamble);
      const {componentes} = respuesta.instrucciones.filter((e) => e.id_ensamble === ensamble.id_ensamble)[0]||{};

        return (<ItemIntruccion 
                key={index} 
                onPress={() => this._onItemClick(ensamble)}
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
