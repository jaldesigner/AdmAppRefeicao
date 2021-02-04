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

  /* -------------------------------------------------------------------------- */
  /*                        Lista de acompanhamento do dia                      */
  /* -------------------------------------------------------------------------- */

  // useEffect(() => {

  //   const acompanhamentosDia = () => {

  //     PathDB
  //       .collection('Acompanhamentos')
  //       .orderBy('ID_Acompanhamento')
  //       .onSnapshot(querySNP => {
  //         setListaAcompanhamentosDia(querySNP.docs);
  //       }, erro => {
  //         console.log(`Erro ao listar os acompanhamentos: ${erro}`);
  //       });

  //   }

  //   setAutDb('');
  //   acompanhamentosDia('');

  // }, [autDb]);

  // /* -------------------------------------------------------------------------- */
  // /*                     Lista os pratos do dia cadastrados                     */
  // /* -------------------------------------------------------------------------- */

  // useEffect(() => {
  //   const pratosDias = () => {
  //     const listPrtDia = PathDB
  //       .collection('CardapioDoDia')
  //       .where('Data', '==', InfData)
  //       .onSnapshot(querySNP => {
  //         setListaPratosDia(querySNP.docs);
  //       }, erro => {
  //         console.log(`Erro ao listar os Pratos: ${erro}`);
  //       });

  //   }
  //   pratosDias();
  //   setAutDb('');
  // }, [autDb]);

  // /* -------------------------------------------------------------------------- */
  // /*                         Lista as montagem de pratos                        */
  // /* -------------------------------------------------------------------------- */

  // useEffect(() => {
  //   function montagemDoDia() {
  //     const MontDoDia = PathDB
  //     .collection('MontagemPratoDia')
  //     .doc(InfData).collection('Montagens')
  //     .where('Data', '==', InfData)
  //     .onSnapshot(querySNP =>{
  //       setListaMontagem(querySNP.docs);
  //     }, erro => {
  //       console.log(`Erro ao listar os Pratos: ${erro}`);
  //     });

  //   }
  //   setAutDb('');
  //   montagemDoDia();
  // }, [autDb]);

  // /* -------------------------------------------------------------------------- */
  // /*              Deleta os acompanhamento dos pratos selecionados              */
  // /* -------------------------------------------------------------------------- */

  // const delOpcao = (id_montagem) => {
  //   const executeDel = () => {
  //     const item = PathDB
  //     .collection('MontagemPratoDia')
  //     .doc(InfData)
  //     .collection('Montagens').where('ID_PRATO_MONTAGEM','==',id_montagem);
  //     item.get().then((snp) => {
  //       snp.forEach((doc) => {
  //         doc.ref.delete();
  //         setAutDb(1);
  //       });
  //     });
  //   }
  //   executeDel();
  // };

  // /* -------------------------------------------------------------------------- */
  // /*                     Insere os pratos montados no banco                     */
  // /* -------------------------------------------------------------------------- */

  // const MontaPrato = (nome_opcao, id_prato, nome_prato) => {
  //   function execute() {
  //     const MP = PathDB.collection('MontagemPratoDia').doc(InfData).collection('Montagens').add({
  //       ID_PRATO_MONTAGEM: (+new Date).toString(16),
  //       ID_PRATO: id_prato,
  //       Nome_Prato: nome_prato,
  //       Nome_Acompanhamento: nome_opcao,
  //       Data: InfData,
  //     });
  //     setAutDb(1);
  //   }

  //   execute();
  // };

  // /* -------------------------------------------------------------------------- */
  // /*                              Mostra as opções                              */
  // /* -------------------------------------------------------------------------- */

  // const Opcoes = ({ id_prato }) => {
  //   if (listaMontagem.length === 0 || listaMontagem.length === undefined) {
  //     return <Text style={{ color: '#ccc' }}>Sem acompanhamento...</Text>;
  //   } else {
  //     const opcoes = listaMontagem.filter(opc => {
  //       return opc.data().ID_PRATO === id_prato;
  //     });
  //     const opt = opcoes.map((op, index) => {
  //       return (
  //         <View key={index} style={estilo.lista}>
  //           <View style={estilo.boxTextLista}>
  //             <View style={estilo.sqrLista} />
  //             <Text style={estilo.txtLista}>{op.data().Nome_Acompanhamento}</Text>
  //           </View>
  //           <View>
  //             <TouchableOpacity onPress={() => delOpcao(op.data().ID_PRATO_MONTAGEM)}>
  //               <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       );
  //     });
  //     //console.log(opt);
  //     return opt;
  //   }
  // };

  // /* -------------------------------------------------------------------------- */
  // /*                        Cria um componente Flet List                        */
  // /* -------------------------------------------------------------------------- */

  // const Fl = () => {
  //   if (listaPratosDia.length === 0 || listaPratosDia.length === undefined) {
  //     //setAutDb(1)
  //     return (
  //       <View style={{ alignItems: "center", marginTop: 30 }}>

  //         <Text style={{ color: '#F6B900', textAlign: 'center' }}>
  //           Você ainda não selecionou os pratos do dia
  //         </Text>

  //         <View style={{ marginTop: 30 }}>
  //           <TouchableOpacity style={estilo.btn3} onPress={() => navigation.navigate('SelecaoPratoDia')} >
  //             <Text style={estilo.txtBtn}>Selecionar pratos do dia</Text>
  //           </TouchableOpacity>
  //         </View>

  //       </View>
  //     );

  //   } else {
  //     const lp = listaPratosDia.map((item, index) => {
  //       //console.log(listaAcompanhamentosDia);
  //       return (
  //         <View key={index}>
  //           <CardMontagem titulo={" " + item.data().NomePratoDoDia}>
  //             {
  //               <Picker
  //               mode='dropdown'
  //               style={{
  //                 backgroundColor: '#fff',
  //                 marginBottom: 15,
  //                 marginTop: 5,
  //               }}
  //               selectedValue={pkValor}
  //               onValueChange={pkValor => {
  //                 setPkValor(pkValor);
  //                 MontaPrato(pkValor, item.data().ID_Prato_Dia, item.data().NomePratoDoDia);
  //                 setPkValor('');
  //               }}>
  //               <Picker.Item
  //                 key={item.data().ID_Prato_Dia}
  //                 value={null}
  //                 label="Selecione o acompanhamento"
  //               />
  //               {listaAcompanhamentosDia.map((item, index) => {
  //                 //console.log();
  //                 return (
  //                   <Picker.Item
  //                     key={index}
  //                     value={item.data().NomeAcompanhamento}
  //                     label={item.data().NomeAcompanhamento}
  //                   />
  //                 );
  //               })}
  //             </Picker>
  //             }
  //             <View
  //               style={{
  //                 borderTopColor: '#32465d',
  //                 borderStyle: 'solid',
  //                 borderTopWidth: 2,
  //               }}>
  //               <Opcoes id_prato={item.data().ID_Prato_Dia} />
  //             </View>
  //           </CardMontagem>
  //         </View>
  //       );
  //     });
  //     return lp;
  //   }
  // };

  // /* -------------------------------------------------------------------------- */
  // /*                         Designer geral da apricação                        */
  // /* -------------------------------------------------------------------------- */

};

export default montagemPratoDia;
