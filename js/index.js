import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- AUDIO DE FONDO CON PANEL DE CONTROL ---
  const audio = document.createElement("audio");
  audio.src = "audios/musica_fondo.mp3";
  audio.loop = true;
  audio.autoplay = true;
  audio.volume = 0.8;
  audio.muted = false; // autoplay permitido por navegadores
  document.body.appendChild(audio);

  // Panel de control
  const panelAudio = document.createElement("div");
  panelAudio.id = "panel-audio";
  panelAudio.style.display = "flex";
  panelAudio.style.alignItems = "center";
  panelAudio.style.gap = "1rem";
  panelAudio.style.marginTop = "1rem";

  // Botón reproducir/pausar
  const btnPlayPause = document.createElement("button");
  btnPlayPause.textContent = "▶️";
  btnPlayPause.classList.add("btn");
  btnPlayPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btnPlayPause.textContent = "⏸️";
    } else {
      audio.pause();
      btnPlayPause.textContent = "▶️";
    }
  });

  // Slider de volumen
  const sliderVolumen = document.createElement("input");
  sliderVolumen.type = "range";
  sliderVolumen.min = 0;
  sliderVolumen.max = 1;
  sliderVolumen.step = 0.01;
  sliderVolumen.value = audio.volume;
  sliderVolumen.addEventListener("input", () => {
    audio.volume = sliderVolumen.value;
  });

  // Añadimos panel al header
  const header = document.querySelector("header");
  header.appendChild(panelAudio);
  panelAudio.appendChild(btnPlayPause);
  panelAudio.appendChild(sliderVolumen);

  audio.play().catch(error => {
    console.warn("El navegador bloqueó el autoplay del audio:", error);
  });

  // --- MOSTRAR PRODUCTOS ---
  const contenedor = document.getElementById("contenedor-tarjetas");

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener los productos, número de estado: ${response.status}`);
      }
      return response.json();
    })
    .then(productos => {
      productos.forEach(producto => {
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

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);
        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => console.error("Error al cargar los productos:", error));
});
