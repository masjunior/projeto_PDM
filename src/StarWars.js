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
            arrayExistente = results;
        }

        const container = document.createElement("div");
        container.setAttribute('id', 'container');
        container.classList.add("container", "mx-auto");

        const rowInit = document.createElement('div');
        rowInit.classList.add('row', 'mx-auto')

        const titulo = document.createElement('h1');
        titulo.classList.add('text-center','text-success');
        titulo.innerHTML = "Star Wars API JS"
        rowInit.append(titulo);
        container.append(rowInit);


        const table = document.createElement("table");
        table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered', 'border-dark');

        const thead = document.createElement('thead');
        thead.innerHTML = 
        `<tr>
            <th scope="col">Editar</th>
            <th scope="col">Nome</th>
            <th scope="col">Genero</th>
            <th scope="col">Olhos</th>
            <th scope="col">Pele</th>
            <th scope="col">Cabelo</th>
            <th scope="col">Altura (cm) </th>
            <th scope="col">Excluir</th>
        </tr>`;

        table.append(thead);
        const tbody = document.createElement('tbody');

        const ulElement = document.createElement('div');
        ulElement.setAttribute('id', 'lista');
        ulElement.classList.add('list-group');

        for (let index = 0; index < arrayExistente.length; index++) {
            arrayExistente[index] = {
                id: index + 1,
                ...arrayExistente[index],
            };
            const element = arrayExistente[index];
            

            const trElement = document.createElement('tr');
            
            const thEditar = document.createElement('th');
            thEditar.setAttribute('scope','row');
            thEditar.classList.add('pl-5','pr-5', 'text-center');
            const aEditar = document.createElement('a');
            aEditar.setAttribute('href', '#');
            aEditar.classList.add('text-warning');
            aEditar.addEventListener('click', function (event) {
                event.preventDefault()
                editarPersonagem(arrayExistente, paginaAtual, totalDe, element.id)
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
            olhos.classList.add('pl-5','pr-5', 'text-center');
            olhos.innerHTML = `${element.eye_color}`;
            trElement.append(olhos);

            const pele = document.createElement('td');
            pele.setAttribute('scope', 'col');
            pele.classList.add('pl-5','pr-5', 'text-center');
            pele.innerHTML = `${element.skin_color}`;
            trElement.append(pele);
            
            const cabelo = document.createElement('td');
            cabelo.setAttribute('scope', 'col');
            cabelo.classList.add('pl-5','pr-5', 'text-center');
            cabelo.innerHTML = `${element.hair_color}`;
            trElement.append(cabelo);
            
            const altura = document.createElement('td');
            altura.setAttribute('scope', 'col');
            altura.classList.add('pl-5','pr-5', 'text-center');
            altura.innerHTML =`${element.height}`;
            trElement.append(altura);

            const thDeletar = document.createElement('th');
            thDeletar.setAttribute('scope','row');
            thDeletar.classList.add('pl-5','pr-5', 'text-center');


            const aDeletar = document.createElement('a');
            aDeletar.setAttribute('href', '#');
            aDeletar.classList.add('text-danger');
            aDeletar.addEventListener('click', function (event) {
                event.preventDefault()
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

        function editarPersonagem(arrayExistente, paginaAtual, totalDe, id){
            apagarConteudoElemento(aplicacao);

            const element = arrayExistente.filter(personagem => personagem.id === id)[0];
            
            const container = document.createElement("div");
            container.setAttribute('id', 'container');
            container.classList.add("container", "mx-auto");
            
            const rowInit = document.createElement('div');
            rowInit.classList.add('row', 'mx-auto')
    
            const titulo = document.createElement('h1');
            titulo.classList.add('text-center','text-success');
            titulo.innerHTML = `Editando ${element.name}`
            rowInit.append(titulo);
            container.append(rowInit); 

            const form = document.createElement('form');



            const nomeLinha = document.createElement('div');
            nomeLinha.classList.add("input-group", "mb-3");
            
            const nomeLabel = document.createElement('span');
            nomeLabel.setAttribute('id', 'nomeLabel');
            nomeLabel.classList.add('input-group-text');
            nomeLabel.innerHTML = "Nome";
            nomeLinha.append(nomeLabel);

            const nomeInput = document.createElement('input');
            nomeInput.setAttribute('id', 'nome');
            nomeInput.setAttribute('type', 'text');
            nomeInput.classList.add('form-control');
            nomeInput.setAttribute('aria-describedby', 'nomeLabel');
            nomeInput.setAttribute('value', `${element.name}`);
            nomeLinha.append(nomeInput);
            form.append(nomeLinha);


            const generoLinha = document.createElement('div');
            generoLinha.classList.add("input-group", "mb-3");

            const generoLabel = document.createElement('span');
            generoLabel.setAttribute('id', 'generolabel');
            generoLabel.classList.add('input-group-text');
            generoLabel.innerHTML = "Genero";
            generoLinha.append(generoLabel);

            const generoInput = document.createElement('input');
            generoInput.setAttribute('id', 'genero');
            generoInput.setAttribute('type', 'text');
            generoInput.classList.add('form-control');
            generoInput.setAttribute('aria-describedby', 'generoLabel');
            generoInput.setAttribute('value', `${element.gender}`);
            generoLinha.append(generoInput);
            form.append(generoLinha);


            
            const olhosLinha = document.createElement('div');
            olhosLinha.classList.add("input-group", "mb-3");

            const olhosLabel = document.createElement('span');
            olhosLabel.setAttribute('id', 'olhosLabel');
            olhosLabel.classList.add('input-group-text');
            olhosLabel.innerHTML = "Olhos";
            olhosLinha.append(olhosLabel);

            const olhosInput = document.createElement('input');
            olhosInput.setAttribute('id', 'olhos');
            olhosInput.setAttribute('type', 'text');
            olhosInput.classList.add('form-control');
            olhosInput.setAttribute('aria-describedby', 'olhosLabel');
            olhosInput.setAttribute('value',`${element.eye_color}`);
            olhosLinha.append(olhosInput);
            form.append(olhosLinha);


            const peleLinha = document.createElement('div');
            peleLinha.classList.add("input-group", "mb-3");

            const peleLabel = document.createElement('span');
            peleLabel.setAttribute('id', 'peleLabel');
            peleLabel.classList.add('input-group-text');
            peleLabel.innerHTML = "Pele";
            peleLinha.append(peleLabel);

            const peleInput = document.createElement('input');
            peleInput.setAttribute('id', 'pele');
            peleInput.setAttribute('type', 'text');
            peleInput.classList.add('form-control');
            generoInput.setAttribute('aria-describedby', 'peleLabel');
            peleInput.setAttribute('value',`${element.skin_color}`);
            peleLinha.append(peleInput);
            form.append(peleLinha);


            const cabeloLinha = document.createElement('div');
            cabeloLinha.classList.add("input-group", "mb-3");

            const cabeloLabel = document.createElement('span');
            cabeloLabel.setAttribute('id', 'cabeloLabel');
            cabeloLabel.classList.add('input-group-text');
            cabeloLabel.innerHTML = "Cabelo";
            cabeloLinha.append(cabeloLabel);

            const cabeloInput = document.createElement('input');
            cabeloInput.setAttribute('id', 'cabelo');
            cabeloInput.setAttribute('type', 'text');
            cabeloInput.classList.add('form-control');
            cabeloInput.setAttribute('aria-describedby', 'cabeloLabel');
            cabeloInput.setAttribute('value',`${element.hair_color}`);
            cabeloLinha.append(cabeloInput);
            form.append(cabeloLinha);
            
            const alturaLinha = document.createElement('div');
            alturaLinha.classList.add("input-group", "mb-3");

            const alturaLabel = document.createElement('span');
            alturaLabel.setAttribute('id', 'alturaLabel');
            alturaLabel.classList.add('input-group-text');
            alturaLabel.innerHTML = "Altura";
            alturaLinha.append(alturaLabel);

            const alturaInput = document.createElement('input');
            alturaInput.setAttribute('id', 'altura');
            alturaInput.setAttribute('type', 'text');
            alturaInput.classList.add('form-control');
            alturaInput.setAttribute('aria-describedby', 'alturaLabel');
            alturaInput.setAttribute('value',`${element.height}`);
            alturaLinha.append(alturaInput);
            form.append(alturaLinha);         
        
            const linha = document.createElement('div');
            linha.classList.add('row', "mt-2");
            const botoesLinha = document.createElement('div');
            botoesLinha.classList.add('d-grid', 'gap-2', 'd-md-flex',  'justify-content-md-end');

            const voltar = document.createElement('button');
            voltar.setAttribute('type', 'submit');
            voltar.classList.add('btn', 'btn-primary', "justify-content-md-end");
            voltar.innerText = 'Voltar';
            voltar.addEventListener('click', function (event) {
                event.preventDefault()
                apagarConteudoElemento(aplicacao);
                CarregarPagina(arrayExistente,paginaAtual, totalDe);
            })
            botoesLinha.append(voltar);

            const enviar = document.createElement('button');
            enviar.setAttribute('type', 'submit');
            enviar.classList.add('btn', 'btn-primary', "justify-content-md-end");
            enviar.innerText = 'Enviar';
            enviar.addEventListener('click', function (event) {
                event.preventDefault()
                for (let index = 0; index < arrayExistente.length; index++) {
                    if(arrayExistente[index] === element){
                        arrayExistente[index] = {
                            ...arrayExistente[index],
                            name:document.getElementById('nome').value,
                            gender: document.getElementById('genero').value,
                            eye_color: document.getElementById('olhos').value,
                            skin_color: document.getElementById('pele').value,
                            hair_color: document.getElementById('cabelo').value,
                            height:  document.getElementById('altura').value,
                        
                        }
                    };
                }
                apagarConteudoElemento(aplicacao);
                CarregarPagina(arrayExistente,paginaAtual, totalDe);
            })
            botoesLinha.append(enviar);
            linha.append(botoesLinha)
            
            form.append(linha);
            container.append(form);
            aplicacao.append(container);

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