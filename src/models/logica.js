// => Vamos criar a função com a a nossa ação e o estado inicial da nossa ação <=
//A gente pensa...
//Vou ciar um contador!
//E o que um contador faz?
//ele conta karai!
//então temos que criar uma função para ele contar!
//Esta função tem que conter o estado inicial do nosso contador
//E uma ação pra quando quisermos fazer algo no contador possamos fazer, TAOKEY
function contador(state = 0, action) {

    //Vamos dizer o que a action deve fazer caso o tipo dela for passado
    //Então dizemos...
    //Caso o tipo dessa ação for INCREMENTO
    //Então...Incremente meu filhooooww!!!
    if (action.type == 'INCREMENTO') {
        return state + 1;
    }
    if (action.type == 'DECREMENTO') {
        return state - 1;
    }

    //aqui, só retorna o estado atual
    return state;
}

// => Vamos criar o store de nossa aplicação <=
//A gente vai e pensa...
//Vou criar uma loja pra guardar o estado do meu contador
//Como a gente é foda...
//A gente vai lá e cria essa porra!
let store = Redux.createStore(contador);

// => Vamos exibir nossa função com o estado atual <=
//a gente pega a variável onde guardamos nosso store
//e recuperamos o estado atual dela com getSate
//ou melhor, a gente diz...
//Vou lá na loja do redux buscar e te mostrar o estado que o contador tem guardado
//Quando chega na loja pesso que gere o estado do contatdor e exiba
document.write(store.getState() + '<br/>');

// => Agora, vamos disparar ou dispensar ou dispachar um ação <=
//Aí a gente pensa...
//Vamos fazer nosso contador funcionar
//Vamos virar espirita e fazer um dispacho virtual
//Pra fazer isso, nem vamos precisar usar espiritualidade (Essa é a parte legal)!
//de forma bem simples agente vai lá na loja (store)
//acessa o nosso contador
//vê o estado atual dele
//e dipara a ação que quer que ele faça, simplismente dizendo a ele
//o tipo (type) que é esta ação
store.dispatch({ type: 'INCREMENTO' });

//Aqui a gente exibe o resultado da ação
//Fácil de maiiiixxxxx!!!!
document.write(store.getState() + '<br/>');

store.dispatch({ type: 'INCREMENTO' });

//Aqui a gente exibe o resultado da ação
//Fácil de maiiiixxxxx!!!!
document.write(store.getState() + '<br/>');

store.dispatch({ type: 'DECREMENTO' });

//Aqui a gente exibe o resultado da ação
//Fácil de maiiiixxxxx!!!!
document.write(store.getState() + '<br/>');
