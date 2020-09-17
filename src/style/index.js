import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    backgroundColor: '#2D3043',
    color: '#fff',
  },
  conteudo:{
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    margin: 5,
    padding: 5,
  },
  btn1: {
    padding: 5,
    color: '#fff',
    backgroundColor: '#9940e2',
    marginBottom: 10,
    marginTop: 10,
  },
  txtTitulo: {
    color: '#9940e2',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
    marginBottom: 10,
  },
  listaCadastroPrato: {
    marginTop: 5,
    fontSize: 18,
    color: '#f3d6ff',
    backgroundColor: '#20272F',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  inpText: {
    color: '#5351F9',
    width: '100%',
    fontSize: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#214478',
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#fff',
  },
  lista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 5,
  },
  sqrLista: {
    backgroundColor: '#F6B900',
    width: 10,
    height: 10,
    marginRight: 10,
  },
  txtLista: {
    color: '#fff',
    fontSize: 16,
  },
  icLista: {
    color: '#fff',
  },
  boxTextLista: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxBtn: {
    flexDirection: 'column',
    marginTop: 30,
  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#02CD98',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10,
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#5351F9',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10,
  },
  btn3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F64000',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 10,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  
});

export default estilo;
