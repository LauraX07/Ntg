// Configuração do ImgBB API (substitua com sua chave da API do ImgBB)
const imgbbApiKey = 'e8352eed09465a8ae69f73a2809a9b12'; 

// Função para upload de fotos para o ImgBB
async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://api.imgbb.com/1/upload?key=' + imgbbApiKey, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    // Retorna a URL da imagem enviada
    return result.data.url;
  } else {
    console.error('Erro ao enviar a imagem:', result.error);
  }
}

// Função para lidar com o envio de fotos no formulário
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const files = document.getElementById('photoInput').files;
  for (let i = 0; i < files.length; i++) {
    const imageUrl = await uploadImageToImgBB(files[i]);
    
    // Exibe a imagem na galeria
    if (imageUrl) {
      // Salva a URL da imagem no localStorage
      let gallery = JSON.parse(localStorage.getItem('gallery')) || [];
      gallery.push(imageUrl);
      localStorage.setItem('gallery', JSON.stringify(gallery));

      // Atualiza a galeria na página
      updateGallery();
    }
  }
});

// Função para exibir as imagens salvas no localStorage
function updateGallery() {
  const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';  // Limpa a galeria antes de adicionar as imagens

  gallery.forEach(imageUrl => {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem compartilhada';
    galleryContainer.appendChild(imgElement);
  });
}

// Chama a função para exibir as imagens salvas quando a página carregar
window.onload = updateGallery;
