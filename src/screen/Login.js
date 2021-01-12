import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/firestore';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

// Import do estilo
import estilo from '../style/';
import {Container, Header, Icon} from 'native-base';

export default function Login({navigation}) { // Cria os estados iniciais da aplicação //=>HOOKs<=/
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [toast, setToast] = useState('');

  const msgErro = {
    erroEmailSenha: "Email e senha inválido!",
    erroEmailInvalido: "Email inválido!",
    erroSenhaInvalido: "Senha inválida!"
  }


  // Checa se o usuário é administrador
  const checaAdm = (UID) => {}

  // autentic.signInWithEmailAndPassword('jaldesigner@uol.com.br', 'vidaloka');

  // Função que faz o usuário logar
  const Entrar = async () => {
    if (email == '' || senha == '') {
      console.log(msgErro.erroEmailSenha);
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, senha);
      } catch (e) {
        console.log(e.code);
        switch (e.code) {
          case 'auth/user-not-found':
            console.log(msgErro.erroEmailInvalido);
            break;
          case 'auth/wrong-password':
            console.log(msgErro.erroSenhaInvalido);
            break;
          case 'auth/invalid-email':
            console.log(msgErro.erroEmailInvalido);
            break;

          default:
            break;
        }
      }
    }
  }
  // console.log(auth().currentUser.uid);
  // console.log(autentic.currentUser.uid);
  // Captura o email e senha e trata com o firebase
  // async function logar(email, senha) {
  //     if (email === '' || senha === '') {
  //         alert("Entre com email e senha válido!");
  //     }
  //     else {
  //         try {
  //             await autentic.signInWithEmailAndPassword(email, senha);
  //             alert("Logado com Sucesso!");
  //         } catch (e) {
  //             //alert(e.message);
  //             switch (e.code) {
  //                 case 'auth/wrong-password':
  //                     alert('Senha incorreta!');
  //                 default:
  //                     alert(e);
  //             }

  //         }
  //     }
  // }
  // console.log(email);
  // console.log(senha);
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
