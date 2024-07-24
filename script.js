import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
    const urlVideos = import.meta.env.VITE_URL_VIDEOS;
    
    try {
        const buscar = await axios.get(urlVideos);
        const videos = buscar.data;
        
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error('Vídeo não tem categoria!')
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>  
            `;
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>  Houve um erro ao carregar os videos: ${error}</p>`;
    }
}

buscarEMostrarVideos();

const inputPesquisar = document.querySelector(".pesquisar__input");

inputPesquisar.addEventListener('input', () => {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = inputPesquisar.value.toLowerCase();
      
    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
    
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
});

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let categoria = botao.getAttribute("name");
    botao.addEventListener('click', () => filtroCategoria(categoria));
})

function filtroCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    videos.forEach((video) => {
        const videoCategoria = video.querySelector('.categoria').textContent.toLowerCase();
        const valorFiltro = filtro.toLowerCase();
        
        video.style.display = filtro ? videoCategoria.includes(valorFiltro) ||  valorFiltro == 'tudo'? 'block' : 'none' : 'block';
    });
}