import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/firestore';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import DadosApp, {InfData} from '../cfg';

// Import do estilo
import estilo from '../style/';
import {Container, Icon, Toast} from 'native-base';
const db = database().collection(DadosApp().Categoria).doc(DadosApp().ID_APP);

export default function Login({navigation}) { 
  // Cria os estados iniciais da aplicação //=>HOOKs<=/
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [sucesso, setSucesso] = useState(false);


  const getToast = (msg, posicao, tipo, tmp) => {
    Toast.show({
      text: msg,
      buttonText: "Ok",
      position: posicao,
      type: tipo,
      duration: tmp
    },);
  }

  // const listaAdm = (){
  //   db.collection('ADM')
  // }


  const checaAdm = (UID) => {
    const isAdm = db.collection('ADM')
    .where('UID','==',UID)
    .onSnapshot(snp => {
      snp.docs.map(mp =>{
        console.log(mp.exists);
      })
    });

  }
  // const tempo = (tmp)=>{
  //   setTimeout(() => {
  //     navigation.navigate('Home');
  //   }, tmp);
  // }

  const Entrar = async () => {

    if (email == '' || senha == '') { 
      getToast("Email ou senha inválido!", 'top', 'danger', 9000);
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, senha);
        checaAdm(auth().currentUser.uid);
        //getToast("Sua entrada foi aprovada!\n Aguarde...", 'top', 'success', 5000);
        
      } catch (e) {
        console.log(e.code);
        switch (e.code) {
          case 'auth/user-not-found': getToast("Email ou senha inválido!", 'top', 'danger', 9000)
            break;
          case 'auth/wrong-password': getToast("Email ou senha inválido!", 'top', 'danger', 9000)
            break;
          case 'auth/invalid-email': getToast("Formato de mail inválido!", 'top', 'danger', 9000)
            break;

          default:
            break;
        }
      }
    }
  }
  return (
    <Container style={
      estilo.container
    }>

      <View style={
        estilo.loginHeader
      }>
        <Icon name='user-lock' type='FontAwesome5'
          style={
            {
              color: '#fff',
              fontSize: 60
            }
          }/>
        <Text style={
          estilo.loginTextHeader
        }>Login</Text>
      </View>
      <View style={
        estilo.loginBody
      }>

        <View style={
          estilo.loginBoxTextInput
        }>
          <View style={
            estilo.loginBoxIconTextInput
          }>
            <Icon name='user-alt' type='FontAwesome5'
              style={
                {color: '#fff'}
              }/>
          </View>
          <TextInput autoCapitalize='none' keyboardType='email-address'
            onChangeText={
              (txt) => setEmail(txt.trim())
            }
            value={email}
            placeholder="Digite seu email"
            placeholderTextColor='#4C8F9D'
            style={
              estilo.loginTextInput
            }/>
        </View>
        <View style={
          estilo.loginBoxTextInput
        }>
          <View style={
            estilo.loginBoxIconTextInput
          }>
            <Icon name='key' type='FontAwesome5'
              style={
                {color: '#fff'}
              }/>
          </View>
          <TextInput keyboardType='default'
            secureTextEntry={true}
            autoCapitalize='none'
            placeholder='Digite sua senha'
            placeholderTextColor='#4C8F9D'
            onChangeText={
              (txt) => setSenha(txt.trim())
            }
            value={senha}
            style={
              estilo.loginTextInput
            }/>
        </View>

        <View style={
          estilo.loginBoxBtn
        }>
          <TouchableOpacity style={
              estilo.loginBtn
            }
            onPress={
              () => Entrar()
          }>
            <Text style={
              estilo.loginTextBtn
            }>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={
              estilo.loginTextBtnNaoEntrar
            }>Não consigo entrar</Text>
          </TouchableOpacity>

        </View>

      </View>
    </Container>
  );
}
