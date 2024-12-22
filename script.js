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
      const gallery = document.getElementById('gallery');
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Foto enviada';
      gallery.appendChild(img);
    }
  }
});
