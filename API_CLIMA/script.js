// import React from "react";
// import swal from "@sweetalert/with-react";

// const onPick = (value) => {
//   swal("Gracias por tu feedback!", `Tu feedback fue de ${value}/3`, "success");
// };

// const MoodButton = ({ rating, onClick }) => (
//   <button
//     data-rating={rating}
//     className="mood-btn"
//     onClick={() => onClick(rating)}
//   />
// );

// swal({
//   text: "COMO FUE TU EXPERIENCIA CON MI SITIO WEB ?",
//   buttons: {
//     cancel: "Close",
//   },
//   content: (
//     <div>
//       <MoodButton rating={1} onClick={onPick} />
//       <MoodButton rating={2} onClick={onPick} />
//       <MoodButton rating={3} onClick={onPick} />
//     </div>
//   ),
// });

swal("Bienvenido a la API del clima de JEHAN ");

const apiKey = "d3ae610ddd42e09a263ef25a71ff4b89";

document.getElementById("buscarBtn").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudad").value.trim();
  if (ciudad !== "") {
    obtenerClima(ciudad);
  } else {
    alert("Por favor ingresa una ciudad.");
  }
});

// Función para obtener el clima de una ciudad
async function obtenerClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Ciudad no encontrada");

    const datos = await respuesta.json();
    console.log(datos); // verificar lo que devuelve la respuesta  de la API

    mostrarClima(datos);
  } catch (error) {
    document.getElementById(
      "resultado"
    ).innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// Función para mostrar el clima en la interfaz
function mostrarClima(data) {
  const { name, main, weather, sys } = data;
  console.log(data); // verificar lo que devuelve la respuesta  de la API
  const icono = weather[0].icon;

  document.getElementById("resultado").innerHTML = `
  <br>
    
    <h2>${name}</h2>
    <p>PAÍS:  ${sys.country}</p>
    
    <p><strong>Temperatura:</strong> ${main.temp} °C</p>
    <p><strong>Humedad:</strong> ${main.humidity}%</p>
    <p><strong>Condición:</strong> ${weather[0].description}</p>
    <img class="img-fluid" src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icono del clima">
 
  `;
  ciudad.value = "";
}

// Modo oscuro
const btn = document.getElementById("btnToggle");

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    btnToggle.innerHTML = "🌞";
  } else {
    btnToggle.innerHTML = " 🌙";
  }
});
