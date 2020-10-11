import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Container, Content, Button, Icon, Left } from 'native-base';
import { CardTpl } from '../components';
import { BtnNavegacao_1 } from '../components/Botoes';
import estilosG from '../style';

//=============================
// ==> Definição do template
//=============================
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';

export default function Home({ navigation }) {

  return (
    <>
      <Container style={{ backgroundColor: '#2D3043' }}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Home" subtitulo="Administração" />
          <View>

            <View style={estilosG.boxBtn}>
              <View style={{ padding: 10 }}>
                <BtnNavegacao_1 titulo="Cardápio" page="SelecaoPratoDia" />
                <BtnNavegacao_1 titulo="Pedidos" page="ListaPedidos" />
                <BtnNavegacao_1 titulo="Configuração" page="Configuracao" />
              </View>
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
    justifyContent: 'space-evenly',
    marginTop: 45,
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
