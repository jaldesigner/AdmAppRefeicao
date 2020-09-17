import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BtnNavegacao_1 = ({ titulo, page }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={style.BtnNavegacao_1Conteiner} onPress={() => navigation.navigate(page)}>
      <View style={style.BtnNavegacao_1Detalhe}>
        <View style={style.BtnNavegacao_1BoxDetalhe} />
      </View>
      <View style={style.BtnNavegacao_1AreaTitulo}>
        <Text style={style.BtnNavegacao_1Titulo}>{titulo}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  BtnNavegacao_1Conteiner: {
    backgroundColor: '#3E4168',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    marginBottom: 20,
  },
  BtnNavegacao_1Detalhe:{
    backgroundColor: '#00D1FF',
    padding:18,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  BtnNavegacao_1BoxDetalhe:{
    borderColor: '#fff',
    borderWidth:5,
    width:15,
    height:15,
    transform:[{rotate: '45deg'}],
    elevation: 5,
    marginLeft:5,
  },
  BtnNavegacao_1AreaTitulo:{
    borderTopRightRadius:25,
    borderBottomRightRadius: 25,
    borderColor: '#56597E',
    borderWidth:1,
    height: 50,
    flex: 1,
  },
  BtnNavegacao_1Titulo:{
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
});