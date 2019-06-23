import React from 'react';
import {
  Alert,
  Button,
  DatePickerAndroid,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  CheckBox,
} from 'react-native';

import { FileSystem, Camera, Permissions } from 'expo';

import { MonoText, Titulo, Descripcion, SubTitulo } from '../components/StyledText';
import Card from '../components/Card';
import ItemAccion from '../components/ItemAccion';
import BotonListo from '../components/BotonListo';
import BotonCamara from '../components/BotonCamara';
//import BotonIcon from '../components/BotonIcon';
import ButtonGroup from '../components/ButtonGroup';

import Colors from '../constants/Colors';

import { Icon } from 'expo';

export default class RegistroFalla extends React.Component {
  static navigationOptions = {
    header: null,
  };
	state = {
    /*Vista*/
    modalVisible:false,
    modalVisibleImg:false,
    /*Datos*/
		selectedIndex: 0,
		fechaAgendacion: new Date(),
		valor:'',
    /*Camara*/
    hasCameraPermission: null,
    photoFile:undefined
	}
  constructor(props){
    super(props);
  }
  async componentWillMount() {
    //Getting Permission result from app details.
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({...this.state,  hasCameraPermission: status === 'granted' });
  }
	async _updateIndex(selectedIndex) {
		let fecha;
		if(selectedIndex===1) {
			fecha = await this._selectDate();
		}
	  this.setState({...this.state, selectedIndex:selectedIndex,fechaAgendacion:fecha});
	}
	async _selectDate(){
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				date: new Date(),
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				return new Date(year, month, day)
			}
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}
  async _snap() {
    let photo = undefined;
    console.log('snap');
    if (this.camera) {
      photo = await this.camera.takePictureAsync();
      console.log('photo');
      console.log(photo);
    }
    this.setState({...this.state, modalVisible: false, photoFile: photo})
  };

  _onClose(index) {
    if(index===1) {
      this.setState({...this.state, modalVisible: false})
    } else {
      this.setState({...this.state, modalVisibleImg: false})
    }
  }

  render() {
    const { navigation } = this.props;
    const traza = navigation.getParam('traza', {});
    const options = ['Reparar','Agendar','Registrar Valor'];
    let extra;

    let camaraView;
    let foto;
    let iconFoto;
    
    /*Valores especiales*/
    if(this.state.selectedIndex===1) {
    	const f = this.state.fechaAgendacion;
			const textFecha = f.getDate() + "/"+ f.getMonth()+ "/" +f.getFullYear();
    	extra = (
    		<View style={{marginBottom: 20}}>
    			<SubTitulo style={{textAlign: 'center' }}>Fecha agendada de reparación: </SubTitulo>
    			<Text style={{
    				textAlign: 'center',
    				fontSize: 20,
    				padding: 5
    			}}>
    			{textFecha}
    			</Text>
    		</View>
    	);
    }else if(this.state.selectedIndex===2) {
    	extra = (
    		<View style={{marginBottom: 20}}>
    			<SubTitulo>Ingrese un valor: </SubTitulo>
    			<TextInput style={{
            borderColor: 'gray', 
            borderWidth: 1,
            borderRadius: 2,
          	marginTop: 15,
          	paddingLeft: 10,
          	height: 30}} 
          placeholder="ej. 120 psi"
          placeholderTextColor="#808080" 
    			onChangeText={(text) => this.setState({...this.state,valor:text})}
        	value={this.state.valor}
    			/>
    		</View>
    	);
    }

    /*Camara*/
    if (this.state.hasCameraPermission) {
      camaraView = (
        <View style={{height: '100%',width: '100%'}}>
          <Camera style={{height: '100%',width: '100%'}} 
          type={Camera.Constants.Type.back} 
          ref={ref => { this.camera = ref; }} >
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'flex-end' ,margin: 50 }}>
              <BotonCamara onPress={() => {this._snap()}}>
              </BotonCamara>
            </View>
          </Camera>
        </View>
      );
    } 
    /*Fotos*/
    if(this.state.photoFile) {
      foto =(
        <View style={{
          alignItems: 'center' ,
        }}>
          <Image
            style={{
              width: '85%', 
              height: '85%'}}
            source={{uri: this.state.photoFile.uri}}
            resizeMode="contain"
          />
        </View>
      );
      // iconFoto = (
      //   <BotonIcon
      //   icon="picture-o" 
      //   onPress={() => this.setState({...this.state, modalVisibleImg: true})}>
      //   </BotonIcon>
      // );
    }

    return (

    <View style={{
    	flex: 1,}}>
    	<View style={{
    		height: 25,
    		backgroundColor: Colors.negro}}>
    	</View>
    	<View style={{
    		flex: 1,
    		alignItems: 'stretch',
    		backgroundColor: '#fff',
    		paddingVertical: 10,
    		paddingHorizontal: 20,
    		}}>
    		<View style={{marginBottom: 20}}>
    			<Titulo>Valoración de Fallas y Evidencia</Titulo>
    		</View>
    		<View style={{marginBottom: 20}}>
    			<SubTitulo>Acciones:</SubTitulo>
    		</View>
    		<View style={{marginBottom: 20, minHeight: 60}}>
				  <ButtonGroup
			    onPress={(e)=>this._updateIndex(e)}
			    selectedIndex={this.state.selectedIndex}
			    buttons={options} />
    		</View>
    		{extra}
        <View style={{
          marginLeft: 10, 
          marginBottom: 20, 
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'flex-end' 
        }}>
          <BotonCamara 
          onPress={() => this.setState({...this.state, modalVisible: true})}>
          </BotonCamara>
          {iconFoto}
          <BotonListo 
          onPress={() => this.props.navigation.goBack()}>
          </BotonListo>
        </View>
    	</View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={()=>this._onClose(1)}>
        {camaraView}
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisibleImg}
        onRequestClose={()=>this._onClose(2)}>
        {foto}
        <View style={{
          marginLeft: 10, 
          marginBottom: 20, 
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'flex-end' 
        }}>
          <BotonCamara 
          onPress={() => this.setState({...this.state, modalVisibleImg: false, modalVisible: true})}>
          </BotonCamara>
          <BotonListo 
          onPress={() => this.setState({...this.state, modalVisibleImg: false})}>
          </BotonListo>
        </View>
      </Modal>
    </View>
    );
  }

}
