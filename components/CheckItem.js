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
  constructor(props) {
    super(props);
    this.state = {
      value:props.value,
      selected: props.checked,
    };
  }
  _onChange() {
    this.props.onChange(this.state.value, !this.state.selected);

    this.setState({
      ...this.state,
      selected: !this.state.selected
    });
  }

  render() {

    return (

  					<TouchableNativeFeedback >
						<View style={{ flexDirection: 'row' }}>
			        		<CheckBox value={this.state.selected}
                  onChange={()=>this._onChange()}>
                  </CheckBox>
			        		<Descripcion style={{marginTop: 5,color: Colors.grisOscuro, fontWeight: 'bold'}}>
			        		{this.props.children}
			        		</Descripcion>
						</View>
  					</TouchableNativeFeedback>


    );
  }
}

