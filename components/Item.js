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
	              width: 45,
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
			    <SubTitulo>Vehículo 1</SubTitulo>
			    <Descripcion style={{fontSize: 12}}>Resumen de la encuesta e información del vehículo</Descripcion>
			  </View>
			</View>

				<View style={{
		          width: 80,
				  flexDirection: 'column',
				  justifyContent: 'center',
				  alignItems: 'stretch',
				  }}>
		            <View style={{
		              height: 60,
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
			              	  backgroundColor: Colors.gris,
				              borderRadius: 18,
				              }}>
								<Icon.FontAwesome
									name="bar-chart"
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
			              	  backgroundColor: Colors.gris,
				              borderRadius: 18,
				              }}>
								<Icon.FontAwesome
									name="calendar-check-o"
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

