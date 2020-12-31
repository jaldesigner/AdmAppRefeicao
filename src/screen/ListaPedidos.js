import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Container, Content, Icon, Switch, Text, } from 'native-base';
import { Picker } from '@react-native-community/picker';

import DadosApp, { InfData } from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';

import { CardTpl, BtnLight, BtnSmallRight, CardPedido } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';


//==>Dados do App<===//
const INF = DadosApp();
const dataFull = InfData;

//==>Dados do DB<===//
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const SelecaoPratoDia = ({ navigation }) => {

	
	

	/* -------------------------------------------------------------------------- */
	/*                            Designer da Aplicação                           */
	/* -------------------------------------------------------------------------- */
	return (
		<Container style={estilo.container}>

			<Content>
				<Cabecalho titulo="Pedidos" subtitulo="Lista de pedidos" />
				<CardPedido nome="Jonas Alves Lucas">

					{/** Pedido */}
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon type="FontAwesome5" name="caret-right" style={{ color: '#00D1FF', marginRight: 5 }} />
						<Text style={{ color: '#7EE8FF' }}>Frango com quiabo - Média - R$ 14,00</Text>
					</View>

					{/** Observação */}
					<View>
						<View style={{ marginLeft: 15 }}>
							<Text style={{ color: '#fff' }}>(Sem farofa)</Text>
						</View>
					</View>

					{/** Endereço e dados para entrega */}
					<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
							<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endereço</Text>
						</View>
						<View style={{ paddingLeft: 20 }}>
							<Text style={{ color: '#fff' }}>
								Rua Jabotiá, 25, Itaipu, Belford Roxo
							</Text>
							<Text style={{ color: '#fff' }}>CEP : 26153-300</Text>
							<Text style={{ color: '#fff' }}>Telefone : (21) 99094-2812</Text>
						</View>
					</View>

					{/** Botão para a execução do pedido */}
					<View style={{ borderBottomWidth: 1, borderBottomColor: '#51557D', margin: 10, marginBottom: 10 }} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<View>
							<Text style={{ color: '#7EE8FF' }}>Execução</Text>
						</View>
						<View>
							<Switch value={true}></Switch>
						</View>
					</View>


				</CardPedido>
			</Content>
			<RodaPe />
		</Container>
	);
};

export default SelecaoPratoDia;
