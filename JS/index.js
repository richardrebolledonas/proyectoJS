
// Cargar los pedidos desde un archivo JSON 
let pedidos = cargarPedidos();



function registrarPedido() {
    const nombreProducto = document.getElementById("nombreProducto").value.toLowerCase();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    let precioUnitario = 990;

    const productosPermitidos = ["gletcher regular", "gletcher light", "gletcher dark"];

    if (nombreProducto === '' || isNaN(cantidad) || cantidad <= 0) {
        Toastify({
            text: "Please, enter valid data for the order.",
            duration: 5000,
            gravity: "top",
            backgroundColor: "red",
        }).showToast();
        return;
    } else if (!productosPermitidos.includes(nombreProducto)) {
        Toastify({
            text: "Invalid product name. Only the following names are allowed: Gletcher Regular, Gletcher Light, Gletcher Dark (in upper or lower case).",
            duration: 6000,
            gravity: "top",
            backgroundColor: "red",
        }).showToast();
        return;
    }

    let mensaje = `You have registered an order for ${cantidad} units of ${nombreProducto}.`;

    if (cantidad > 10) {
        mensaje += " Large quantities! You have won a discount.";
        precioUnitario -= 100;
    }

    const totalPedido = precioUnitario * cantidad;
    mensaje += `The total price is $${totalPedido}.`;

    const pedido = {
        producto: nombreProducto,
        cantidad: cantidad,
        precioTotal: totalPedido
    };
    pedidos.push(pedido);

    Toastify({
        text: mensaje,
        duration: 7000,
        gravity: "top",
        backgroundColor: "green",
    }).showToast();

    actualizarTablaPedidos();
    calcularTotal();
}

function mostrarOrden() {
    let mensaje = "Purchase Order:\n\n";

    if (pedidos.length === 0) {
        mensaje += "No orders have been registered.";
    } else {
        for (const [index, pedido] of pedidos.entries()) {
            mensaje += `Order ${index + 1}:\n`;
            mensaje += `Product: ${pedido.producto}\n`;
            mensaje += `Amount: ${pedido.cantidad}\n`;
            mensaje += `Total Price: $${pedido.precioTotal}\n\n`;
        }
    }

    Toastify({
        text: mensaje,
        duration: 5000,
        gravity: "top",
        backgroundColor: "blue",
    }).showToast();
}




function eliminarPedido(index) {
    pedidos.splice(index, 1);
    actualizarTablaPedidos();
    calcularTotal();
    guardarPedidos();
}

function modificarCantidad(index, nuevaCantidad) {
    pedidos[index].cantidad = nuevaCantidad;
    pedidos[index].precioTotal = pedidos[index].cantidad * 990;
    actualizarTablaPedidos();
    calcularTotal();
    guardarPedidos();
}

function actualizarTablaPedidos() {
    const ordenTable = document.getElementById("orden");
    // Eliminar filas existentes
    while (ordenTable.rows.length > 1) {
        ordenTable.deleteRow(1);
    }

    // Agregar filas con los pedidos
    for (const [index, pedido] of pedidos.entries()) {
        const newRow = ordenTable.insertRow();
        newRow.insertCell(0).textContent = pedido.producto;
        newRow.insertCell(1).textContent = pedido.cantidad;
        newRow.insertCell(2).textContent = `$${pedido.precioTotal}`;
        const accionesCell = newRow.insertCell(3);
        accionesCell.innerHTML = `<button onclick="eliminarPedido(${index})">Delete</button>`;
        accionesCell.innerHTML += `<button onclick="modificarCantidad(${index}, prompt('Nueva cantidad:'))">Modify Quantity</button>`;
    }
}

function calcularTotal() {
    const total = pedidos.reduce((acc, pedido) => acc + pedido.precioTotal, 0);
    document.getElementById("total").textContent = total;
}

function cargarPedidos() {
    try {
        // cargar los pedidos desde el localStorage en formato JSON
        const pedidosJSON = localStorage.getItem('pedidos');
        if (pedidosJSON) {
            return JSON.parse(pedidosJSON);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al cargar los pedidos:", error);
        return [];
    }
}

function guardarPedidos() {
    try {
        // Guardar los pedidos en el localStorage en form. JSON
        const pedidosJSON = JSON.stringify(pedidos);
        localStorage.setItem('pedidos', pedidosJSON);
    } catch (error) {
        console.error("Error al guardar los pedidos:", error);
    }
}


// Actualizar la tabla de pedidos y el total al cargar la página
actualizarTablaPedidos();
calcularTotal();

