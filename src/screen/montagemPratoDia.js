import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Container, Content, Picker, H3, Button, Icon } from 'native-base';

import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import DadosApp, { InfData } from '../cfg/';
import { BtnNav, Cabecalho } from '../components/header';
import Footer_tpl from '../components/footerTab';
import estilo from '../style';
import { BtnLight, CardMontagem } from '../components';

const montagemPratoDia = ({ navigation }) => {
  const [listaAcompanhamentosDia, setListaAcompanhamentosDia] = useState('');
  const [listaPratosDia, setListaPratosDia] = useState('');
  const [listaMontagem, setListaMontagem] = useState('');
  const [pkValor, setPkValor] = useState('');
  const [autDb, setAutDb] = useState('');

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
      const listAcmpDia = PathDB
        .collection('AcompanhamentoDoDia')
        .where('Data', '==', InfData)
        .onSnapshot(querySNP => {
          setListaAcompanhamentosDia(querySNP.docs);
        }, erro => {
          console.log(`Erro ao listar os acompanhamentos: ${erro}`);
        });
        //.get();

      //setListaAcompanhamentosDia(listAcmpDia.docs);

    }

    setAutDb('');
    acompanhamentosDia('');

  }, []);

  /* -------------------------------------------------------------------------- */
  /*                     Lista os pratos do dia cadastrados                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const pratosDias =  () => {
      const listPrtDia =  PathDB
        .collection('CardapioDoDia')
        .where('Data', '==', InfData)
        .onSnapshot(querySNP =>{
          setListaPratosDia(querySNP.docs);
        }, erro => {
          console.log(`Erro ao listar os Pratos: ${erro}`);
        });
        //.get();
      //setListaPratosDia(listPrtDia.docs);
    }
    pratosDias();
    setAutDb('');
  }, []);

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
        //.get();

      //console.log(MontDoDia.docs);
      //setListaMontagem(MontDoDia.docs);
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

  const MontaPrato = (nome_opcao, id_prato) => {
    function execute() {
      const MP = PathDB.collection('MontagemPratoDia').doc(InfData).collection('Montagens').add({
        ID_PRATO_MONTAGEM: (+new Date).toString(16),
        ID_PRATO: id_prato,
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

  //console.log(new Date().toISOString());
  /* -------------------------------------------------------------------------- */
  /*                              Lista as seleções                             */
  /* -------------------------------------------------------------------------- */

  const ListaDeSelecao = ({ prato, id_prato }) => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        <H3>{prato}</H3>
        {listaAcompanhamentosDia.length > 0 ? (
          <>
            <Picker
              style={{ backgroundColor: '#fff' }}
              selectedValue={pkValor}
              onValueChange={pkValor => {
                setPkValor(pkValor);
                MontaPrato(pkValor, id_prato);
                setPkValor('');
                console.log(id_prato);
              }}>
              <Picker.Item
                key=""
                value=""
                label="Selecione o acompanhamento"
              />
              {listaAcompanhamentosDia.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    value={item.data().ID}
                    label={item.data().NomeAcompanhamentoDoDia}
                  />
                );
              })}
            </Picker>
            <View
              style={{
                borderTopColor: '#32465d',
                borderStyle: 'solid',
                borderTopWidth: 1,
              }}>
              <Opcoes id_prato={id_prato} />
            </View>
          </>
        ) : (
            <Text />
          )}
      </View>
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                        Cria um componente Flet List                        */
  /* -------------------------------------------------------------------------- */

  const Fl = () => {
    if (listaPratosDia.length === 0 || listaPratosDia.length === undefined) {
      return (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={{ color: '#F6B900', textAlign: 'center' }}>Você ainda não selecionou os pratos do dia</Text>
          <View style={{marginTop: 30}}>
            <TouchableOpacity style={estilo.btn3} onPress={()=> navigation.navigate('SelecaoPratoDia')} >
              <Text style={estilo.txtBtn}>Selecionar pratos do dia</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    } else {
      const lp = listaPratosDia.map((item, index) => {
        return (
          <View key={index}>
            <CardMontagem titulo={item.data().NomePratoDoDia}>
              {
                <Picker
                  style={{
                    backgroundColor: '#fff',
                    marginBottom: 15,
                    marginTop: 5,
                  }}
                  selectedValue={pkValor}
                  onValueChange={pkValor => {
                    setPkValor(pkValor);
                    MontaPrato(pkValor, item.data().ID_Prato_Dia);
                    setPkValor('');
                  }}>
                  <Picker.Item
                    key={item.data().ID_Prato_Dia}
                    value=""
                    label="Selecione o acompanhamento"
                  />
                  {listaAcompanhamentosDia.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        value={item.data().NomeAcompanhamentoDoDia}
                        label={item.data().NomeAcompanhamentoDoDia}
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
