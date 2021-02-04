import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Modal
} from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Container, Content, Icon, Item, Text } from 'native-base';
import { Picker } from '@react-native-community/picker';
import DadosApp, { InfData } from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import { CardTpl, BtnLight, BtnSmallRight } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';
import { CTX_SelecaoPrato } from '../context';


// ==>Dados do App<===//
const INF = DadosApp();
const dataFull = InfData;

// ==>Dados do DB<===//
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const SelecaoPratoDia = ({ navigation }) => {

  /* -------------------------------------------------------------------------- */
  /*                            Estados da Aplicação                            */
  /* -------------------------------------------------------------------------- */
  const [ctx_SP, setctx_SP] = useContext(CTX_SelecaoPrato);
  const [pratos, setPratos] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [valores, setValores] = useState([]);
  const [listaPratosDia, setListaPratosDia] = useState([]);
  const [valueListaPrato, setValueListaPrato] = useState('');
  const [arrayValores, setArrayValores] = useState([]);
  const [autoVal, setAutoVal] = useState(0);
  const [autoListaPratos, setAutoListaPratos] = useState(0);
  const [exibe, setExibe] = useState(0);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    DB.collection('Pratos')
      .orderBy('NomePrato')
      .onSnapshot(snp => {
        setPratos(snp.docs);
      });
  }, []);

  useEffect(() => {
    DB.collection('Medidas')
      .orderBy('Medida')
      .onSnapshot(snp => {
        setMedidas(snp.docs);
      });
  }, []);

  useEffect(() => {
    DB.collection('Valores')
      .orderBy('Valor')
      .onSnapshot(snp => {
        setValores(snp.docs);
      });
  }, []);

  useFocusEffect(() => {
    setArrayValores(arrayValores);
    setAutoVal(0);
    //console.log(arrayValores);
  }, [autoVal]);


  /* function checaPratoDuplicado(array){
      const criaArray = (array) => {
        const arr = [];
        for (const item of array) {
          arr.push(item.prato)
        }
        return arr;
      }

      let arrayPratos = criaArray(listaPratosDia);
      let existeItem = arrayPratos.findIndex(i => i == valueListaPrato);

      if (existeItem == -1) {
        listaPratosDia.push({
          prato: valueListaPrato,
          info: arrayValores
        });
  }
  } */

  function Prato() {
    const pt = pratos.map((pratos, index) => {
      return (
        <Picker.Item key={index} value={pratos.data().NomePrato} label={pratos.data().NomePrato} />
      );
    });
    return pt;
  }

  function Valor() {
    const md = valores.map((valor, index) => {

      return (
        <Picker.Item key={index} color="" value={valor.data().Valor} label={valor.data().Valor} />
      );
    });
    return md;
  }

  /* -------------------------------------------------------------------------- */
  /*                        Lista as Medidas cadastradas                        */
  /* -------------------------------------------------------------------------- */

  function ListaMedidasValores(index) {

    const mv = medidas.map((mv, index) => {
      //const lmv = [];
      return (
        <View key={index} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          marginTop: 20,
          backgroundColor: '#51557D',
          padding: 10,
        }}>
          <View>
            <Text style={{ color: "#fff" }}>{mv.data().Medida}</Text>
          </View>
          <View>
            <Picker
              mode='dropdown'
              onValueChange={valor => {

                arrayValores[index] = {
                  info: {
                    medida: mv.data().Medida,
                    valor: valor,
                    indice: index,
                  },
                }
                setArrayValores(arrayValores);
                setAutoVal(1);
                //console.log(arrayValores);
              }}
              selectedValue={arrayValores[index] != undefined ? arrayValores[index].info.valor : 'Selecione o valor'}
              style={{
                backgroundColor: "#fff",
                height: 25,
                width: 150,
              }}
            >
              <Picker.Item value="" label="Selecione o valor" />
              {Valor()}
              <Picker.Item value={null} label="Desativado" />
            </Picker>
          </View>
        </View>
      );
    });

    if (valueListaPrato !== '') {
      return mv;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                         Lista os pratos escolhidos                         */
  /* -------------------------------------------------------------------------- */

  function ListaSelecionados() {
    const ctxListaPratosDia = ctx_SP.map((item, index) => {
      console.log(item.prato);
    })
    return (
      <View>
        <CardTpl titulo="Selecionados">
          <View style={{
            backgroundColor: '#51557D',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon name='caret-right' type="FontAwesome5" style={{
                color: '#00D1FF',
              }} />
              <Text style={{ color: '#fff', marginLeft: 5, }}>Frango Grelhado</Text>
            </View>
            <View>
              <TouchableOpacity style={{
                backgroundColor: '#FF5757',
                //padding:5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                width: 40,
                height: 40,
                elevation: 5,
              }}>
                <Icon name='trash' type='FontAwesome5' style={{ color: '#fff', fontSize: 18 }} />
              </TouchableOpacity>
            </View>
          </View>
        </CardTpl>
      </View>
    );
  }

  /* ----------------------------------------------------------------------------- */
  /*                    Função Geral com todas as outras funções                   */
  /* ----------------------------------------------------------------------------- */

  function SelecaoPratoDoDia() {
    return (
      <View>
        <CardTpl titulo="Seleção de cardápio do dia">
          <View style={{ backgroundColor: "#fff" }}>
            <Picker
              mode='dropdown'
              itemStyle=''
              selectedValue={valueListaPrato}
              onValueChange={valueListaPrato => {
                setValueListaPrato(valueListaPrato);
              }
              }
            >

              <Picker.Item value='' label="Selecione um prato" />
              {Prato()}
            </Picker>
          </View>
          {ListaMedidasValores()}
          <View>
            {
              valueListaPrato !== '' ? <BtnLight value="Adicionar" onPress={addPratoSelecionado} /> : <View />
            }
          </View>
        </CardTpl>
      </View>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                        Adiciona os pratos selecionados                     */
  /* -------------------------------------------------------------------------- */

  function addPratoSelecionado() {
    let qntMedidas = medidas.length;
    let qntValorSelecionado = arrayValores.length;

    if (qntValorSelecionado != qntMedidas) {
      alert("Selecione Um valor pra cada medidas ou escolha \"desativado\"")
    } else {
      const criaArray = (array) => {
        const arr = [];
        for (const item of array) {
          arr.push(item.prato)
        }
        return arr;
      }

      let arrayPratos = criaArray(listaPratosDia);
      let existeItem = arrayPratos.findIndex(i => i == valueListaPrato);

      if (existeItem == -1) {
        listaPratosDia.push({
          prato: valueListaPrato,
          info: arrayValores
        });

        setctx_SP(listaPratosDia);
      } else {
        alert('Este prato já está na lista!');
      }
      /* console.log('-------------------------------------------------------------------------')
      console.log(ctx_SP);
      //console.log(listaPratosDia);
      console.log('-------------------------------------------------------------------------') */
    }
  }


  //Componentes
  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Cardápio" subtitulo="Seleção" />
        {SelecaoPratoDoDia()}
        {ListaSelecionados()}
      </Content>
      <RodaPe />
    </Container>
  );

}

export default SelecaoPratoDia;

// //console.log(ctx_SP);

// /* -------------------------------------------------------------------------- */
// /*                    Exibe a lista de pratos cadastrados.                    */
// /* -------------------------------------------------------------------------- */

// useEffect(() => {
//     async function ExibePratos() {

//       const prts = await DB
//         .collection('Pratos')
//         .orderBy('ID_Prato')
//         .get();

//       setListaPratos(prts.docs);
//     }
//     ExibePratos();
// }, []);

// /* -------------------------------------------------------------------------- */
// /*                         Lista os medidas dos pratos                        */
// /* -------------------------------------------------------------------------- */
// useEffect(() => {
//     const exibeMedidas = () => {
//       const mdd = DB.collection('Medidas')
//         .orderBy('Medida')
//         .onSnapshot(snp => {
//           setMedidas(snp.docs);
//         });
//     };
//     exibeMedidas();
// }, [autDb]);

// /* -------------------------------------------------------------------------- */
// /*                        Lista os valores cadastrados                        */
// /* -------------------------------------------------------------------------- */
// useEffect(() => {
//     const exibeValores = () => {
//       const vl = DB.collection('Valores')
//         .orderBy('Valor')
//         .onSnapshot(snp=>{
//           setValores(snp.docs);
//         });
//       setAutDb('');
//     };
//     exibeValores();
// }, [autDb, arrayValores]);

// useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
// });

// /* -------------------------------------------------------------------------- */
// /*                           Lista os pratos do dia                           */
// /* -------------------------------------------------------------------------- */

// useEffect(() => {
//     //Lista os pratos do dia
//     const listPratosDia = () => {
//       const lstPD = DB
//         .collection('CardapioDoDia')
//         .where('Data', '==', dataFull)
//         .onSnapshot(querySNP => {
//           setListaPratosDia(querySNP.docs);
//         }, erro => {
//           console.log(`Ocorreu um erro ao Listar os Pratos: ${erro}`);
//         });
//     }

//     listPratosDia();
//     setAutDb('');
// }, []);

// /* -------------------------------------------------------------------------- */
// /*                   Deleta itens da lista de pratos do dia                   */
// /* -------------------------------------------------------------------------- */

// const deletaPratoDaLista = (id_item, n_item) => {
//     const cfmDel = () =>
//       Alert.alert(
//         'Atenção',
//         'Deseja realmente excluir o prato "' + n_item + '"?',
//         [
//           {
//             text: 'Não',
//             style: 'cancel',
//             cancelable: false,
//           },
//           {
//             text: 'Sim',
//             onPress: () => DelItemList(),
//           },
//         ],
//       );

//     function DelItemList() {
//       const item = DB
//         .collection('CardapioDoDia')
//         .where('ID_Prato_Dia', '==', id_item);

//       item.get().then((snp) => {
//         snp.forEach((doc) => {
//           doc.ref.delete();
//           //setAutDb(1);
//         });
//       });
//     }
//     cfmDel();
// };

// /* -------------------------------------------------------------------------- */
// /*                        Grava no DB Os Pratos do dia                        */
// /* -------------------------------------------------------------------------- */
// const CadastrarPratosDia = () => {

//     const execute = () => {
//       DB.collection('CardapioDoDia').add({
//         ID_Prato_Dia: (+new Date).toString(16),
//         NomePratoDoDia: valueListaPrato,
//         Data: dataFull,
//         Ativo: true,
//         infoPrato: arrayValores,
//       });
//     };

//     if (valueListaPrato === '') {
//       alert('Selecione pelomenos um Prato!');
//     } else {
//       if (listaPratosDia.length === undefined) {
//         execute();
//         setValueListaPrato('');
//         //setAutDb(1);
//       } else {
//         const resultado = listaPratosDia.findIndex(
//           acomp => acomp.data().NomePratoDoDia === valueListaPrato,
//         );

//         if (resultado !== -1) {
//           alert('Este prato já se encontra no cardápio!');
//         } else {
//           execute();
//           setValueListaPrato('');
//           //setAutDb(1);
//         }
//       }
//     }
// };

// /* -------------------------------------------------------------------------- */
// /*                     Lista de Pratos do dia a ser exibidos                  */
// /* -------------------------------------------------------------------------- */
// const Fl = () => {
//     if (listaPratosDia.length === 0 || listaPratosDia.length === undefined) {
//       return (
//         <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>
//       );
//     } else {
//       const prt = listaPratosDia.map((i, index) => {
//         return (
//           <View key={index} style={estilo.lista}>
//             <View style={estilo.boxTextLista}>
//               <View style={estilo.sqrLista} />
//               <Text style={estilo.txtLista}>{i.data().NomePratoDoDia}</Text>
//             </View>
//             <View>
//               <TouchableOpacity
//                 onPress={() =>
//                   deletaPratoDaLista(i.data().ID_Prato_Dia, i.data().NomePratoDoDia)
//                 }>
//                 <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         );
//       });
//       return prt;
//     }
// };

// /* -------------------------------------------------------------------------- */
// /*                       Lista de medidas a ser exibidas                      */
// /* -------------------------------------------------------------------------- */
// const LtMedidas = () => {
//     if (medidas.length === 0 || medidas.length === undefined) {
//       return (
//         <Text>Não há Medidas cadastradas</Text>
//       );
//     } else if (valueListaPrato === '') {
//       return (
//         <View />
//       );
//     } else {
//       const mdd = medidas.map((item, index) => {
//         const contMedidas = medidas.length;
//         if (arrayValores.length == 0) {
//           for (var i = 0; i < contMedidas; i++) {
//             arrayValores.push({
//               Medida: item.data().Medida,
//               Valor: "Valor",
//               key: index,
//             });
//           }

//         }
//         return (
//           <View key={index} style={{
//             alignItems: 'center',
//             flexDirection: 'row',
//             alignSelf: 'auto',
//             paddingTop: 10,
//             backgroundColor: '#51557D',
//             padding: 10,
//             marginTop: 10,
//           }}>
//             <View style={{ flex: 2 }}>
//               <Text style={{ color: '#fff' }}>{item.data().Medida}</Text>
//             </View>
//             <View style={{ flex: 2, alignItems: 'flex-end' }}>
//               <Picker
//                 style={{ width: '100%', backgroundColor: '#fff' }}
//                 mode='dropdown'
//                 selectedValue={
//                   //valores
//                   arrayValores.length >= 1 ? arrayValores[index].Valor : "valores"
//                 }
//                 onValueChange={(vl) => {
//                   for (var i = 0; i < contMedidas; i++) {
//                     arrayValores[index].Medida = item.data().Medida;
//                     arrayValores[index].Valor = vl;
//                     arrayValores[index].key = index;
//                   }

//                   //setArrayValores(arrayValores);
//                   setAutDb(1);
//                 }}


//               >
//                 <Picker.Item key='' label="Valores" />
//                 {valores.map((item, index) => {
//                   return (
//                     <Picker.Item
//                       key={index}
//                       label={item.data().Valor}
//                       value={item.data().Valor}
//                     />
//                   );
//                 })}
//               </Picker>
//             </View>
//           </View>
//         );
//       });
//       return mdd;
//     }
// };

// const ModalLoading = () => {
//     if (loading) {
//       return (
//         <View style={StyleModal.container}>
//           <View style={StyleModal.boxLogin}>
//             <ActivityIndicator size='large' color='#F64000' />
//           </View>
//         </View>
//       );
//     }
//     return null;
// }

// /* -------------------------------------------------------------------------- */
// /*                            Designer da Aplicação                           */
// /* -------------------------------------------------------------------------- */
// return (
//     <Container style={estilo.container}>
//       <ModalLoading />
//       <Content>
//         <Cabecalho titulo="Cardápio" subtitulo="Seleção" />

//         <CardTpl titulo="Selecionar">
//           <View>
//             <Picker
//               mode="dropdown"
//               style={{ width: '100%', backgroundColor: '#fff' }}
//               selectedValue={valueListaPrato}
//               onValueChange={valueListaPrato =>
//                 setValueListaPrato(valueListaPrato)
//               }>
//               <Picker.Item key="" label="Selecione o prato do dia" value="" />
//               {listaPratos.map((item, index) => {
//                 return (
//                   <Picker.Item
//                     key={index}
//                     label={item.data().NomePrato}
//                     value={item.data().NomePrato}
//                   />
//                 );
//               })}
//             </Picker>
//             <View>
//               <LtMedidas />
//             </View>
//             <BtnLight value="Adicionar" onPress={() => CadastrarPratosDia()} />
//           </View>
//         </CardTpl>
//         <CardTpl titulo="Lista">
//           <Fl />
//         </CardTpl>
//       </Content>
//       {listaPratosDia.length > 0 ? (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'flex-end', }}>
//           <BtnSmallRight
//             value="Próximo"
//             onPress={() => navigation.navigate('MontagemPratoDia')}>
//             <Text>Próximo</Text>
//             <Icon name="arrow-forward" />
//           </BtnSmallRight>
//         </View>
//       ) : (
//           <Text />
//         )}
//       <RodaPe />
//     </Container>
// );
// };

// export default SelecaoPratoDia;

// const StyleModal = StyleSheet.create({
// container: {
//     flex: 1,
//     backgroundColor: '#2D3043',
//     opacity: 0.98,
//     position: 'absolute',
//     zIndex: 99999,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
// },
// boxLogin: {
//     backgroundColor: '#fff',
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     borderRadius: 15,
// }
// });
