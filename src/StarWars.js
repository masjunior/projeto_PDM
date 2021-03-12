const baseUrl = "https://swapi.dev/api/"
const resourcesApi = [ "films","people", "planets","species", "starships", "vehicles"];

function sequencia() {
    let contador = 0;
    return () => {
      return contador++;
    };
  }

function MountUrl (baseUrl, resourcesApi, numberOfPage, id){
    if(id){
        return `${baseUrl}${resourcesApi[1]}/?id=${numberOfPage}`
    }
    if (numberOfPage){
        return `${baseUrl}${resourcesApi[1]}/?page=${numberOfPage}`
    }
}

function apagarConteudoElemento (elemento){
    elemento.innerHTML = "";
}

function exibirCarregando (tipoTag){
    const tag = document.createElement(tipoTag);
    tag.classList.add("jsCarregando");
    tag.innerHTML = "Carregando...";

    console.log(tag)
    return tag;
}
function removerCarregando (){
    const elementos = Array.isArray(document.getElementsByClassName("jsCarregando"));

    console.log(elementos)
    for (let i = 0; i < elementos.length; i++) {
        console.log(array[i])
        array[i].remove();
    }
}
  (async function CarregarPagina() {
        const aplicacao = document.getElementById("App");
        aplicacao.append(exibirCarregando('h3'));

        let numberOfPage = 2;

        const url = MountUrl(baseUrl, resourcesApi, numberOfPage)
        const response = await fetch(url)
            .then((resultado) => {
                // TODO: qual usar
                removerCarregando();
                apagarConteudoElemento(aplicacao);
                return resultado.json();
            })
            .catch(error => console.error("ERRO", error));
        const {count, next, previous, results} = response;

        console.log("results", results)
        
        const container = document.createElement("div");
        const olElement = document.createElement('ol');
        olElement.setAttribute('id', 'lista');

        results.forEach(element => {
            const liElement = document.createElement('li');
            liElement.setAttribute('id', element.url);
            liElement.innerHTML = element.name;

            
            olElement.append(liElement);
        });
        container.append(olElement);
        
        aplicacao.append(container);
  })();