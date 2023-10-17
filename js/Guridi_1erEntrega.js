function calcularCuotas() {
    // Obtiener el valor del producto
    let valorProducto = document.getElementById("valorProducto").value;

    // Convertir el valor del producto a un número
    valorProducto = parseFloat(valorProducto);

    // Definir el monto y la cantidad de cuotas
    let cuotas = 12;

    // Calcula el valor de cada cuota
    let valorCuota = valorProducto / cuotas;

    // Muestra al usuario el monto de sus cuotas
    alert(`El monto de sus cuotas es: ${valorCuota}`);

    // Imprimir el valor de cada cuota
    console.log(`El valor de cada cuota es: ${valorCuota}`);

    // Utiliza un ciclo para imprimir el valor de cada cuota
    for (let i = 1; i <= cuotas; i++) {
        console.log(`Cuota ${i}: ${valorCuota}`);
    }

    console.log("------------------------")

    let cuotasConInteres = "";

    // Utilizar un ciclo para calcular el valor de cada cuota con interés
    for (let i = 1; i <= cuotas; i++) {
        let interes = 0;
        if (i > 6) {
            interes = 0.1;
        }
        let valorCuotaConInteres = valorCuota + (valorCuota * interes);
        cuotasConInteres += `Cuota ${i}: ${valorCuotaConInteres}\n`;
    }

    // Muestra al usuario las cuotas con interés en un alert
    alert("Cuotas con interes");
    alert(cuotasConInteres);
} 