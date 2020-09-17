import  moment from 'moment';
//import 'moment/locale/pt-br';

//const data = new Date()
//console.log(data);

const data = new Date(moment().subtract(3,'h'));
const mes = data.getMonth() + 1;
const dataFull = data.getDate() + '-' + mes + '-' + data.getFullYear();

export const InfData = dataFull;

const INF = () => {
  const DadosApp = {
    Categoria : 'Restaurante',
    ID_APP: 'SUQ6IDEKRW1wcmVzYTogSkQgUmVmZWnDp8O1ZXMKUmVwcmVzZW50YW50ZTogSm9uYXMgQWx2ZXMgTHVjYXM=',
    Nome_App: 'JD Refeições',
  };
  return DadosApp;
};

export default INF;

