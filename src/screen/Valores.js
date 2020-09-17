import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Container, Content, Icon,
} from 'native-base';

//Estilo da página
import estilo from '../style';

import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import { CardTpl, BtnLight, AlertDecisao } from '../components';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import { set } from 'react-native-reanimated';

export default function CadastraPrato({ navigation }) {
  //INFO APP
  const INF = DadosApp();
  //UID
  const UID = (+new Date).toString(36);

  //PATH DB
  const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

  //console.log(UID);

  /* -------------------------------------------------------------------------- */
  /*                        Cria o state inicial do prato                       */
  /* -------------------------------------------------------------------------- */
  const [valuePrato, setValuePrato] = useState('');
  const [prato, setPrato] = useState('');
  const [autDb, setAutDb] = useState('');

  /* -------------------------------------------------------------------------- */
  /*                        Função de cadastro de pratos                        */
  /* -------------------------------------------------------------------------- */
  function CadastrarPrato() {
    if (valuePrato === '') {
      alert('Por favor digite o prato a ser cadastrado!');
    } else if (valuePrato.length < 3) {
      alert('O nome do prato deve conter 6 ou mais digitos!');
    } else {
      DB.collection('Valores')
        .doc()
        .set({
          Valor: valuePrato,
          ID_Valor: UID,
        });

      setAutDb(1);
      setValuePrato('');
      alert('Prato adicionado com sucesso!');
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                   DEleta itens da lista de pratos do dia                   */
  /* -------------------------------------------------------------------------- */

  const deletaPrato = (ID_Prato, NomePrato) => {
    const cfmDel = () =>
      Alert.alert(
        'Atenção',
        'Deseja realmente excluir o prato "' + NomePrato + '"',
        [
          {
            text: 'Não',
            style: 'cancel',
            cancelable: false,
          },
          {
            text: 'Sim',
            onPress: () => DelItemList(),
          },
        ],
      );

    cfmDel();

    const DelItemList = () => {
      const item = DB.collection('Valores')
        .where('ID_Valor', '==', ID_Prato);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
        });
      });

      setAutDb(1);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                        Lista dos pratos cadastrados                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const ExibePratos = async () => {
      const prts = await DB.collection('Valores')
        .orderBy('Valor')
        .get();

      setPrato(prts.docs);
      setAutDb('');
    }
    ExibePratos();
  }, [autDb]);


  //console.log(prato.length);

  /* -------------------------------------------------------------------------- */
  /*                      Visual do programa / componentes                      */
  /* -------------------------------------------------------------------------- */


  const Fl = () => {
    if (prato.length === 0 || prato.length === undefined) {
      return <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>;
    } else {
      const prt = prato.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>R${i.data().Valor}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaPrato(i.data().ID_Valor, i.data().Valor)}>
                <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return prt;
    }
  };

  return (
    <>
      <Container style={estilo.container}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Valores e Medidas" subtitulo="Cadastro" />
          <View>
            <CardTpl titulo="Valores">
              <View>
                <TextInput
                  placeholderTextColor="#aaa"
                  placeholder="Exp.: 12,00"
                  style={estilo.inpText}
                  value={valuePrato}
                  onChangeText={valuePrato => setValuePrato(valuePrato)}
                />
              </View>
              <View>
                <BtnLight value="Cadastrar" onPress={() => CadastrarPrato()} />
              </View>
            </CardTpl>
            <CardTpl titulo="Valores cadastrados">
              <View>
                <Fl />
              </View>
            </CardTpl>
          </View>
        </Content>
      </Container>
      <FooterTab_tpl />
    </>
  );
}
