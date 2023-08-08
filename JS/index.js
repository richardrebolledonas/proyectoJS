



alert("Eres mayor de 18 años?");

function registrarPedido() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (nombreProducto === '' || isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingresa datos válidos para el pedido.');}
    else {
        let mensaje = `Has registrado un pedido de ${cantidad} unidades de ${nombreProducto}.`;

    if (cantidad > 10) {
            mensaje += "¡Grandes cantidades! Podrías considerar un descuento.";
        }

        alert(mensaje);
    }
}
