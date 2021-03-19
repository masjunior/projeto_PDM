const baseUrl = "https://swapi.dev/api/"
const resourcesApi = [ "films","people", "planets","species", "starships", "vehicles"];

function sequencia() {
    let contador = 0;
    return () => {
        return contador++;
    };
}


const proximoId = sequencia(); 
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

    return tag;
}
function removerCarregando (){
    const elementos = Array.isArray(document.getElementsByClassName("jsCarregando"));

    console.log(elementos)
    for (let i = 0; i < elementos.length; i++) {
        array[i].remove();
    }
}





  (async function CarregarPagina(arrayExistente,paginaAtual , totalDe ) {
        const aplicacao = document.getElementById("App");

        const numberOfPage = paginaAtual || 1;
        
        if(arrayExistente === undefined){
            aplicacao.append(exibirCarregando('h3'));
            const url = MountUrl(baseUrl, resourcesApi, numberOfPage)
            const response = await fetch(url)
                .then((resultado) => {
                    // TODO: qual usar
                    removerCarregando();
                    apagarConteudoElemento(aplicacao);
                    return resultado.json();
                })
                .catch(error => {
                    removerCarregando();
                    return console.error("ERRO", error);
                });
            const {count, results} = response;
            
            totalDe = count;
            console.log("response", response)
            
            arrayExistente = results;
        }

        const container = document.createElement("div");
        container.setAttribute('id', 'container');
        container.classList.add("container", "mx-auto");

        const rowInit = document.createElement('div');
        rowInit.classList.add('row', 'mx-auto')

        const titulo = document.createElement('h1');
        titulo.classList.add('text-center','text-sucess');
        titulo.innerHTML = "Star Wars API JS"
        rowInit.append(titulo);
        container.append(rowInit);


        const table = document.createElement("table");
        table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered', 'border-dark');

        const thead = document.createElement('thead');
        thead.innerHTML = 
        `<tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Genero</th>
            <th scope="col">Olhos</th>
            <th scope="col">Pele</th>
            <th scope="col">Cabelo</th>
            <th scope="col">Altura (cm) </th>
            <th scope="col">#</th>
        </tr>`;

        table.append(thead);
        const tbody = document.createElement('tbody');

        const ulElement = document.createElement('div');
        ulElement.setAttribute('id', 'lista');
        ulElement.classList.add('list-group');

        console.log(arrayExistente)
        for (let index = 0; index < arrayExistente.length; index++) {
            arrayExistente[index] = {
                id: index + 1,
                ...arrayExistente[index],
            };
            const element = arrayExistente[index];
            

            const trElement = document.createElement('tr');
            
            const thEditar = document.createElement('th');
            thEditar.setAttribute('scope','row');
            const aEditar = document.createElement('a');
            aEditar.setAttribute('href', '#');
            aEditar.classList.add('text-warning');
            aEditar.addEventListener('click', function (event) {
                console.log('editar')
                event.preventDefault()
                alert('criar formEditar ' + element.id)
              })
            const iEditar = document.createElement('i');
            iEditar.classList.add('bi', 'bi-pencil');
            aEditar.append(iEditar);
            thEditar.append(aEditar);
            trElement.append(thEditar);

            const nome = document.createElement('td');
            nome.setAttribute('scope', 'col');
            nome.innerHTML = `${element.name}`;
            trElement.append(nome);

            const genero = document.createElement('td');
            genero.setAttribute('scope', 'col');
            genero.classList.add('pl-5','pr-5', 'text-center');
            genero.innerHTML = `${element.gender}`;
            trElement.append(genero);

            const olhos = document.createElement('td');
            olhos.setAttribute('scope', 'col');
            olhos.innerHTML = `${element.eye_color}`;
            trElement.append(olhos);

            const pele = document.createElement('td');
            pele.setAttribute('scope', 'col');
            pele.innerHTML = `${element.skin_color}`;
            trElement.append(pele);
            
            const cabelo = document.createElement('td');
            cabelo.setAttribute('scope', 'col');
            cabelo.innerHTML = `${element.hair_color}`;
            trElement.append(cabelo);
            
            const altura = document.createElement('td');
            altura.setAttribute('scope', 'col');
            altura.innerHTML =`${element.height}`;
            trElement.append(altura);

            const thDeletar = document.createElement('th');
            thDeletar.setAttribute('scope','row');

            const aDeletar = document.createElement('a');
            aDeletar.setAttribute('href', '#');
            aDeletar.classList.add('text-danger');
            aDeletar.addEventListener('click', function (event) {
                event.preventDefault()

                alert('criar formEditar ' + element.id)

                apagarConteudoElemento(aplicacao);
                CarregarPagina( arrayExistente.filter((item) => item !== element), paginaAtual, totalDe);


              })
            const iDeletar = document.createElement('i');
            iDeletar.classList.add('bi', 'bi-trash');
            aDeletar.append(iDeletar);
            thDeletar.append(aDeletar);
            trElement.append(thDeletar)

            tbody.append(trElement);
        };

        table.append(tbody);

        
        function criarPaginacao(totalDe, numberOfPage){
            const navElement = document.createElement('nav');
            navElement.setAttribute('aria-label','Paginas')
            const ulElement = document.createElement('ul');
            ulElement.classList.add('pagination');
            ulElement.innerHTML = "Páginas";        
            let paginaPossiveis = 0;
            totalDe%10 === 0 ? paginaPossiveis =  parseInt(totalDe /10) : paginaPossiveis = parseInt(totalDe /10) + 1;

            for (let index = 0; index < paginaPossiveis; index++) {
                const liElement = document.createElement('li');
                liElement.classList.add("page-item");
                const aElement = document.createElement('a');
                aElement.classList.add('page-link');
                if(numberOfPage === index + 1) aElement.classList.add("bg-dark") 
                aElement.innerHTML = index + 1;
        
                aElement.addEventListener('click', function (event) {
                    event.preventDefault()
                    if(numberOfPage !== index + 1) CarregarPagina(undefined, index + 1)
                })
        
                ulElement.append(aElement);
            }
        
            navElement.append(ulElement);
            return navElement;
        }

        
        const row = document.createElement('div');
        row.classList.add('row');
        

        container.append(row);
        container.append(table);

        // construir paginacao
        container.append(row);
        container.append(criarPaginacao(totalDe, numberOfPage) );
        
        container.append(row);
        container.append(row);
        
        

        aplicacao.append(container);
  })();