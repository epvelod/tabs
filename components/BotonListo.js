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


export default class BotonListo extends React.Component {

  render() {

    return (

<TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:60,
       height:60,
       backgroundColor:'#000',
       borderRadius:30,
     }}

	onPress={() => this.props.onPress()}
 >
      <Icon.FontAwesome
        name="check"
        size={26}
        color='#fff'
      />
 </TouchableOpacity>


    );
  }
}

