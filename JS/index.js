//  Array para almacenar los pedidos
const pedidos = [];

function iniciarRegistro() {
    const esMayor = confirm("Eres mayor de 18 años?");
    
    if (esMayor) {
        registrarPedido();
    } else {
        alert("Debes ser mayor de 18 años para registrar un pedido.");
    }
}

function registrarPedido() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    let precioUnitario = 990; // Precio unitario del producto

    const productosPermitidos = ["Gletcher", "Gletcher Light", "Gletcher Dark"]; // Nombres de productos permitidos

    if (nombreProducto === '' || isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingresa datos válidos para el pedido.');
    } else if (!productosPermitidos.includes(nombreProducto)) {
        alert('Nombre de producto no válido. Solo se permiten los siguientes nombres: Gletcher, Gletcher Light, Gletcher Dark');
    } else {
        let mensaje = `Has registrado un pedido de ${cantidad} unidades de ${nombreProducto}.`;

        if (cantidad > 10) {
            mensaje += " ¡Grandes cantidades! Haz ganado un descuento.";
            precioUnitario -= 100; // Aplicar descuento si la cantidad es mayor a 10
        }

        const total = precioUnitario * cantidad;
        mensaje += ` El precio total es $${total}.`;

        // detalles del pedido al array
        const pedido = {
            producto: nombreProducto,
            cantidad: cantidad,
            precioTotal: total
        };
        pedidos.push(pedido);

        alert(mensaje);
    }
}

iniciarRegistro();
