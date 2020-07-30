/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, FlatLIst } from 'react-native';
import {
    Text,
    Container,
    Content,
    Picker,
    H1,
    H2,
    H3,
    Button,
    Icon,
    Card,
    CardItem,
    Body,
} from 'native-base';

import DadosApp from '../cfg/'; // CArrega os dados do aplicativo
import Header_tpl from '../components/header'; //Carrega o Cabeçalho da aplicação
import Footer_tpl from '../components/footerTab'; //Carrega o Roda-pé da aplicão

/**
 * Importa o ducumento que lista algo do db do app
 * mostrando uma lista através do documento php passado
 */
import ListaPratos from '../function/lista';


//console.log(ListaPratos('ListaPratosDia.php'));
//Pega as informações do App
const INF = DadosApp();

const montagemPratoDia = ({ navigation }) => {

    //Definação dos estados desta screen
    const [listaPratosDia, setListaPratosDia] = useState('');
    const [listaAcompanhamentosDia, setListaAcompanhamentosDia] = useState('');

     useEffect(()=>{
         const listaPratos = ListaPratos('ListaPratosDia.php');
         setListaPratosDia(() => listaPratos);
     }, []);

     //console.log(listaPratosDia);

     /**
      * Componente de teste
      */
    console.log(listaPratosDia[0]);
    const ListaDeSelecao = () =>{

    };

    return (
        <Container>
            <Header_tpl titulo="Montagem" subtitulo="Prato do dia" />
            <Content padder>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <H3>Macarrão a bolonhesa</H3>
                    <Picker placeholder="Selecione o acompanhamento" mode="dialog">
                        <Picker.Item value="1" label="Farofa" />
                        <Picker.Item value="2" label="Salda verde" />
                        <Picker.Item value="3" label="Batata Frita" />
                        <Picker.Item value="4" label="Salada de macarrão" />
                    </Picker>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <H3>Peixe Frito</H3>
                    <Picker>
                        <Picker.Item value="1" label="Farofa" />
                        <Picker.Item value="2" label="Salda verde" />
                        <Picker.Item value="3" label="Batata Frita" />
                        <Picker.Item value="4" label="Salada de macarrão" />
                    </Picker>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <H3>Carne assada</H3>
                    <Picker>
                        <Picker.Item value="1" label="Farofa" />
                        <Picker.Item value="2" label="Salda verde" />
                        <Picker.Item value="3" label="Batata Frita" />
                        <Picker.Item value="4" label="Salada de macarrão" />
                    </Picker>
                </View>
                <View>
                    <Button>
                        <Text>Ativar</Text>
                        <Icon name="checkmark" />
                    </Button>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30}}>
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
    );
};

export default montagemPratoDia;
