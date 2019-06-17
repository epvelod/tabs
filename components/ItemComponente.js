import React from 'react';
import {
  StyleSheet,
  CheckBox,
  Text,
  View,
  TouchableHighlight, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  TouchableWithoutFeedback, 
} from 'react-native';

import { Icon } from 'expo';

import Colors from '../constants/Colors';
import { MonoText, Titulo, SubTitulo, Descripcion, Dato } from '../components/StyledText';


export default class ItemComponente extends React.Component {

  render() {
    return (
    	<View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
      }}>
      	<View style={{ 
          flexDirection: 'row'}}>
          		<CheckBox value={this.props.value}
              onChange={()=>this.props.onChange()}></CheckBox>
          		<Descripcion style={{marginTop: 5}}>
          		{this.props.children}
          		</Descripcion>
      	</View>
        <View style={{
          width: 80,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          }}>
          <View style={{
            width: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center', 
            }}>
            <TouchableWithoutFeedback onPress={() => this.props.onPress()} underlayColor="white">
              <View style={{
                height: 36,
                width: 36,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', 
                borderRadius: 4,
                }}>
                <Icon.FontAwesome
                  name="ellipsis-h"
                  size={22}
                  color={Colors.grisOscuro}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
    	</View>
    );
  }
}

