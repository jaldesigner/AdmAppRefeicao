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
import { Card, CardItem, Container, Content, Icon, Item, Text } from 'native-base';
import { Picker } from '@react-native-community/picker';
import DadosApp, { InfData } from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import { CardTpl, BtnLight, BtnSmallRight } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';
import { CTX_SelecaoPrato } from '../context';


// ==>Dados do App<== //
const INF = DadosApp();
const dataFull = InfData;

// ==>Dados do DB<== //
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
  const [cardapioDia, setCardapioDia] = useState([]);
  const [autoVal, setAutoVal] = useState(0);




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

  useEffect(() => {
    DB.collection('CardapioDoDia')
      .where('Ativo', '==', true)
      .where('Data', '==', InfData)
      .onSnapshot(snp => {
        setCardapioDia(snp.docs);
      })
  }, []);

  useFocusEffect(() => {
    setArrayValores(arrayValores);
    setctx_SP(ctx_SP);
    setAutoVal(0);
  }, [autoVal, ctx_SP]);

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

                  medida: mv.data().Medida,
                  valor: valor,
                  indice: index,

                }
                setArrayValores(arrayValores);
                setAutoVal(1);
              }}
              selectedValue={arrayValores[index] != undefined ? arrayValores[index].valor : 'Selecione o valor'}
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
  /*                           Deleta item selecionado                          */
  /* -------------------------------------------------------------------------- */

  function delItem(item, ind) {
    Alert.alert(
      'Atenção!',
      'Deseja realmente excluir o Item \" ' + item[ind].prato + '\"?',
      [
        {
          text: 'Sim',
          onPress: () => {
            item.splice(ind, 1);
            setAutoVal(1);
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
  /* -------------------------------------------------------------------------- */
  /*                         Lista os pratos escolhidos                         */
  /* -------------------------------------------------------------------------- */

  function ListaSelecionados() {
    const ctxListaPratosDia = ctx_SP.map((item, index) => {
      return (
        <View key={index} style={{
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
            <Text style={{ color: '#fff', marginLeft: 5, }}>{item.prato}</Text>
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
            }} onPress={() => delItem(ctx_SP, index)} >
              <Icon name='trash' type='FontAwesome5' style={{ color: '#fff', fontSize: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    })
    if (ctx_SP.length !== 0) {
      return (
        <View>
          <CardTpl titulo="Selecionados">
            {ctxListaPratosDia}
          </CardTpl>
          {btnAvancar()}
        </View>
      );
    }

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
        setValueListaPrato('')
      } else {
        alert('Este prato já está na lista!');
      }

    }
  }

  function btnAvancar() {
    if (ctx_SP.length !== 0 || ctx_SP.length !== undefined) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'flex-end', }}>
          <BtnSmallRight
            value="Próximo"
            onPress={() => navigation.navigate('MontagemPratoDia', { auto: 0 })}>
            <Text>Próximo</Text>
            <Icon name="arrow-forward" />
          </BtnSmallRight>
        </View>
      );
    }
  }

  if (cardapioDia.length === 0) {
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
  } else {
    return (
      <View>
        <Text>Tem Cardápio</Text>
      </View>
    );
  }

}

export default SelecaoPratoDia;