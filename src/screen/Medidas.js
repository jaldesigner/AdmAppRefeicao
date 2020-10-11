import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import estilo from '../style';
import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import { CardTpl, BtnLight, AlertDecisao } from '../components';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {maskDinheiro} from '../function';

export default function CadastraPrato({ navigation }) {
  const INF = DadosApp();
  const UID = (+new Date).toString(36);
  const DB = db().collection(INF.Categoria).doc(INF.ID_APP);
  const [valuePrato, setValuePrato] = useState('');
  const [acrescimoDividida, setAcrescimoDividida] = useState('');
  const [prato, setPrato] = useState('');
  const [cb, setCb] = useState(false);
  const [autDb, setAutDb] = useState('');

  function CadastrarPrato() {
    if (valuePrato === '') {
      alert('Por favor digite uma medida!');
    } else if (valuePrato.length < 3) {
      alert('A medida deve conter 3 ou mais digitos');
    } else {
      DB.collection('Medidas')
        .doc()
        .set({
          Medida: valuePrato,
          ID_Medida: UID,
        });

      setAutDb(1);
      setValuePrato('');
      alert('Medida adicionada com sucesso!');
    }
  }

  const deletaPrato = (ID_Prato, NomePrato) => {
    const cfmDel = () =>
      Alert.alert(
        'Atenção',
        'Deseja realmente excluir a Medida "' + NomePrato + '"',
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
      const item = DB.collection('Medidas')
        .where('ID_Medida', '==', ID_Prato);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
        });
      });

      setAutDb(1);
    }
  }

  useEffect(() => {
    const ExibePratos = async () => {
      const prts = await DB.collection('Medidas')
        .orderBy('Medida')
        .get();

      setPrato(prts.docs);
      setAutDb('');
    }
    ExibePratos();
  }, [autDb]);

  useEffect(() => {
    const exbEstadoDividida = async () => {
      const exb = await DB.collection('Configuracao').doc('Dividida').get();
      setCb(exb.data().Ativo);
    }
    const exbValorDividida = async () => {
      const exb = await DB.collection('Configuracao').doc('Acrescimo_Dividida').get();
      setAcrescimoDividida(exb.data().Valor);
    }
    exbValorDividida();
    exbEstadoDividida();
  }, [cb]);

  const GravaEstadoDivisão = (estado) => {
    DB.collection('Configuracao').doc('Dividida').set({
      Ativo: estado,
    });
  };

  const GravaValorDivisão = (valor) => {
    DB.collection('Configuracao').doc('Acrescimo_Dividida').set({
      Valor: valor,
    });
  };

  const Fl = () => {
    if (prato.length === 0 || prato.length === undefined) {
      return <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>;
    } else {
      const prt = prato.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().Medida}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaPrato(i.data().ID_Medida, i.data().Medida)}>
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
          <Cabecalho titulo="Medidas" subtitulo="Cadastro" />
          <View>
            <CardTpl titulo="Medidas">
              <View>
                <TextInput
                  placeholderTextColor="#aaa"
                  placeholder="Exp.: Pequena"
                  style={estilo.inpText}
                  value={valuePrato}
                  onChangeText={valuePrato => setValuePrato(valuePrato)}
                />
              </View>
              <View>
                <BtnLight value="Cadastrar" onPress={() => CadastrarPrato()} />
              </View>
            </CardTpl>

            <CardTpl titulo="Dividida">

              <View style={aparencia.row}>
                <Text style={{ color: '#fff', marginRight: 10 }}>Ativar divisão</Text>
                <CheckBox value={cb} onValueChange={novoValor => { setCb(novoValor); GravaEstadoDivisão(novoValor) }} />
              </View>

              {
                cb == false
                  ? <View />
                  : (
                    <View style={aparencia.row}>

                      <View style={{ flex: 2 }}>
                        <Text style={{ color: '#fff' }}>Valor do acrescimo</Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <TextInput
                          placeholderTextColor="#aaa"
                          placeholder="Exp.: 2,00"
                          style={estilo.inpText}
                          value={maskDinheiro(acrescimoDividida)}
                          onChangeText={acrescimo => {
                            setAcrescimoDividida(acrescimo);
                          }}
                        />
                      </View>

                      <View>
                        <TouchableOpacity style={{ backgroundColor: '#F64000', marginLeft: 5 }} onPress={()=>  GravaValorDivisão(maskDinheiro(acrescimoDividida))}>
                          <Text style={{ color: '#fff', padding: 9 }}>OK</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  )
              }

            </CardTpl>

            <CardTpl titulo="Medidas cadastradas">
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

const aparencia = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});