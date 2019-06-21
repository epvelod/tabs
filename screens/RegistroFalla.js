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

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion, SubTitulo } from '../components/StyledText';
import ItemAccion from '../components/ItemAccion';
import BotonListo from '../components/BotonListo';
import BotonCamara from '../components/BotonCamara';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import { Icon } from 'expo';

import accion from '../data/accion.json';

export default class RegistroFalla extends React.Component {
  folderPath = `${FileSystem.documentDirectory}formas`;
  static navigationOptions = {
    header: null,
  };
  state={
    selecteds:[],
  }
  constructor(props){
    super(props);

  }

  async componentWillMount() {
        /*rescue information*/
    const { navigation } = this.props;

    const traza = navigation.getParam('traza', undefined);
    const listaFallas = navigation.getParam('listaFallas',[]);

    const content =  await FileSystem.readAsStringAsync(`${this.folderPath}/respuestas.json`, { encoding: FileSystem.EncodingTypes.UTF8 });
    const respuestas = JSON.parse(content)||[];
  }


  async _onChange(index,id_accion_falla) {
    this.state.selecteds[index] = !this.state.selecteds[index];

    this.setState({...this.state, selecteds: this.state.selecteds});

  }

  render() {
    const { navigation } = this.props;
    const id_falla = navigation.getParam('id_falla', 'NO-ID');

    const items = accion.map(({id_accion_falla, descripcion}, index) => 
        <ItemAccion key={index} 
        value={this.state.selecteds[index]}
        onChange={()=>this._onChange(index,id_accion_falla)}>
          {descripcion}
        </ItemAccion>

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
    			<Titulo>Registro de Fallas</Titulo>
    		</View>
    		<View style={{marginBottom: 20}}>
    			<SubTitulo>Acciones:</SubTitulo>
    		</View>
    		<ScrollView>
          {items}
    		</ScrollView>
        <View style={{
          marginLeft: 10, 
          marginBottom: 20, 
          justifyContent: 'flex-end' ,
          flexDirection: 'row',
          alignItems: 'flex-end' 
        }}>
          <BotonListo 
          onPress={() => this.props.navigation.goBack()}>
          </BotonListo>
        </View>
    	</View>
    </View>
    );
  }

}
