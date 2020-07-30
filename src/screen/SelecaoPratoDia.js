import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  Icon,
  Text,
  Picker,
} from 'native-base';
import {
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DadosApp from '../cfg';
import RodaPe from '../components/footerTab';
import { Cabecalho, BtnNav } from '../components/header';

import { CardTpl, BtnLight, BtnSmallRight } from '../components';
import estilo from '../style';

const SelecaoPratoDia = ({ navigation }) => {
  //alert(DadosApp().ID_APP);
  //Seta o estado do Piker
  const [listaPratos, setListaPratos] = useState([]);
  const [listaPratosDia, setListaPratosDia] = useState('');
  const [valueListaPrato, setValueListaPrato] = useState('');
  const [autDb, setAutDb] = useState(0);
  const [exibe, setExibe] = useState(0);
  //Trata a data completa da aplicação
  const data = new Date();
  const [mes, setMes] = useState(data.getMonth() + 1);

  //INFO APP
  const INF = DadosApp();

  const dataFull = data.getDate() + '-' + mes + '-' + data.getFullYear();

  /* -------------------------------------------------------------------------- */
  /*                    Exibe a lista de pratos cadastrados.                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function ExibePratos() {

      const prts = await db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('Pratos')
        .orderBy('ID_Prato')
        .get();

      setListaPratos(prts.docs);
      setAutDb('');
      //console.log(listaPratos);

    }
    ExibePratos();
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                           Lista os pratos do dia                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    //Lista os pratos do dia
    const listPratosDia =  () => {
      const lstPD =  db().collection(INF.Categoria)
        .doc(INF.ID_APP).collection('CardapioDoDia')
        .where('Data', '==', dataFull)
        .onSnapshot(querySNP => {
          setListaPratosDia(querySNP.docs);
        }, erro =>{
          console.log(`Ocorreu um erro ao Listar os Pratos: ${erro}`);
        });
        //.get();

      //console.log(lstPD.docs);
      //setListaPratosDia(lstPD.docs);
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

    //alert(id_item);
    function DelItemList() {
      const item = db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('CardapioDoDia')
        .where('ID_Prato_Dia', '==', id_item);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
          setAutDb(1);
        });
      });
    }
    cfmDel();
  };

  /* -------------------------------------------------------------------------- */
  /*                        Grava no DB Os Pratos do dia                        */
  /* -------------------------------------------------------------------------- */
  const CadastrarPratosDia = () => {
    //alert(INF.ID_APP);
    const execute = () => {
      db().collection(INF.Categoria).doc(INF.ID_APP).collection('CardapioDoDia').add({
        ID_Prato_Dia: (+new Date).toString(16),
        NomePratoDoDia: valueListaPrato,
        Data: dataFull,
        Ativo: true,
      });
    };

    if (valueListaPrato === '') {
      alert('Selecione pelomenos um Prato!');
    } else {
      if (listaPratosDia.length === undefined) {
        execute();
        setValueListaPrato('');
        setAutDb(1);
      } else {
        const resultado = listaPratosDia.findIndex(
          acomp => acomp.data().NomePratoDoDia === valueListaPrato,
        );

        if (resultado !== -1) {
          alert('Item já listado!');
        } else {
          execute();
          setValueListaPrato('');
          setAutDb(1);
        }
      }
    }
  };



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
  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Pratos do Dia" subtitulo="Selecionar" />
        <CardTpl titulo="Selecionar">
          <View>
            <Picker
              mode="dialog"
              style={{ backgroundColor: '#fff' }}
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
            onPress={() => navigation.navigate('SelecionaAcompanhamento')}>
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
