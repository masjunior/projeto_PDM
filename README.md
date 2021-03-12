# projeto_PDM
Projeto de aula de Programação para dispositivos móveis

1 - Ao abrir a página, consumir de modo assíncrono, a API do StarWars: https://swapi.dev/api/...
    Você pode consumir qualquer uma das APIs (pessoas ou veículos ou ...);
    1.1 - Enquanto não receber o resultado, exibir na página HTML a mensagem: 'Carregando...';
    1.2 - Se ocorrer erro, exibir uma mensagem informando que houve erro no carregamento;
    1.3 - Se der certo, exibir os dados num formato de lista/tabela/cards com o conteúdo (pelo menos 5 dados);
2 - O conteúdo exibido deverá ser paginado e, no fim da página, devem ser exibidos links para as outras
    páginas;
3 - Para cada elemento exibido (pessoa ou veículo ...), exibir um botão de edição;
4 - Ao clicar no botão de edição, exibir um formulário onde os dados podem ser alterados;
5 - Ao alterar, atualizar a lista.
6 - Para cada elemento exibido (pessoa ou veículo ...), exibir um botão de exclusão;
7 - Ao clicar no botão de exclusão, apagar o elemento da lista.

Pode ser adotada a estratégia de fonte de verdade como sendo o DOM e/ou o Javascript.
Lembre-se que para consumir a API, deve seguir um padrão assim:

https://swapi.dev/api/people/?page=1
https://swapi.dev/api/vehicles/?page=1
https://swapi.dev/api/species/?page=1
https://swapi.dev/api/films/?page=