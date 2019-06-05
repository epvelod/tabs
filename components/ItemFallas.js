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


export default class ItemFallas extends React.Component {

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
			  justifyContent: 'space-evenly',
			  padding: 5}}>
	    		<CheckBox></CheckBox>
	    		<Descripcion style={{marginTop: 5, marginLeft: 10}}>
	    		Abollado o roto por contacto externo
	    		</Descripcion>
			  </View>
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

						<TouchableWithoutFeedback onPress={() => this.props.onGrafica()} underlayColor="white">
				            <View style={{
				              height: 36,
				              width: 36,
				              flexDirection: 'column',
				              justifyContent: 'center',
				              alignItems: 'center', 
				              borderRadius: 4,
				              }}>
								<Icon.FontAwesome
									name="info"
									size={22}
									color={Colors.grisOscuro}
								/>
				                
				            </View>
						</TouchableWithoutFeedback>

						<TouchableWithoutFeedback onPress={() => this.props.onEvaluar()} underlayColor="white">
				            <View style={{
				              height: 36,
				              width: 36,
				              flexDirection: 'column',
				              justifyContent: 'center',
				              alignItems: 'center', 
				              borderRadius: 4,
				              }}>
								<Icon.FontAwesome
									name="wpforms"
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
