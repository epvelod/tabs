import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  Modal, 
} from 'react-native';
import { WebBrowser, FileSystem  } from 'expo';
import { MonoText } from '../components/StyledText';
import Card from '../components/Card';
import { bookListQuery } from '../constants/Queries';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.168.43.210:8080/graphql/"
});

export default class Formulario extends React.Component {
  

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props){
    super(props);
    this.state = {
    	modalVisible: false,
  	};
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
                backgroundColor: '#07c'}}>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'stretch',
              backgroundColor: '#e1e1e1',
              padding: 10,
              }}>
              <Card
								title={'1'}
								name="Cuenta con"
								pageCount={0} 
								onPress = {()=>this.setModalVisible(!this.state.modalVisible)}>
							</Card>

            </View>
            <Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            Alert.alert('Modal has been closed.');
		          }}>
		          <View style={{marginTop: 22}}>
		            <View>
		              <Text>Hello World!</Text>

		              <TouchableHighlight
		                onPress={() => {
		                  this.setModalVisible(!this.state.modalVisible);
		                }}>
		                <Text>{FileSystem.documentDirectory}</Text>
		              </TouchableHighlight>
		            </View>
		          </View>
		        </Modal>
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
