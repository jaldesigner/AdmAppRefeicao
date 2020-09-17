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
import { useNavigation } from '@react-navigation/native';

export const BtnNav = () => {
  const navigation = useNavigation();
  return (
    <View style={estilo.BoxMenu}>
      <TouchableOpacity
        style={estilo.btnDrawer}
        transparent
        onPress={() => navigation.openDrawer()}>
        <Icon type="FontAwesome5" name="bars" style={{ color: '#fff' }} />
      </TouchableOpacity>
    </View>
  );
};

export function Cabecalho({ titulo, subtitulo }) {
  return (
    <View>
    <StatusBar backgroundColor="#3E4168" />
      <View style={estilo.BoxtextTitulo}>
        <Title style={estilo.titulo}>{titulo}</Title>
        <Subtitle>{subtitulo}</Subtitle>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  btnDrawer: {
    backgroundColor: '#3E4168',
    width: 50,
    marginTop: 7,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#56597E',
    borderStyle: 'solid',
    position: 'absolute',
    top: 0,
    alignSelf: 'flex-start',
    zIndex: 1,
  },
  BoxtextTitulo: {
    backgroundColor: '#3E4168',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    alignItems:'center',
    flexDirection: 'column',
    paddingTop: 40,
    paddingBottom: 20,
  },
  BoxMenu: {
    marginTop: 0,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
