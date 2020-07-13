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
  const [autDb, setAutDb] = useState(0);

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
    const acompanhamentosDia = async () => {
      const listAcmpDia = await PathDB
        .collection('AcompanhamentoDoDia')
        .where('Data', '==', InfData)
        .get();

      setListaAcompanhamentosDia(listAcmpDia.docs);
    }

    setAutDb('');
    acompanhamentosDia();

  }, [autDb]);

  /* -------------------------------------------------------------------------- */
  /*                     Lista os pratos do dia cadastrados                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function pratosDias() {
      const response = await fetch(URLSERVER + 'ListaPratosDia.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json ',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ID_APP: INF.ID_APP,
        }),
      });
      const json = await response.json();
      setListaPratosDia(() => json);
      setAutDb(() => 0);
    }
    pratosDias();
  }, [URLSERVER, autDb]);

  /* -------------------------------------------------------------------------- */
  /*                         Lista as montagem de pratos                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function montagemDoDia() {
      const response3 = await fetch(URLSERVER + 'listaMontagem.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ID_APP: INF.ID_APP,
        }),
      });
      const json3 = await response3.json();
      setListaMontagem(() => json3);
      setAutDb(() => 0);
    }

    montagemDoDia();
  }, [URLSERVER, autDb]);

  const ativar = () => {
    setAutDb(() => 1);
  };

  /* -------------------------------------------------------------------------- */
  /*              Deleta os acompanhamento dos pratos selecionados              */
  /* -------------------------------------------------------------------------- */

  const delOpcao = id_montagem => {
    const executeDel = async () => {
      const response3 = await fetch(URLSERVER + 'delOpcaoMontagem.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ID_APP: INF.ID_APP,
          id_montagem: id_montagem,
        }),
      });
      const MSG = await response3.json();
      if (MSG[0] === 'Deletado') {
        setAutDb(() => MSG[1]);
      }
    };
    executeDel();
  };

  /* -------------------------------------------------------------------------- */
  /*                     Insere os pratos montados no banco                     */
  /* -------------------------------------------------------------------------- */

  const MontaPrato = (nome_opcao, id_prato) => {
    async function execute() {
      const response = await fetch(URLSERVER + 'insertMontagemPrato.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ID_APP: INF.ID_APP,
          nome_opcao: nome_opcao,
          id_prato: id_prato,
        }),
      });
      const MSG = await response.json();

      if (MSG[0] === 'gravado') {
        //alert('Gravado com sucesso!');
        setAutDb(() => MSG[1]);
      }
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
        return opc.id_prato === id_prato;
      });
      const opt = opcoes.map((op, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{op.nome_opcao}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => delOpcao(op.id_montagem)}>
                <Icon style={estilo.icLista} name="trash" />
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
              }}>
              <Picker.Item
                key={id_prato}
                value=""
                label="Selecione o acompanhamento"
              />
              {listaAcompanhamentosDia.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
                    value={item.nome_opcao}
                    label={item.nome_opcao}
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
      return <Text>Lista Vazia...</Text>;
    } else {
      const lp = listaPratosDia.map((item, index) => {
        return (
          <View key={index}>
            <CardMontagem titulo={item.nome_prato_dia}>
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
                    MontaPrato(pkValor, item.id_prato_dia);
                    setPkValor('');
                  }}>
                  <Picker.Item
                    key={item.id_prato_dia}
                    value=""
                    label="Selecione o acompanhamento"
                  />
                  {listaAcompanhamentosDia.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        value={item.nome_opcao}
                        label={item.nome_opcao}
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
                <Opcoes id_prato={item.id_prato_dia} />
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
        <View style={{ margin: 10 }}>
          {listaPratosDia.length === 0 ||
            listaPratosDia.length === undefined ? (
              <BtnLight value="Carregar Lista" onPress={() => ativar()} />
            ) : (
              <BtnLight
                value="Finalizar"
                onPress={() => navigation.navigate('Home')}
              />
            )}
        </View>
      </Content>
      <Footer_tpl />
    </Container>
  );

  /* return (
        <Container style={estilo.container}>
            <Cabecalho titulo="Montagem" subtitulo="Prato do dia" />
            <SafeAreaView style={{ padding: 10 }}>
                {
                    listaPratosDia.length > 0 ?
                        <FlatList
                            data={listaPratosDia}
                            renderItem={({ item }) => (<ListaDeSelecao key={item.id_prato_dia} prato={item.nome_prato_dia} id_prato={item.id_prato_dia} />)}
                            keyExtractor={item => item.id_prato_dia}
                        />
                        : <Text>Lista vazia</Text>
                }
            </SafeAreaView>
            <Content padder>
                <View>
                    <Button onPress={() => ativar()}>
                        <Text>Buscar pratos</Text>
                        <Icon name="checkmark" />
                    </Button>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30 }}>
                        <Button small iconLeft onPress={() => navigation.navigate('SelecionaAcompanhamento')}>
                            <Icon name="arrow-back" />
                            <Text>Voltar</Text>
                        </Button>
                        <Button small iconRight onPress={() => navigation.navigate('MontagemPratoDia')}>
                            <Text>Próximo</Text>
                            <Icon name="arrow-forward" />
                        </Button>
                    </View>
                </View>
            </Content>
            <Footer_tpl />
        </Container>
    ); */
};

export default montagemPratoDia;
