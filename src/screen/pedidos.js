import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Container, Content, Button, Icon, Left} from 'native-base';

//=============================
// ==> Definição do templet
//=============================
import Header_tpl from '../components/header';
import FooterTab_tpl from '../components/footerTab';

export default function Home({navigation}) {
  const autentic = firebase.auth();
  const sair = () => {
    autentic.signOut();
    navigation.navigate('Login');
  };

  return (
    <>
      <Container style={{backgroundColor: '#2D3043'}}>
        <Header_tpl titulo="Home" subtitulo="Administração" />
        <Content padder>
          <View>
            <View style={estilos.boxBtn}>
              <TouchableOpacity style={estilos.btn1}>
                <Text style={estilos.txtBtn}>Pratos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.btn2}>
                <Text style={estilos.txtBtn}>Pedidos</Text>
              </TouchableOpacity>
            </View>

            <View style={estilos.boxBtn}>
              <TouchableOpacity style={estilos.btn3}>
                <Text style={estilos.txtBtn}>Controle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.btn4}>
                <Text style={estilos.txtBtn}>Configuração</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <FooterTab_tpl />
      </Container>
    </>
  );
}

const estilos = StyleSheet.create({
  boxBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn1: {
    backgroundColor: '#02CD98',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  btn2: {
    backgroundColor: '#5351F9',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  btn3: {
    backgroundColor: '#F64000',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  btn4: {
    backgroundColor: '#F6B900',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  txtBtn: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
