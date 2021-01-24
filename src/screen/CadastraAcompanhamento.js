import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import db from '@react-native-firebase/firestore';
import estilo from '../style';
import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import { CardTpl, BtnLight, AlertDecisao } from '../components';
import { Picker } from '@react-native-community/picker';

export default function CadastraAcompanhamento({ navigation }) {

  const INF = DadosApp();
  const UID = (+new Date).toString(16);
  const PathDb = db().collection(INF.Categoria).doc(INF.ID_APP);

  const [valueAcompanhamento, setValueAcompanhamento] = useState('');
  const [acompanhamento, setAcompanhamento] = useState('');
  const [autDb, setAutDb] = useState('');
  const [acmpPrincipal, setAcmpPrincipal] = useState('');
  const [pkAcmpGeral, setPkAcmpGeral] = useState('');

  function CadastrarPrato() {
    if (valueAcompanhamento === '') {
      alert('Por favor digite o prato a ser cadastrado!');
    } else if (valueAcompanhamento.length < 3) {
      alert('O nome do prato deve conter 6 ou mais digitos!');
    } else {
      PathDb
        .collection('Acompanhamentos')
        .doc()
        .set({
          NomeAcompanhamento: valueAcompanhamento,
          ID_Acompanhamento: UID,
          Principal: false,
        });

      setValueAcompanhamento('');
      setAutDb(1);
      alert('Acompanhamento adicionado!');
    }
  }

  const deletaPrato = (id_item, n_item) => {

    const cfmDel = () =>
      Alert.alert(
        'Atenção',
        'Deseja realmente excluir o prato "' + n_item + '"?',
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
      let item = PathDb
        .collection('Acompanhamentos')
        .where('ID_Acompanhamento', '==', id_item);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
        });
      });

      setAutDb(1);

    };
  };

  useEffect(() => {
    const ExibeAcompanhamentos = async () => {
      const acmp = await PathDb
        .collection('Acompanhamentos')
        .orderBy('NomeAcompanhamento')
        .get();

      setAcompanhamento(acmp.docs);
      setAutDb('');
    }
    ExibeAcompanhamentos();

  }, [autDb]);

  const acompanhamentoPrincipal = (acomp) => {
    const dbAcmp = PathDb.collection('Acompanhamentos');
    acompanhamento.map((i, index) => {
      const slct = i.data().NomeAcompanhamento;
      const estadoSlct = i.data().Principal;

      if (acomp != slct) {
        dbAcmp
          .where('NomeAcompanhamento', '==', acomp)
          .get()
          .then(snp => {
            snp.forEach(exc => {
              dbAcmp.doc(exc.id).update({
                Principal: true,
              })
            });
          })

      } else {
        dbAcmp
          .get()
          .then(snp => {
            snp.forEach(exc => {
              dbAcmp.doc(exc.id).update({
                Principal: false,
              })
            });
          })
      }

    })
  };
  useEffect(() => {

    const ExbAcompanhamentoPadrao = () => {

      PathDb.collection('Acompanhamentos')
        .where('Principal', '==', true)
        .get()
        .then(i => {
          setAcmpPrincipal(i.docs[0].data().NomeAcompanhamento);
        })

    }
    ExbAcompanhamentoPadrao();
  }, [pkAcmpGeral]);

  const Fl = () => {
    if (acompanhamento.length === 0 || acompanhamento.length === undefined) {
      return <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>;
    } else {
      const prt = acompanhamento.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().NomeAcompanhamento}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaPrato(i.data().ID_Acompanhamento, i.data().NomeAcompanhamento)}>
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
          <Cabecalho titulo="Cadastro" subtitulo="Acompanhamentos" />
          <View>
            <CardTpl titulo="Cadastro">
              <View>
                <TextInput
                  placeholderTextColor="#aaa"
                  placeholder="Exp.: Francom com Quiabo"
                  style={estilo.inpText}
                  value={valueAcompanhamento}
                  onChangeText={valueAcompanhamento => setValueAcompanhamento(valueAcompanhamento)}
                />
              </View>
              <View>
                <BtnLight value="Cadastrar" onPress={() => CadastrarPrato()} />
              </View>
            </CardTpl>

            <CardTpl titulo="Principal">
              <View>
                <Picker
                  style={{ backgroundColor: '#fff' }}
                  mode='dropdown'
                  value={acmpPrincipal}
                  onValueChange={ac => {
                    setPkAcmpGeral(ac);
                    acompanhamentoPrincipal(ac);
                  }} >
                  <Picker.Item
                    key=''
                    label='Selecione'
                    value={false}
                  />
                  {
                    acompanhamento.length == 0
                      ?
                      (null)
                      :
                      acompanhamento.map((i, index) => {
                        return (
                          <Picker.Item
                            key=''
                            label={i.data().NomeAcompanhamento}
                            value={i.data().NomeAcompanhamento}
                          />
                        );
                      })
                  }
                </Picker>
              </View>
              <View style={{marginTop: 10,}}>
                <View style={estilo.boxTextLista}>
                  <View style={estilo.sqrLista} />
                  <Text style={estilo.txtLista}>{acmpPrincipal}</Text>
                </View>
              </View>
            </CardTpl>
            <CardTpl titulo="Acompanhementos">
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
