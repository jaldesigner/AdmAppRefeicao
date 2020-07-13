import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  List,
  Icon,
  Right,
} from 'native-base';
import db from '@react-native-firebase/firestore';

//Estilo da página
import estilo from '../style';
import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import { CardTpl, BtnLight, AlertDecisao } from '../components';
import { set } from 'react-native-reanimated';

export default function CadastraAcompanhamento({ navigation }) {
  //INFO APP
  const INF = DadosApp();
  //ID Único
  const UID = (+new Date).toString(16);

  //console.log(UID);


  /* -------------------------------------------------------------------------- */
  /*                        Cria o state inicial do prato                       */
  /* -------------------------------------------------------------------------- */

  const [valueAcompanhamento, setValueAcompanhamento] = useState('');
  const [acompanhamento, setAcompanhamento] = useState('');
  const [autDb, setAutDb] = useState('');

  function CadastrarPrato() {
    if (valueAcompanhamento === '') {
      alert('Por favor digite o prato a ser cadastrado!');
    } else if (valueAcompanhamento.length < 3) {
      alert('O nome do prato deve conter 6 ou mais digitos!');
    } else {
      db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('Acompanhamentos')
        .doc()
        .set({
          NomeAcompanhamento: valueAcompanhamento,
          ID_Acompanhamento: UID,
        });

        setValueAcompanhamento('');
        setAutDb(1);
        alert('Acompanhamento adicionado!');
    }
  }


  /**
   * ========================================================
   * =======> DEleta itens da lista de pratos do dia
   * ========================================================
   */
  const deletaPrato = (id_item, n_item) => {

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

    cfmDel();

    const DelItemList = ()=> {
      let item = db()
      .collection(INF.Categoria)
      .doc(INF.ID_APP)
      .collection('Acompanhamentos')
      .where('ID_Acompanhamento','==',id_item);

      item.get().then((snp)=>{
        snp.forEach((doc) => {
          doc.ref.delete();
        });
      });

      setAutDb(1);

      //console.log();
    };
  };

  useEffect(() => {
    /**
     * ==========================================
     * Exibe a lista de pratos cadastrados.
     *===========================================
     */
    const ExibeAcompanhamentos = async () => {
      const acmp = await db()
        .collection(INF.Categoria)
        .doc(INF.ID_APP)
        .collection('Acompanhamentos')
        .orderBy('NomeAcompanhamento')
        .get();

      setAcompanhamento(acmp.docs);
      setAutDb('');
    }
    ExibeAcompanhamentos();

  }, [autDb]);

  //console.log(acompanhamento);

  /**
   * ============================================================
   *  => => Visual do programa / componentes
   * ============================================================
   */

  const Fl = () => {
    if (acompanhamento.length === 0 || acompanhamento.length === undefined) {
      return <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>;
    } else {
      const prt = acompanhamento.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().NomeAcompanhamento}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaPrato(i.data().ID_Acompanhamento, i.data().NomeAcompanhamento)}>
                <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return prt;
    }
  };

  //console.log(Fl);

  return (
    <>
      <Container style={estilo.container}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Cadastro" subtitulo="Acompanhamentos" />
          <View>
            <CardTpl titulo="Cadastro">
              <View>
                <TextInput
                  placeholderTextColor="#aaa"
                  placeholder="Exp.: Francom com Quiabo"
                  style={estilo.inpText}
                  value={valueAcompanhamento}
                  onChangeText={valueAcompanhamento => setValueAcompanhamento(valueAcompanhamento)}
                />
              </View>
              <View>
                <BtnLight value="Cadastrar" onPress={() => CadastrarPrato()} />
              </View>
            </CardTpl>
            <CardTpl titulo="Acompanhementos">
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
