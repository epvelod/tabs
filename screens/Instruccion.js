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
  TouchableNativeFeedback,
} from 'react-native';
import { WebBrowser } from 'expo';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import Item from '../components/Item';
import BotonListo from '../components/BotonListo';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

export default class Instruccion extends React.Component {
  


  constructor(props){
    super(props);

  }



  static navigationOptions = {
    header: null,
  };

  render() {
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
					<Titulo>Intrucción</Titulo>
					<Descripcion style={{textAlign: 'justify' }}>Inspeccione visual y manualmente con el motor encendido, presionando manualmente el pedal del acelerador y soltandolo.
					Al soltar el pedal el motor debe regresar a la posiciòn no acelerada.
					</Descripcion>
				</View>
	        	<ScrollView style={{paddingLeft: 30}}>
  					<TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Fallas')}>
						<View style={{ flexDirection: 'row' }}>
			        		<CheckBox></CheckBox>
			        		<Descripcion style={{marginTop: 5}}>
			        		Pedal del acelerador
			        		</Descripcion>
						</View>
  					</TouchableNativeFeedback>

					<View style={{ flexDirection: 'row' }}>
		        		<CheckBox></CheckBox>
		        		<Descripcion style={{marginTop: 5}}>
		        		Sensor
		        		</Descripcion>
					</View>

					<View style={{ flexDirection: 'row' }}>
		        		<CheckBox></CheckBox>
		        		<Descripcion style={{marginTop: 5}}>
		        		Soporte del pedal del acelerador
		        		</Descripcion>
					</View>

					<View style={{ flexDirection: 'row' }}>
		        		<CheckBox></CheckBox>
		        		<Descripcion style={{marginTop: 5}}>
		        		Acoplamiento
		        		</Descripcion>
					</View>
	        	</ScrollView>
				<View style={{margin: 10, alignItems: 'flex-end' }}>
					<BotonListo 
			          onPress={() => this.props.navigation.navigate('Instruccion')}
			          ></BotonListo>
				</View>
            </View>
          </View>
    );
  }

}
