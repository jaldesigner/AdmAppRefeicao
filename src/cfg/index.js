/* eslint-disable prettier/prettier */
const data = new Date();
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
