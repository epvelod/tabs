import React from 'react';
import {
  StyleSheet,
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


export default class ItemIntruccion extends React.Component {

  render() {
	const altura=80;
	const ancho=5;
	const diametro=18;
	const left=20;

    return (

				<TouchableWithoutFeedback onPress={() => this.props.onPress()}>
		<View style={{
		flexDirection: 'row',
			height: altura,
		}}>
			<View style={{
			      width: left*2
			  }}>
			  	<View
				  style={{
				    borderRightColor: Colors.grisClaro,
				    borderRightWidth: ancho,
				    position: 'absolute',
				    height: altura,  
				    width: ancho,
				    left: left
				  }}
				/>
			  	<View
				  style={{
				  	backgroundColor: Colors.grisOscuro,
				    position: 'absolute',
			        borderRadius: diametro/2,
				    height: diametro,  
				    width: diametro,
				    left: left-diametro/2+ancho/2,
				    top: ((altura-diametro)/2),
				  }}
				/>
			</View>
			<View style={{flex: 1,
			  backgroundColor: '#fff', 
			  }}>
			    <Descripcion style={{}}>Inspeccione visual y manualmente con el motor encendido...</Descripcion>
			</View>
		</View>
				</TouchableWithoutFeedback>
    );
  }
}

