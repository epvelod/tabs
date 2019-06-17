import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import BotonListo from '../components/BotonListo';
import ItemComponente from '../components/ItemComponente';

import Colors from '../constants/Colors';

export default class Instruccion extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state={
    selecteds:[],
  }
  constructor(props){
    super(props);
  }
  _onChange(index){
    console.log(index);
    const selecteds = this.state.selecteds;
    selecteds[index] = !selecteds[index];
    console.log(selecteds);
    this.setState({
      ...this.state,
      selecteds: selecteds,
    });
  }
  render() {
    /*rescue information*/
    const { navigation } = this.props;
    const traza = navigation.getParam('traza', undefined);
    const respuestas = navigation.getParam('respuestas', undefined);
    const {componentes,instruccion} = navigation.getParam('data', {instruccion:'...',componentes:[]});
    console.log(traza);
    console.log(respuestas);
    /*build itmes*/
    const items = componentes.map(({id_componente, descripcion, fallas}, index) => {
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
            {instruccion}
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
