import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

//importa o style
import estilo from '../style';
import NavBarTop from '../components/NavBarTop';

export default function CadastraConteudoPrato({ navigation }) {
  //FuncDB.DBMySqlInsert.Insert();
  /**
  * ============================================================
  *  => => Início de tratamento da página de cadastro de prato
  * ============================================================
  */

  ////////////////////////////////////
  //Cria o state inicial do prato
  ///////////////////////////////////
  const [valueConteudo, setValueConteudo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autDb, setAutDb] = useState('');


  async function CadastrarConteudo() {
    if (valueConteudo === '') {
      alert('Por favor digite o prato a ser cadastrado!');
    } else {
      if (valueConteudo.length >= 2) {
        const response = await fetch('http://192.168.0.103/sites/apprefeicao/insert.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            in_valor: valueConteudo,
            tabela: 'conteudo_prato',
            campo: 'nome_conteudo_prato',
          }),
        });
        const data = await response.json();
        if (data[0] === 'gravado') {
          alert('Gravado com sucesso!');
          setAutDb(() => data[1]);
          setValueConteudo('');
        }
      } else {
        alert("O nome do prato deve conter 6 ou mais digitos!");
      }
    }
  }

  useEffect(() => {

    /**
     * ==========================================
     * Exibe a lista de pratos cadastrados.
     *===========================================
     */
    async function ExibeConteudo() {
      const response = await fetch('http://192.168.0.103/sites/apprefeicao/lista.php?tabela=conteudo_prato');
      const json = await response.json();

      setConteudo(() => json);
    }
    ExibeConteudo();

  }, [autDb]);


  //console.log(prato);

  /**
  * ============================================================
  *  => => Visual do programa / componentes
  * ============================================================
  */
  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilo.container}>
        <NavBarTop />
        <View>
          <View style={estilo.card}>
            <View>
              <Text style={estilo.txtTitulo}>Cadastro de Conteúdos de Prato</Text>
              <Text>Nome do Conteúdo</Text>
              <TextInput
                placeholder="Exp.: Frango ao molho"
                value={valueConteudo}
                onChangeText={(valueConteudo) => setValueConteudo(valueConteudo)}
              />
            </View>
            <View>
              <TouchableOpacity style={estilo.btn1} onPress={() => CadastrarConteudo()}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Castrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={estilo.card}>
            <Text style={estilo.txtTitulo}>Lista de Conteúdo</Text>
            <SafeAreaView>
              <FlatList
                data={conteudo}
                renderItem={({ item }) => <Text style={estilo.listaCadastroPrato}>{item.nome_conteudo_prato}</Text>
                }
                keyExtractor={item => item.id_counteudo_prato}
              />
            </SafeAreaView>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
}
