import React, { useState, useEffect, } from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/firestore';
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

//Import do estilo
import estilo from '../style/';

export default function Login({ navigation }) {

    const autentic = firebase.auth();

    //Cria os estados iniciais da aplicação //=>HOOKs<=/
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const verificaUsuarioLogado = autentic.onUserChanged((user) => {
        if (user) {
            navigation.navigate("Home");
        }
    });

    useEffect(() => {
        verificaUsuarioLogado();
    }, []);


    //Captura o email e senha e trata com o firebase
    async function logar(email, senha) {
        if (email === '' || senha === '') {
            alert("Entre com email e senha válido!");
        }
        else {
            try {
                await autentic.signInWithEmailAndPassword(email, senha);
                alert("Logado com Sucesso!");
            } catch (e) {
                //alert(e.message);
                switch (e.code) {
                    case 'auth/wrong-password':
                        alert('Senha incorreta!');
                    default:
                        alert('default');
                }

            }
        }
    }

    return (
        <>
            <StatusBar />
            <SafeAreaView style={estilo.container}>
                <ScrollView>
                    <View style={estilo.card}>
                        <Text>Painel ADM</Text>
                    </View>
                    <View style={estilo.card}>
                        <View>
                            <TextInput
                                placeholder="E-mail"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder="Senha"
                                value={senha}
                                onChangeText={senha => setSenha(senha)}
                                secureTextEntry={true}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.btnEntrar}
                                onPress={() => logar(email, senha)}>
                                <Text style={styles.txtBtnEntrar}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    btnEntrar: {
        backgroundColor: "#9940e2",
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        marginBottom: 20,
    },
    txtBtnEntrar: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});
