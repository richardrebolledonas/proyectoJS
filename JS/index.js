



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

    if (nombreProducto === '' || isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingresa datos válidos para el pedido.');
    } else {
        let mensaje = `Has registrado un pedido de ${cantidad} unidades de ${nombreProducto}.`;

        if (cantidad > 10) {
            mensaje += " ¡Grandes cantidades! Haz ganado un descuento.";
            precioUnitario -= 100; // Aplicar descuento si la cantidad es mayor a 10
        }

        const total = precioUnitario * cantidad;
        mensaje += ` El precio total es $${total}.`;

        alert(mensaje);
    }
}

iniciarRegistro();