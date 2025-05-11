// Elementos del DOM
const input = document.querySelector("#input");
const btn = document.querySelector(".inp-add");
const itemList = document.querySelector(".ul-inpt");

// Obtener tareas del localStorage al cargar
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
renderTareas(); // Mostrar las tareas existentes

// Añadir nueva tarea
btn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (!taskText) return;

  const nuevaTarea = {
    id: Date.now(), // ID único con timestamp
    texto: taskText,
  };

  tareas.push(nuevaTarea);
  guardarTareas();
  renderTareas();

  input.value = "";
});

// Renderizar las tareas en pantalla
function renderTareas() {
  itemList.innerHTML = ""; // Limpiar lista actual

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.setAttribute("data-id", tarea.id);

    li.innerHTML = `
      <span>${tarea.texto}</span>
      <i class="fas fa-check"></i>
      <div>
        <button class="btn btn-sm btn-warning edit-btn"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // Botón eliminar
    li.querySelector(".delete-btn").addEventListener("click", () => {
      eliminarTarea(tarea.id);
    });

    // Botón editar
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const nuevoTexto = prompt("Edita la tarea:", tarea.texto);
      if (nuevoTexto) {
        editarTarea(tarea.id, nuevoTexto);
      }
    });

    itemList.appendChild(li);
  });
}

// Guardar tareas en localStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Eliminar tarea por ID
function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
  guardarTareas();
  renderTareas();
}

// Editar tarea por ID
function editarTarea(id, nuevoTexto) {
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) {
    tarea.texto = nuevoTexto;
    guardarTareas();
    renderTareas();
  }
}
