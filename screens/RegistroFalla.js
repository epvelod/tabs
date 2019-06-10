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
import { WebBrowser } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion, SubTitulo } from '../components/StyledText';
import Card from '../components/Card';
import ItemAccion from '../components/ItemAccion';
import BotonListo from '../components/BotonListo';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

import { Icon } from 'expo';

import accion from '../data/accion.json';

export default class RegistroFalla extends React.Component {

  constructor(props){
    super(props);

  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const id_falla = navigation.getParam('id_falla', 'NO-ID');

    const items = accion.map(({id_accion_falla, descripcion}, index) => 
        <ItemAccion key={index} >
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
    		<View style={{marginBottom: 50,
              marginTop: 20,
        			flexDirection: 'row',
        			justifyContent: 'space-evenly',}}>
    			<View style={{
    				width: 80,
    				height: 80,
    				backgroundColor: Colors.grisOscuro,
    				borderRadius: 5,
    				alignItems: 'center',
    				justifyContent: 'center',
    			}}>
						<Icon.FontAwesome
							name="camera"
							size={25}
							color='#fff'
							/>
    			</View>
    		</View>
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
