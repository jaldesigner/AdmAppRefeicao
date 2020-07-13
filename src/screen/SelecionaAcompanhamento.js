import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  Body,
  Text,
  Picker,
  Card,
  CardItem,
} from 'native-base';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Cabecalho, BtnNav } from '../components/header';
import RodaPe from '../components/footerTab';
import DadosApp from '../cfg/';
import estilo from '../style';
import { CardTpl, BtnLight, BtnSmallRight, BtnSmallLeft } from '../components';

const SelecionaAcompanhamento = ({ navigation }) => {
  //Seta o estado do Piker
  const [listaAcompanhamento, setListaAcompanhamento] = useState([]);
  const [listaAcompanhamentoPratoDia, setListaAcompanhamentoPratoDia,] = useState('');
  const [valueListaAcompanhamento, setValueListaAcompanhamento] = useState('');
  const [autDb, setAutDb] = useState(0);

  //URL do servidor
  const INF = DadosApp();

  /* -------------------------------------------------------------------------- */
  /*                 Data completa para envio ao banco de dados                 */
  /* -------------------------------------------------------------------------- */
  const data = new Date();
  const [mes, setMes] = useState(data.getMonth() + 1);
  const dataFull = data.getDate() + '-' + mes + '-' + data.getFullYear();

  /* -------------------------------------------------------------------------- */
  /*                          Lista os Acompanhamentos                          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    //Lista os pratos do dia
    const listaAcompanhamentoPiker = async () => {

      const acmp = await db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('Acompanhamentos')
        .orderBy('NomeAcompanhamento')
        .get();

      setListaAcompanhamento(acmp.docs);

    }

    listaAcompanhamentoPiker();
    setAutDb('');
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                          Lista os acompanhamentos                          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const acompanhamentosDoDia = async () => {
      const acmp = await db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('AcompanhamentoDoDia')
        .where('Data','==',dataFull)
        .get();

      setListaAcompanhamentoPratoDia(acmp.docs);
    }
    acompanhamentosDoDia();
    setAutDb('');
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                         Cadastra os acompanhamentos                        */
  /* -------------------------------------------------------------------------- */
  const cadastraAcompanhamento = () => {
    const execute = () => {
      db().collection(INF.Categoria).doc(INF.ID_APP).collection('AcompanhamentoDoDia').add({
        ID_ACOMPANHAMENTO_DO_DIA: (+new Date).toString(16),
        NomeAcompanhamentoDoDia: valueListaAcompanhamento,
        Data: dataFull,
        Ativo: true,
      });
    };

    if (valueListaAcompanhamento === '') {
      alert('Selecione pelomenos um acompanhamento!');
    } else {
      //listaAcompanhamentoPratoDia.findIndex(acomp => acomp.nome_opcao === valueListaAcompanhamento
      if (listaAcompanhamentoPratoDia.length === undefined) {
        execute();
        setValueListaAcompanhamento('');
        setAutDb(1);
      } else {
        const resultado = listaAcompanhamentoPratoDia.findIndex(
          acomp => acomp.data().NomeAcompanhamentoDoDia === valueListaAcompanhamento,
        );
        if (resultado !== -1) {
          alert('Acompanhamento já listado!');
        } else {
          execute();
          setValueListaAcompanhamento('');
          setAutDb(1);
        }
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                       Deleta o acompanhamento listado                      */
  /* -------------------------------------------------------------------------- */

  const deletaAcompanhamento = (id_item, n_item) => {
    const executeDel = () => {

      let item = db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('AcompanhamentoDoDia')
        .where('ID_ACOMPANHAMENTO_DO_DIA', '==', id_item);

      item.get().then((snp) => {
        snp.forEach((doc => {
          doc.ref.delete();
          setAutDb(1);
        }));
      });

    };
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
            onPress: () => executeDel(),
          },
        ],
      );

    cfmDel();
    //executeDel();
  };

  const Fl = () => {
    if (
      listaAcompanhamentoPratoDia.length === 0 || listaAcompanhamentoPratoDia.length === undefined
    ) {
      return (
        <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>
      );
    } else {
      const prt = listaAcompanhamentoPratoDia.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().NomeAcompanhamentoDoDia}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaAcompanhamento(i.data().ID_ACOMPANHAMENTO_DO_DIA, i.data().NomeAcompanhamentoDoDia)}>
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
        <Cabecalho titulo="Acompanhamento" subtitulo="Seleção" />
        <CardTpl titulo="Selecionar">
          <View>
            <Picker
              note
              mode='dialog'
              style={{ backgroundColor: '#fff' }}
              selectedValue={valueListaAcompanhamento}
              onValueChange={valueListaAcompanhamento =>
                setValueListaAcompanhamento(valueListaAcompanhamento)
              }>
              <Picker.Item key="" label="Selecione o acompanhamento..." value="" />
              {listaAcompanhamento.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={item.data().NomeAcompanhamento}
                    value={item.data().NomeAcompanhamento}
                  />
                );
              })}
            </Picker>
            <BtnLight
              value="Adicionar"
              onPress={() => cadastraAcompanhamento()}
            />
          </View>
        </CardTpl>
        <CardTpl titulo="Lista">
          <Fl />
        </CardTpl>
      </Content>
      {listaAcompanhamento.length > 0 && listaAcompanhamentoPratoDia.length > 0 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <BtnSmallLeft
            value="Voltar"
            onPress={() => navigation.navigate('SelecaoPratoDia')}
          />
          <BtnSmallRight
            value="Próximo"
            onPress={() => navigation.navigate('MontagemPratoDia')}
          />
        </View>
      ) : (
          <Text />
        )}
      <RodaPe />
    </Container>
  );
};

export default SelecionaAcompanhamento;
