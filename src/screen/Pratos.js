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
import {Container, Content, Button, Icon, Left, Right} from 'native-base';
import estilos from '../style';
//=============================
// ==> Definição do templet
//=============================
import {Cabecalho, BtnNav} from '../components/header';
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
        <BtnNav />
        <Content style={estilos.Content}>
          <Cabecalho titulo="Pratos" subtitulo="Administração" />
          <View style={estilos.conteudo}>
            <View style={estilos.boxBtn}>
              <TouchableOpacity
                iconRight
                style={estilos.btn1}
                onPress={() => navigation.navigate('CadastraPrato')}>
                <Text style={estilos.txtBtn}>Cadastrar Prato</Text>
                <Right>
                  <Icon
                    style={{color: '#fff'}}
                    type="FontAwesome5"
                    name="chevron-right"
                  />
                </Right>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.btn2}
                onPress={() => navigation.navigate('CadastraAcompanhamento')}>
                <Text style={estilos.txtBtn}>Cadastrar Acompanhamento</Text>
                <Right>
                  <Icon
                    style={{color: '#fff'}}
                    type="FontAwesome5"
                    name="chevron-right"
                  />
                </Right>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.btn3}
                onPress={() => navigation.navigate('SelecaoPratoDia')}>
                <Text style={estilos.txtBtn}>Montagem de Pratos</Text>
                <Right>
                  <Icon
                    style={{color: '#fff'}}
                    type="FontAwesome5"
                    name="chevron-right"
                  />
                </Right>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <FooterTab_tpl />
      </Container>
    </>
  );
}

