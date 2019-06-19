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


export default class CheckItem extends React.Component {

  render() {

    return (

  					<TouchableNativeFeedback onPress={() => this.props.onPress()}>
						<View style={{ flexDirection: 'row' }}>
			        		<CheckBox></CheckBox>
			        		<Descripcion style={{marginTop: 5,color: Colors.grisOscuro, fontWeight: 'bold'}}>
			        		{this.props.children}
			        		</Descripcion>
						</View>
  					</TouchableNativeFeedback>


    );
  }
}

