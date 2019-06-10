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


export default class ItemAccion extends React.Component {

  render() {

    return (


        <View style={{
        	flexDirection: 'row',
        	marginBottom: 10
        	}}>
        	<View style={{flex: 4,
        		backgroundColor: '#fff', 
        		borderTopRightRadius: 10,
        		borderBottomRightRadius: 10,
        		}}>
        		<View style={{flex: 1,
        			flexDirection: 'row',
        			justifyContent: 'flex-start' ,
        			padding: 5}}>
        			<CheckBox></CheckBox>
        			<Descripcion style={{marginTop: 5, marginLeft: 10}}>
        				{this.props.children}
        			</Descripcion>
        		</View>
        	</View>
        </View>



    );
  }
}

