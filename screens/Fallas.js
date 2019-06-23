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
import { FileSystem } from 'expo';

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import ItemFallas from '../components/ItemFallas';
import BotonListo from '../components/BotonListo';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import fallas from '../data/fallas.json';

export default class Fallas extends React.Component {
  folderPath = `${FileSystem.documentDirectory}formas`;
  static navigationOptions = {
    header: null,
  };
  state = {
    selecteds:[],
    traza:{},
    respuestas:[],
    instruccionesA:{},
    fallasAns:[],
    fallas:[]
  };
  
  constructor(props){
    super(props);

  }
  async componentWillMount() {
        /*rescue information*/
    const { navigation } = this.props;

    const traza = navigation.getParam('traza', undefined);
    const listaFallas = navigation.getParam('fallas',[]);

    const content =  await FileSystem.readAsStringAsync(`${this.folderPath}/respuestas.json`, { encoding: FileSystem.EncodingTypes.UTF8 });
    const respuestas = JSON.parse(content)||[];

    const vihiculosA = respuestas.filter((e) => e.id_vehiculo === traza.id_vehiculo && e.id_normatividad === traza.id_normatividad )[0];
    const instruccionesA = vihiculosA.instrucciones.filter((e) => e.id_ensamble === traza.instruccion.ensamble.id_ensamble )[0];
    const fallasA = instruccionesA.componentes.filter(e=>e.id_componente===traza.instruccion.ensamble.componente.id_componente)[0].fallas||[];

    console.log('fallas');
    console.log(fallas);
    console.log('listaFallas');
    console.log(listaFallas);
    const falla = fallas.filter((e) => {
      for (var i = 0; i < listaFallas.length; i++) {
        if(listaFallas[i]===e.id_falla)
          return true;
      }
    });


    this.setState({
      ...this.state,
      traza: traza,
      respuestas: respuestas,
      instruccionesA: instruccionesA,
      fallasAns:fallasA,
      fallas: falla
    });
  }

  _readAns() {

  }

  async _selectedChange(index,id_falla) {
    this.state.selecteds[index] = !this.state.selecteds[index];
    this._writeChanges();

    await FileSystem.writeAsStringAsync(`${this.folderPath}/respuestas.json`, 
      JSON.stringify(this.state.respuestas), 
      { encoding: FileSystem.EncodingTypes.UTF8 });

    this.setState({...this.state, selecteds: this.state.selecteds});
  }

  _writeChanges() {
    const traza = this.state.traza;
    const selects = this.state.selecteds;
    const fallas = this.state.fallas;
    const selectedElem = fallas.filter((e,index)=>selects[index]);
    const falRes = this.state.fallasAns.filter(it=>selectedElem.filter(e=>e.id_falla==it.id_falla)!=false);
    const componentes = this.state.instruccionesA.componentes;

    for (var i = 0; i < selects.length; i++) {
      if(selects[i]
        && falRes.filter(e=>e.id_falla==fallas[i].id_falla)==false) {
        falRes.push({
          id_falla : fallas[i].id_falla,
          acciones:[]
        });
      }
    }

    componentes.filter(e=>e.id_componente===traza.instruccion.ensamble.componente.id_componente)[0].fallas = falRes;
    console.log('falRes');
    console.log(falRes);
  }
  render() {
    const { navigation } = this.props;
    const listaFallas = navigation.getParam('fallas', []);
    const traza = this.state.traza;
    const falla = this.state.fallas;
    console.log('falla');
    console.log(falla);
    const items = falla.map(({id_falla, descripcion}, index) => 
        <ItemFallas 
        key={index} 
        onPress={() => this.props.navigation.navigate('RegistroFalla', {id_falla:id_falla})}
        onInfo={() => this.props.navigation.navigate('Valoracion', {id_falla:id_falla})}
        value={this.state.selecteds[index]}
        onChange={()=>this._selectedChange(index, id_falla)}>
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
           <Titulo>Tipo de&nbsp;
            <Text onPress={() => Linking.openURL('http://google.com')}
            style={{textDecorationLine: "underline"}}>Falla
              </Text>
            </Titulo>
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
