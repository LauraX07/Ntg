// URL da API do ImgBB
const apiKey = "e8352eed09465a8ae69f73a2809a9b12"; // Substitua com sua chave da API ImgBB

// Referência para a galeria de imagens
const gallery = document.getElementById("gallery");

// Função para enviar as imagens para o ImgBB
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  // Enviar a imagem para o ImgBB
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (response.ok && data.data.url) {
    // Criar o elemento da imagem e adicionar à galeria
    const img = document.createElement("img");
    img.src = data.data.url; // URL da imagem carregada
    gallery.appendChild(img);
  } else {
    console.error("Erro ao enviar a imagem:", data.error);
  }
}

// Função para lidar com o envio de imagens
document.getElementById("uploadForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const files = document.getElementById("photoInput").files;
  
  for (let i = 0; i < files.length; i++) {
    uploadImage(files[i]);
  }
});
