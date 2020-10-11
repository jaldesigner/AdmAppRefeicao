import React from 'react';

export const MoedaReal = (valor) => {
  var valor = valor.toFixed(2).split('.');
  valor[0] = "R$ " + valor[0].split(/(?=(?:...)*$)/).join('.');
  return valor.join(',');
};

export const maskCPF = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskCEP = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{3})/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const maskTel = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");
};

export const maskDinheiro = val => {
  var v = val.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  val = v;
  return v;
};
