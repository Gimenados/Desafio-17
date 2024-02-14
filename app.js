document.addEventListener('DOMContentLoaded', function() {
    // Crea una variable con array que contiene objetos que representan los artículos del menú
    const menuItems = [
        { id: 1, name: 'Hamburguesa', price: 10.99 },
        { id: 2, name: 'Pizza', price: 12.99 },
        { id: 3, name: 'Ensalada', price: 6.99 },
        { id: 4, name: 'Empanadas', price: 40.99},
        { id: 5, name: 'Lasagna', price: 78.99},
        { id: 6, name: 'Milanesa', price: 90.99},
        { id: 6, name: 'Canelones', price: 65.59},
    ];

     // Capturar los eventos de selección del usuario y almacenar la información del pedido al presionar el boton submit
    const orderForm = document.getElementById( 'sectionForm');

    orderForm.addEventListener('submit', function (event) { 
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const selectedItems = Array.from(document.getElementById('items').selectedOptions)  //Array.from convierte la coleccion de elemntos en un array y vinculamos con el html 
        .map(option => parseInt(option.value)); // Map. para iterar sobre cada elemento del array 

    if (!name || !address || !phone || !email || selectedItems.length === 0) {
        alert('Por favor, complete todos los campos obligatorios y seleccione al menos un artículo del menú.');
        return;
    }

    //Obtener los detalles del pedido y calcular el costo total
    const selectedMenuItems = menuItems.filter(item => selectedItems.includes(item.id));
        const orderDetails = {
            name,
            address,
            phone,
            email,
            items: selectedMenuItems,
            comments: document.getElementById('comments').value
        };
    
    const totalCost = selectedMenuItems.reduce((total, item) => total + item.price, 0);


    //Utilizamos el método fetch, el código realiza una solicitud POST al servidor del restaurante con los detalles del pedido en formato JSON.
    fetch('/api/realizar-pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar el pedido:', error);
    });

    // const confirmationMessage = `PEDIDO CONFIRMADO:\n\n${JSON.stringify(orderDetails, null, 2)}\n\nCOSTO TOTAL: $${totalCost.toFixed(2)}`;
    const confirmationMessage = `PEDIDO CONFIRMADO:\n\nNombre: ${orderDetails.name}\nDirección: ${orderDetails.address}\nTeléfono: ${orderDetails.phone}\nCorreo electrónico: ${orderDetails.email}\n\nCOSTO TOTAL: $${totalCost.toFixed(2)}`;
    alert(confirmationMessage);

    })
})