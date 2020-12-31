import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Container, Content, Icon, Text, } from 'native-base';
import { Picker } from '@react-native-community/picker';

import DadosApp, { InfData } from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';

import { CardTpl, BtnLight, BtnSmallRight } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';


//==>Dados do App<===//
const INF = DadosApp();
const dataFull = InfData;

//==>Dados do DB<===//
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const SelecaoPratoDia = ({ navigation }) => {

  /* -------------------------------------------------------------------------- */
  /*                            Estados da Aplicação                            */
  /* -------------------------------------------------------------------------- */
  const [listaPratos, setListaPratos] = useState([]);
  const [listaPratosDia, setListaPratosDia] = useState('');
  const [valueListaPrato, setValueListaPrato] = useState('');
  const [medidas, setMedidas] = useState('');
  const [valores, setValores] = useState('');
  const [arrayValores, setArrayValores] = useState([]);
  const [autDb, setAutDb] = useState(0);
  const [exibe, setExibe] = useState(0);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                    Exibe a lista de pratos cadastrados.                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function ExibePratos() {

      const prts = await DB
        .collection('Pratos')
        .orderBy('ID_Prato')
        .get();

      setListaPratos(prts.docs);
    }
    ExibePratos();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                         Lista os medidas dos pratos                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const exibeMedidas = async () => {
      const mdd = await DB.collection('Medidas')
        .orderBy('Medida')
        .get();

      setMedidas(mdd.docs);
      setAutDb('');
    };
    exibeMedidas();
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                        Lista os valores cadastrados                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const exibeValores = async () => {
      const vl = await DB.collection('Valores')
        .orderBy('Valor')
        .get();

      setValores(vl.docs);
      setAutDb('');
    };
    exibeValores();
  }, [autDb, arrayValores]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  /* -------------------------------------------------------------------------- */
  /*                           Lista os pratos do dia                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    //Lista os pratos do dia
    const listPratosDia = () => {
      const lstPD = DB
        .collection('CardapioDoDia')
        .where('Data', '==', dataFull)
        .onSnapshot(querySNP => {
          setListaPratosDia(querySNP.docs);
        }, erro => {
          console.log(`Ocorreu um erro ao Listar os Pratos: ${erro}`);
        });
    }

    listPratosDia();
    setAutDb('');
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                   Deleta itens da lista de pratos do dia                   */
  /* -------------------------------------------------------------------------- */

  const deletaPratoDaLista = (id_item, n_item) => {
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

    function DelItemList() {
      const item = DB
        .collection('CardapioDoDia')
        .where('ID_Prato_Dia', '==', id_item);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
          //setAutDb(1);
        });
      });
    }
    cfmDel();
  };

  /* -------------------------------------------------------------------------- */
  /*                        Grava no DB Os Pratos do dia                        */
  /* -------------------------------------------------------------------------- */
  const CadastrarPratosDia = () => {

    const execute = () => {
      DB.collection('CardapioDoDia').add({
        ID_Prato_Dia: (+new Date).toString(16),
        NomePratoDoDia: valueListaPrato,
        Data: dataFull,
        Ativo: true,
        infoPrato: arrayValores,
      });
    };

    if (valueListaPrato === '') {
      alert('Selecione pelomenos um Prato!');
    } else {
      if (listaPratosDia.length === undefined) {
        execute();
        setValueListaPrato('');
        //setAutDb(1);
      } else {
        const resultado = listaPratosDia.findIndex(
          acomp => acomp.data().NomePratoDoDia === valueListaPrato,
        );

        if (resultado !== -1) {
          alert('Este prato já se encontra no cardápio!');
        } else {
          execute();
          setValueListaPrato('');
          //setAutDb(1);
        }
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                     Lista de Pratos do dia a ser exibidos                  */
  /* -------------------------------------------------------------------------- */
  const Fl = () => {
    if (listaPratosDia.length === 0 || listaPratosDia.length === undefined) {
      return (
        <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>
      );
    } else {
      const prt = listaPratosDia.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().NomePratoDoDia}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  deletaPratoDaLista(i.data().ID_Prato_Dia, i.data().NomePratoDoDia)
                }>
                <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return prt;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                       Lista de medidas a ser exibidas                      */
  /* -------------------------------------------------------------------------- */
  const LtMedidas = () => {
    if (medidas.length === 0 || medidas.length === undefined) {
      return (
        <Text>Não há Medidas cadastradas</Text>
      );
    } else if (valueListaPrato === '') {
      return (
        <View />
      );
    } else {
      const mdd = medidas.map((item, index) => {
        const contMedidas = medidas.length;
        if (arrayValores.length == 0) {
          for (var i = 0; i < contMedidas; i++) {
            arrayValores.push({
              Medida: item.data().Medida,
              Valor: "Valor",
              key: index,
            });
          }

        }
        return (
          <View key={index} style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'auto',
            paddingTop: 10,
            backgroundColor: '#51557D',
            padding: 10,
            marginTop: 10,
          }}>
            <View style={{ flex: 2 }}>
              <Text style={{ color: '#fff' }}>{item.data().Medida}</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'flex-end' }}>
              <Picker
                style={{ width: '100%', backgroundColor: '#fff' }}
                mode='dropdown'
                selectedValue={
                  //valores
                  arrayValores.length >= 1 ? arrayValores[index].Valor : "valores"
                }
                onValueChange={(vl) => {
                  for (var i = 0; i < contMedidas; i++) {
                    arrayValores[index].Medida = item.data().Medida;
                    arrayValores[index].Valor = vl;
                    arrayValores[index].key = index;
                  }

                  //setArrayValores(arrayValores);
                  setAutDb(1);
                }}


              >
                <Picker.Item key='' label="Valores" />
                {valores.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.data().Valor}
                      value={item.data().Valor}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        );
      });
      return mdd;
    }
  };

  const ModalLoading = () => {
    if (loading) {
      return (
        <View style={StyleModal.container}>
          <View style={StyleModal.boxLogin}>
            <ActivityIndicator size='large' color='#F64000' />
          </View>
        </View>
      );
    }
    return null;
  }

  /* -------------------------------------------------------------------------- */
  /*                            Designer da Aplicação                           */
  /* -------------------------------------------------------------------------- */
  return (
    <Container style={estilo.container}>
      <ModalLoading />
      <Content>
        <Cabecalho titulo="Cardápio" subtitulo="Seleção" />

        <CardTpl titulo="Selecionar">
          <View>
            <Picker
              mode="dropdown"
              style={{ width: '100%', backgroundColor: '#fff' }}
              selectedValue={valueListaPrato}
              onValueChange={valueListaPrato =>
                setValueListaPrato(valueListaPrato)
              }>
              <Picker.Item key="" label="Selecione o prato do dia" value="" />
              {listaPratos.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.data().NomePrato}
                    value={item.data().NomePrato}
                  />
                );
              })}
            </Picker>
            <View>
              <LtMedidas />
            </View>
            <BtnLight value="Adicionar" onPress={() => CadastrarPratosDia()} />
          </View>
        </CardTpl>
        <CardTpl titulo="Lista">
          <Fl />
        </CardTpl>
      </Content>
      {listaPratosDia.length > 0 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'flex-end', }}>
          <BtnSmallRight
            value="Próximo"
            onPress={() => navigation.navigate('MontagemPratoDia')}>
            <Text>Próximo</Text>
            <Icon name="arrow-forward" />
          </BtnSmallRight>
        </View>
      ) : (
          <Text />
        )}
      <RodaPe />
    </Container>
  );
};

export default SelecaoPratoDia;

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
  boxLogin: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 15,
  }
});
