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

import { MonoText, Titulo, Descripcion } from '../components/StyledText';
import Card from '../components/Card';
import ItemFallas from '../components/ItemFallas';

import { bookListQuery } from '../constants/Queries';
import Colors from '../constants/Colors';

export default class Fallas extends React.Component {
  


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
				<View style={{marginBottom: 20}}>
					<Titulo>Fallas</Titulo>
				</View>
	        	<ScrollView>
	        		<ItemFallas></ItemFallas>
	        	</ScrollView>
				<View style={{marginBottom: 10}}>
			        <Button
			          title="Listo"
			          color={Colors.negro}
			          style={{
			          }}
			          onPress={() => this.props.navigation.navigate('Instruccion')}
			        />
				</View>
            </View>
          </View>
    );
  }

}
