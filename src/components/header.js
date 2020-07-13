/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Image,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Subtitle,
  Button,
  Icon,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export const BtnNav = () => {
  const navigation = useNavigation();
  return (
    <View style={estilo.BoxMenu}>
      <TouchableOpacity
        style={estilo.btnDrawer}
        transparent
        onPress={() => navigation.openDrawer()}>
        <Icon type="FontAwesome5" name="bars" style={{color: '#fff'}} />
      </TouchableOpacity>
    </View>
  );
};

export function Cabecalho({titulo, subtitulo}) {
  //const navigation = useNavigation();
  return (
    <>
      <View style={estilo.BoxtextTitulo}>
        <Title style={estilo.titulo}>{titulo}</Title>
        <Subtitle>{subtitulo}</Subtitle>
      </View>
    </>
  );
}

const estilo = StyleSheet.create({
  btnDrawer: {
    backgroundColor: '#3E4168',
    width: 50,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 7,
    borderWidth: 1,
    borderColor: '#3E4198',
    borderStyle: 'solid',
    position: 'absolute',
    top: 0,
    alignSelf: 'flex-start',
    zIndex:1,
  },
  BoxtextTitulo: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  BoxMenu: {
    marginTop: 15,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
