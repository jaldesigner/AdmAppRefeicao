import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db, { firebase } from '@react-native-firebase/firestore';
import { Card, Container, Content, Icon, Switch, Text, } from 'native-base';
import DadosApp, { InfData } from '../cfg';
import { Cabecalho } from '../components/header';
import { CardPedido } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';

const INF = DadosApp();
const dataFull = InfData;
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);
const SelecaoPratoDia = ({ navigation }) => {

	const [listaPedidos, setListaPedidos] = useState([]);


	/**+++++++++++++++++++++++++++++++++++++++++ */

	useEffect(() => {
		DB.collection('Pedidos')
			.where('Data_Pedido','==',dataFull)
			.onSnapshot(snp => {
				setListaPedidos(snp.docs);
			})
	}, []);

	//console.log(listaPedidos);

	const pedidosUser = (array) => {
		const pdd = array.map((ped, index) => {
			//console.log(ped)
			return (
				<View key={index} style={{ backgroundColor: "#040513", padding: 5, marginBottom: 5,}}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon type="FontAwesome5" name="caret-right" style={{ color: '#00D1FF', marginRight: 5 }} />
						<Text style={{ color: '#7EE8FF', fontSize: 16, fontWeight: 'bold' }}>{ped.prato + " com " + ped.acompanhamento}</Text>
					</View>

					<View style={{ backgroundColor: "#040513", paddingBottom: 10, paddingTop: 10, marginBottom: 10 }}>
						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Medida: </Text>
							<Text style={{ color: '#fff' }}>{ped.Medida}</Text>
						</View>

						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Valor: </Text>
							<Text style={{ color: '#fff' }}>{ped.Valor}</Text>
						</View>

						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Observação: </Text>
							<Text style={{ color: '#fff' }}>{ped.Observacao == "" ? "Nehuma" : ped.Observacao}</Text>
						</View>
					</View>
				</View>
			);
		});
		return pdd;
	}

	const ListP = () => {
		const m = listaPedidos.map((item, index) => {
			console.log(item.data().Endereco);
			return (
				<CardPedido nome={item.data().Endereco.Nome} key={index}>

					{/** Pedido */}
					{pedidosUser(item.data().Pedido)}

					<View style={{
						flexDirection: 'row', backgroundColor: '#040513', alignItems: 'center', justifyContent: 'center'
					}}>
						<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Total: </Text>
						<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Total_Pagar}</Text>
						<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

						<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Em mãos: </Text>
						<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Dinheiro_em_Maos}</Text>
						<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

						<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Troco: </Text>
						<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Troco}</Text>
					</View>

					{/** Endereço e dados para entrega */}
					<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
							<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endereço</Text>
						</View>
						<View style={{ paddingLeft: 20 }}>
							<Text style={{ color: '#fff' }}>
								Rua {item.data().Endereco.Rua}, N°{item.data().Endereco.Numero} {item.data().Endereco.Complemento == "" ? '' : ", " + item.data().Endereco.Complemento}, {item.data().Endereco.Bairro}, {item.data().Endereco.Cidade}
							</Text>
							<Text style={{ color: '#fff' }}>Telefone : {item.data().Endereco.Telefone}</Text>
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
			);
		})

		return m;

	}

	/* -------------------------------------------------------------------------- */
	/*                            Designer da Aplicação                           */
	/* -------------------------------------------------------------------------- */
	return (
		<Container style={estilo.container}>
			<Content>
				<Cabecalho titulo="Pedidos" subtitulo="Lista de pedidos" />
				{ListP()}
			</Content>
			<RodaPe />
		</Container>
	);
};

export default SelecaoPratoDia;
