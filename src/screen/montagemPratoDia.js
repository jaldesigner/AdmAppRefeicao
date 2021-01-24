import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Container, Content, Icon } from 'native-base';
import { Picker } from '@react-native-community/picker';

import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import DadosApp, { InfData } from '../cfg/';
import { BtnNav, Cabecalho } from '../components/header';
import Footer_tpl from '../components/footerTab';
import estilo from '../style';
import { BtnLight, CardMontagem } from '../components';
import { Loading } from '../components/Loading';

const montagemPratoDia = ({ navigation }) => {
  const [listaAcompanhamentosDia, setListaAcompanhamentosDia] = useState('');
  const [listaPratosDia, setListaPratosDia] = useState('');
  const [listaMontagem, setListaMontagem] = useState('');
  const [pkValor, setPkValor] = useState('');
  const [autDb, setAutDb] = useState('');
  const [arrayAcom, setArrayAcom] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                         Pega as informações do App                         */
  /* -------------------------------------------------------------------------- */

  const INF = DadosApp();

  /* -------------------------------------------------------------------------- */
  /*                          Caminho da coleção do App                         */
  /* -------------------------------------------------------------------------- */

  const PathDB = db().collection(INF.Categoria).doc(INF.ID_APP);

  /* -------------------------------------------------------------------------- */
  /*                        Lista de acompanhamento do dia                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {

    const acompanhamentosDia = () => {

      PathDB
        .collection('Acompanhamentos')
        .orderBy('ID_Acompanhamento')
        .onSnapshot(querySNP => {
          setListaAcompanhamentosDia(querySNP.docs);
        }, erro => {
          console.log(`Erro ao listar os acompanhamentos: ${erro}`);
        });

    }

    setAutDb('');
    acompanhamentosDia('');

  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                     Lista os pratos do dia cadastrados                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const pratosDias = () => {
      const listPrtDia = PathDB
        .collection('CardapioDoDia')
        .where('Data', '==', InfData)
        .onSnapshot(querySNP => {
          setListaPratosDia(querySNP.docs);
        }, erro => {
          console.log(`Erro ao listar os Pratos: ${erro}`);
        });

    }
    pratosDias();
    setAutDb('');
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                         Lista as montagem de pratos                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    function montagemDoDia() {
      const MontDoDia = PathDB
      .collection('MontagemPratoDia')
      .doc(InfData).collection('Montagens')
      .where('Data', '==', InfData)
      .onSnapshot(querySNP =>{
        setListaMontagem(querySNP.docs);
      }, erro => {
        console.log(`Erro ao listar os Pratos: ${erro}`);
      });

    }
    setAutDb('');
    montagemDoDia();
  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*              Deleta os acompanhamento dos pratos selecionados              */
  /* -------------------------------------------------------------------------- */

  const delOpcao = (id_montagem) => {
    const executeDel = () => {
      const item = PathDB
      .collection('MontagemPratoDia')
      .doc(InfData)
      .collection('Montagens').where('ID_PRATO_MONTAGEM','==',id_montagem);
      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
          setAutDb(1);
        });
      });
    }
    executeDel();
  };

  /* -------------------------------------------------------------------------- */
  /*                     Insere os pratos montados no banco                     */
  /* -------------------------------------------------------------------------- */

  const MontaPrato = (nome_opcao, id_prato, nome_prato) => {
    function execute() {
      const MP = PathDB.collection('MontagemPratoDia').doc(InfData).collection('Montagens').add({
        ID_PRATO_MONTAGEM: (+new Date).toString(16),
        ID_PRATO: id_prato,
        Nome_Prato: nome_prato,
        Nome_Acompanhamento: nome_opcao,
        Data: InfData,
      });
      setAutDb(1);
    }

    execute();
  };

  /* -------------------------------------------------------------------------- */
  /*                              Mostra as opções                              */
  /* -------------------------------------------------------------------------- */

  const Opcoes = ({ id_prato }) => {
    if (listaMontagem.length === 0 || listaMontagem.length === undefined) {
      return <Text style={{ color: '#ccc' }}>Sem acompanhamento...</Text>;
    } else {
      const opcoes = listaMontagem.filter(opc => {
        return opc.data().ID_PRATO === id_prato;
      });
      const opt = opcoes.map((op, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{op.data().Nome_Acompanhamento}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => delOpcao(op.data().ID_PRATO_MONTAGEM)}>
                <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      //console.log(opt);
      return opt;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                        Cria um componente Flet List                        */
  /* -------------------------------------------------------------------------- */

  const Fl = () => {
    if (listaPratosDia.length === 0 || listaPratosDia.length === undefined) {
      //setAutDb(1)
      return (
        <View style={{ alignItems: "center", marginTop: 30 }}>

          <Text style={{ color: '#F6B900', textAlign: 'center' }}>
            Você ainda não selecionou os pratos do dia
          </Text>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity style={estilo.btn3} onPress={() => navigation.navigate('SelecaoPratoDia')} >
              <Text style={estilo.txtBtn}>Selecionar pratos do dia</Text>
            </TouchableOpacity>
          </View>

        </View>
      );

    } else {
      const lp = listaPratosDia.map((item, index) => {
        //console.log(listaAcompanhamentosDia);
        return (
          <View key={index}>
            <CardMontagem titulo={" " + item.data().NomePratoDoDia}>
              {
                <Picker
                mode='dropdown'
                style={{
                  backgroundColor: '#fff',
                  marginBottom: 15,
                  marginTop: 5,
                }}
                selectedValue={pkValor}
                onValueChange={pkValor => {
                  setPkValor(pkValor);
                  MontaPrato(pkValor, item.data().ID_Prato_Dia, item.data().NomePratoDoDia);
                  setPkValor('');
                }}>
                <Picker.Item
                  key={item.data().ID_Prato_Dia}
                  value={null}
                  label="Selecione o acompanhamento"
                />
                {listaAcompanhamentosDia.map((item, index) => {
                  //console.log();
                  return (
                    <Picker.Item
                      key={index}
                      value={item.data().NomeAcompanhamento}
                      label={item.data().NomeAcompanhamento}
                    />
                  );
                })}
              </Picker>
              }
              <View
                style={{
                  borderTopColor: '#32465d',
                  borderStyle: 'solid',
                  borderTopWidth: 2,
                }}>
                <Opcoes id_prato={item.data().ID_Prato_Dia} />
              </View>
            </CardMontagem>
          </View>
        );
      });
      return lp;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         Designer geral da apricação                        */
  /* -------------------------------------------------------------------------- */

  return (

    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Montagem" subtitulo="Pratos" />
        <Fl />
      </Content>
      <Footer_tpl />
    </Container>

  );
};

export default montagemPratoDia;
