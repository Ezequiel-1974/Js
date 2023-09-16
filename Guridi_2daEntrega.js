function calcularCuotas() {
    // Obtiener el valor del producto
    let productos = [
        { nombre: "Televisor", precio: 1000 },
        { nombre: "Celular", precio: 500 },
        { nombre: "Aire acondicionado", precio: 1500 }
    ];

    // Agregar prductos
    productos.push({ nombre: "Laptop", precio: 1200 });

    // Definir el monto y la cantidad de cuotas
    let cuotas = 12;

    // Calcula el valor de cada cuota
    let valorCuota = productos / cuotas;

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
    for (let i = 0; i < productos.length; i++) {
        let valorProducto = productos[i].precio;
        let cuotas = 12;
        let interes = i > 6 ? 0.1 : 0;
        let valorCuotaConInteres = (productos / cuotas) * (1 + interes);
       
        // Muestra las cuotas al usuario
        alert(`Las cuotas para ${productos[i].nombre} son: ${valorCuotaConInteres.toFixed(2)}`);
      }
} 