import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { AppLoading, FileSystem } from 'expo';

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import BotonListo from '../components/BotonListo';
import ItemComponente from '../components/ItemComponente';

import Colors from '../constants/Colors';

export default class Instruccion extends React.Component {
  folderPath = `${FileSystem.documentDirectory}formas`;
  static navigationOptions = {
    header: null,
  };
  state={
    isLoadingComplete: false,
    /*data*/
    selecteds:[],
    traza: {},
    respuestas: {},
    data: {},
  }

  constructor(props){
    super(props);
  }

  /*Loading method*/
  _loadResourcesAsync = async () => {
    /*rescue information*/
    const { navigation } = this.props;

    const traza = navigation.getParam('traza', undefined);
    const content =  await FileSystem.readAsStringAsync(`${this.folderPath}/respuestas.json`, { encoding: FileSystem.EncodingTypes.UTF8 });
    const respuestas = JSON.parse(content)||[];
    const data = navigation.getParam('data', {instruccion:'...',componentes:[]});

    console.log(traza);
    console.log(respuestas);
    console.log(data);
    this.setState({ 
      ...this.state, 
      isLoadingComplete: true,
      traza: traza,
      respuestas: respuestas,
      data: data, 
    });
  };
  _handleLoadingError = error => {
  };
  _handleFinishLoading = () => {
    this.setState({ ...this.state, isLoadingComplete: true });
  };

  _onChange(index){
    const selecteds = this.state.selecteds;
    selecteds[index] = !selecteds[index];
    
    const componente = this.state.data.componentes[index];

    this.setState({
      ...this.state,
      selecteds: selecteds,
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
    /*build itmes*/
    const items = this.state.data.componentes.map(({id_componente, descripcion, fallas}, index) => {
        return (<ItemComponente 
          key={index} 
          onPress={() => this.props.navigation.navigate('Fallas', {fallas: fallas})}
          value={this.state.selecteds[index]}
          onChange={()=>this._onChange(index)}>
          {descripcion}
        </ItemComponente>);
        }
      );
    /*view*/
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
          <Titulo>Instrucción o Prueba</Titulo>
          <Descripcion style={{textAlign: 'justify' }}>
            {this.state.data.instruccion}
          </Descripcion>
        </View>
        <ScrollView style={{paddingLeft: 10}}>
          {items}
        </ScrollView>
        <View style={{marginLeft: 10, marginBottom: 20, alignItems: 'flex-end' }}>
          <BotonListo 
            onPress={() => this.props.navigation.goBack()}
            ></BotonListo>
          </View>
        </View>
      </View>
    );
  }

}
