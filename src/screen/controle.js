import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Text, Container, Content, Icon, CardItem, Item } from 'native-base';
import { Picker } from '@react-native-community/picker';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import DadosApp, { InfData, Hora } from '../cfg/';
import { BtnNav, Cabecalho } from '../components/header';
import Footer_tpl from '../components/footerTab';
import estilo from '../style';
import { BtnLight, BtnSmallRight, CardMontagem, CardPedido, CardTpl } from '../components';
import { Loading } from '../components/Loading';
import { CTX_SelecaoPrato } from '../context';

const montagemPratoDia = ({ navigation }) => {

  const [ctx_SP, setctx_SP] = useContext(CTX_SelecaoPrato);
  const [Acompanhamentos, setAcompanhamentos] = useState([]);
  const [cardapioDia, setCardapioDia] = useState([]);
  const [auto, setAuto] = useState(0);

  const INF = DadosApp();
  const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

  useEffect(() => {
    DB.collection('Acompanhamentos')
      .orderBy('NomeAcompanhamento')
      .onSnapshot(snp => {
        setAcompanhamentos(snp.docs)
      });
  }, []);

  useEffect(() => {
    DB.collection('CardapioDoDia')
      .where('Ativo', '==', true)
      .where('Data', '==', InfData)
      .onSnapshot(snp => {
        setCardapioDia(snp.docs);
      })
  }, []);

  console.log(cardapioDia.length);

  useFocusEffect(() => {
    setctx_SP(ctx_SP);
    setAuto(0)
  }, [auto]);


  function pkAcompanhamento() {
    const listaAcompanhamentos = Acompanhamentos.map((item, index) => {
      return (
        <Picker.Item key={index} value={item.data().NomeAcompanhamento} label={item.data().NomeAcompanhamento} />
      );
    });
    return listaAcompanhamentos;
  }

  function delItem(item, ind, ind2) {
    Alert.alert(
      'Atenção!',
      'Deseja realmente excluir o Item \" ' + item + '\"?',
      [
        {
          text: 'Sim',
          onPress: () => {
            ctx_SP[ind].acompanhamento.splice(ind2, 1);
            setAuto(1);
          }
        },
        {
          text: 'Não',
          style: 'cancel',
          cancelabre: false,
        }
      ]
    );
  }


  function gravaCardapio() {

    let cardapio = {
      Cardapio: ctx_SP,
      Data: InfData,
      Hora: Hora,
      Ativo: true,
    }

    DB.collection('CardapioDoDia')
      .doc()
      .set(cardapio);
  }

  function listaPratos() {
    const listaPratos = ctx_SP.map((item, index) => {
      if (ctx_SP[index].acompanhamento === undefined) {
        ctx_SP[index]['acompanhamento'] = [];
      }

      const listaAcompanhamentos = () => {
        const mp = ctx_SP[index].acompanhamento.map((item, index2) => {
          return (
            <View key={index2} style={{
              backgroundColor: '#51557D',
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Icon name='caret-right' type="FontAwesome5" style={{
                  color: '#00D1FF',
                }} />
                <Text style={{ color: '#fff', marginLeft: 5, }}>{item}</Text>
              </View>
              <View>
                <TouchableOpacity style={{
                  backgroundColor: '#FF5757',
                  //padding:5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  elevation: 5,
                }} onPress={() => delItem(item, index, index2)} >
                  <Icon name='trash' type='FontAwesome5' style={{ color: '#fff', fontSize: 15 }} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
        return mp;
      }

      return (
        <View key={index}>
          <CardMontagem titulo={item.prato}>
            <View style={{
              backgroundColor: '#fff',
              elevation: 5,
            }}>
              <Picker
                mode='dropdown'
                onValueChange={valor => {

                  ctx_SP[index].acompanhamento.push(valor);
                  setctx_SP(ctx_SP);
                  console.log(ctx_SP);
                  setAuto(1);

                }}
                selectedValue='Selecione o valor'
                style={{ height: 30, }}
              >
                <Picker.Item value="" label="Selecione o acompanhamento" />
                {pkAcompanhamento()}
              </Picker>
            </View>
            <View style={{
              borderBottomColor: '#32465d',
              borderBottomWidth: 2,
              borderStyle: 'solid',
              width: '100%',
              height: 2,
              marginTop: 10,
            }} />
            <View>
              {listaAcompanhamentos()}
            </View>
          </CardMontagem>
        </View>
      );
    });
    return listaPratos;
  }


  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Montagem" subtitulo="Pratos" />
        {listaPratos()}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'flex-end', }}>
          <BtnSmallRight
            value="Ativar Cardápio"
            onPress={() => gravaCardapio()}>
            <Icon name="arrow-forward" />
          </BtnSmallRight>
        </View>
      </Content>
      <Footer_tpl />
    </Container>
  );
};

export default montagemPratoDia;
