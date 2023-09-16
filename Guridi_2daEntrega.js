function calcularCuotas() {
    // Obtener el valor del producto
    let productos = [
        { nombre: "Televisor", precio: $('#valorProducto1').val() },
        { nombre: "Celular", precio: $('#valorProducto2').val() },
        { nombre: "Aire acondicionado", precio: $('#valorProducto3').val() }
    ];
    

    // Agregar productos
    productos.push({ nombre: "Laptop", precio: 1200 });

    // Definir el monto y la cantidad de cuotas
    let cuotas = 12;

    // Sumar los precios de los productos
    let totalProductos = productos.reduce((total, producto) => total + producto.precio, 0);

    // Calcula el valor de cada cuota
    let valorCuota = totalProductos / cuotas;

    // Muestra al usuario el monto de sus cuotas
    alert(`El monto de sus cuotas es: ${valorCuota}`);

    // Imprimir el valor de cada cuota
    console.log(`El valor de cada cuota es: ${valorCuota}`);

    // Utiliza un ciclo para imprimir el valor de cada cuota
    for (let i = 1; i <= cuotas; i++) {
        console.log(`Cuota ${i}: ${valorCuota}`);
    }

    console.log("------------------------")

    // Utilizar un ciclo para calcular el valor de cada cuota con interés
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let interes = i > 6 ? 0.1 : 0;
        let valorCuotaConInteres = (producto.precio / cuotas) * (1 + interes);
       
        // Muestra las cuotas al usuario
        alert(`Las cuotas para ${producto.nombre} son: ${valorCuotaConInteres.toFixed(2)}`);
      }
}
