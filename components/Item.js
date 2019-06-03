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


export default class Item extends React.Component {

  render() {
	const level = [
		Colors.pendiente,
		Colors.modificado,
		Colors.completo];

    return (
		<View style={{
		minHeight: 80,
		flexDirection: 'row',
		marginBottom: 10
		}}>
			<View style={{
	              width: 60,
	              flexDirection: 'column',
	              justifyContent: 'center',
	              alignItems: 'stretch',
			  }}>
			      <Icon.FontAwesome
			        name="database"
			        size={26}
			        style={{  }}
			        color={Colors.grisOscuro}
			      />
			      <Icon.FontAwesome
			        name="cloud"
			        size={26}
			        style={{ paddingLeft: 10 }}
			        color={level[Math.floor( Math.random()*3)]}
			      />
			</View>
			<View style={{flex: 4,
			  backgroundColor: '#fff', 
			  borderTopRightRadius: 10,
			  borderBottomRightRadius: 10
			  }}>
			  <View style={{flex: 1,
			  flexDirection: 'column',
			  justifyContent: 'space-evenly',
			  padding: 5}}>
			    <SubTitulo>Veihículo 1</SubTitulo>
			    <Descripcion style={{textAlign: 'right'}}>Resumen de la encuesta e información del vehículo</Descripcion>
			  </View>
			</View>

			<TouchableWithoutFeedback onPress={() => this.props.onEvaluar()} underlayColor="white">
				<View style={{
		          width: 60,
				  flexDirection: 'column',
				  justifyContent: 'center',
				  alignItems: 'stretch',
				  }}>
		            <View style={{
		              height: 60,
		              width: 60,
		              flexDirection: 'column',
		              justifyContent: 'center',
		              alignItems: 'stretch',
		              backgroundColor: Colors.grisOscuro, 
		              borderRadius: 30,
		              }}>
		                <Text style={{
		                  fontWeight: 'bold',
		                  color: '#fff',
		                  textAlign: 'center',
		                  fontSize: 11,
		                  }}>
		                  Evaluar
		                </Text>
		            </View>
		            <View style={{
		              height: 10,
		              flexDirection: 'column',
		              justifyContent: 'center',
		              alignItems: 'stretch',
		              }}>
		                <Dato>
		                  60%
		                </Dato>
		            </View>
				</View>
			</TouchableWithoutFeedback>
		</View>
    );
  }
}

