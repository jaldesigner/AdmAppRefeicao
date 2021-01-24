import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const Loading = (props) => {
  if (props.animacao) {
    return (
      <View style={StyleModal.container}>
        <View style={StyleModal.boxLogin}>
          <ActivityIndicator size='large' color='#F64000' />
        </View>
      </View>
    );
  }
  
}

const StyleModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3043',
    opacity: 0.98,
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLogin:{
    backgroundColor:'#fff',
    width:100,
    height: 100,
    justifyContent:'center',
    borderRadius: 15,
  }
});