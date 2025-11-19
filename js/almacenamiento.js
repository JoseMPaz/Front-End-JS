const CLAVE = "carrito";

export const guardarCarrito = (carrito) => 
{
  localStorage.setItem(CLAVE, JSON.stringify(carrito));//Se convierte de JS a JSON para almacenar
};

export const obtenerCarrito = () => 
{
  return JSON.parse(localStorage.getItem(CLAVE)) || [];//Se convierte de JSON a JS para poder trabajar los datos o Vacio
};

export const vaciarCarritoStorage = () => 
{
  localStorage.removeItem(CLAVE);
};
