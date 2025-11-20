import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- Contenedor de productos ---
  const contenedor = document.getElementById("contenedor-tarjetas");

  // Pedimos la info de productos en carrito para mostrar el numero si hay productos
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  // Cargar productos desde JSON
  fetch("./data/productos.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener los productos, número de estado: ${response.status}`);
      }
      return response.json();
    })
    .then(productos => {
      productos.forEach(producto => {
        // Crear tarjeta de producto
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        // Armar estructura
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => console.error("Error al cargar los productos:", error));

  // --- Audio de fondo ---
  const audio = document.createElement("audio");
  audio.src = "./audios/musica_de_fondo.mp3";
  audio.loop = true;
  audio.autoplay = true;
  audio.volume = 0.5;

  // Agregar audio al header
  const header = document.querySelector("header");
  header.appendChild(audio);

  // Intentamos reproducirlo (para navegadores que bloquean autoplay)
  audio.play().catch(error => {
    console.warn("El navegador bloqueó el autoplay del audio:", error);
  });

  // --- Botón de silenciar/reproducir ---
  const btnAudio = document.createElement("button");
  btnAudio.id = "btn-audio";
  btnAudio.textContent = "🔊 Silenciar";
  btnAudio.classList.add("btn");
  btnAudio.style.marginLeft = "1rem";

  btnAudio.addEventListener("click", () => {
    if (audio.muted) {
      audio.muted = false;
      btnAudio.textContent = "🔊 Silenciar";
    } else {
      audio.muted = true;
      btnAudio.textContent = "🔈 Reproducir";
    }
  });

  header.appendChild(btnAudio);
});
