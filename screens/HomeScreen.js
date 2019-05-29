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
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Card from '../components/Card';
import { bookListQuery } from '../constants/Queries';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://10.0.0.20:8080/graphql/"
});

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { hide:[]};
  }

  _onPressButton(id) {
    this.state.hide.push(id);
    this.setState( { hide: this.state.hide } );
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
              <Query query={gql`{
                    bookList { 
                      id 
                      name 
                      pageCount
                    } 
                  }
                `}>
                {({ loading, error, data }) => {
                  if (loading) return (<ActivityIndicator/>);
                  if (error) return (<ActivityIndicator/>);

                  return data.bookList.map(({ id, name, pageCount }, index) => {


                    if(!this.state.hide.includes(id)) {
                     return (<Card
                       key={index}
                       title={'i-'+index}
                       name={name}
                       pageCount={pageCount} 
                       onPress={() => this.props.navigation.navigate('Formulario')}>
                     </Card> );
                    }

                    return (null);
                  });
                }}
              </Query>

            </View>
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
