// Creo los productos que voy a tener en mi pagina
const products = [
    { id: 1, name: "Rubia", price: 800 },
    { id: 2, name: "Roja", price: 900 },
    { id: 3, name: "Negra", price: 700 },
    { id: 4, name: "Belga", price: 1200 },
    { id: 5, name: "Lager", price: 850 },
    { id: 6, name: "India Pale Ale", price: 950 },
    { id: 7, name: "Honey", price: 950 },
    { id: 8, name: "Lambic", price: 750 },
];

// Creo un array vacio, para mi carrito de compras
const cart = [];

// La funcion loginToMyPage va a validar si el usuario es mayor de edad
function loginToMyPage() {

    let access = false;

    while (!access) {

        let yearOfBirth = parseInt(prompt("Ingrese el año en el que nació para continuar: "));

        if (yearOfBirth === null) {
            alert("Acceso cancelado. Hasta Luego!");
            return false;
        }

        if (isNaN(yearOfBirth)) {
            alert("Por favor, ingrese un año de nacimiento válido.");
        } else if (2023 - yearOfBirth < 18 || 2023 - yearOfBirth > 100) {
            alert("Edad no valida, no puede continuar.");
        } else {
            alert("¡Bienvenido a Jubilus!");
            access = true;
        }
    }
    return access;
}

// La fuuncion showProducts va a mostrar todos los productos por consola
function showProducts() {
    alert("Por Comodidad la lista de productos se va a visualizar en la consola")
    console.log("Lista de productos:");
    for (const product of products) {
        console.log(`${product.id} - ${product.name} - $${product.price}`);
    }
}

// La funcion filterProductsByPrice va a recibir por parametro un precio y va a devolver un array con los productos menores a ese precio 
function filterProductsByPrice(maxPrice) {
    return products.filter(product => product.price <= maxPrice);
}

// La funcion searchProduct recibe el nombre del producto que deseo buscar, si lo encuentra lo muestra con un alert, sino muestra un mensaje
function searchProduct(name) {
    let product = products.find((item) => item.name === name);

    if (product) {
        alert(`
             Id: ${product.id}
             Nombre: ${product.name}
             Precio: ${product.price}
            `);
    } else {
        alert("El producto no se encuentra disponible");
    }
}

// La funcion sortBy va a recibir por parametro la condicion con la cual va a ordenar y va a retornar el array ordenado de forma creciente
function sortBy(condition) {
    return products.sort((a, b) => {
        if (b[condition] > a[condition]) {
            return -1;
        }
        // a es igual a b
        return 0;
    })
}

// La funcion addToCart recibe por parametro el ID del producto que quiero agregar, lo busca y si lo encuentra los agrega al carrito, sino muestra un mensaje
function addToCart(productId) {
    const productFound = products.find(product => product.id === productId);
    if (productFound) {
        cart.push(productFound);
        alert(`Cerveza ${productFound.name} agregado al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

// La funcion showCart muestra todos los productos dentro del carrito
function showCart() {
    if (cart == "") {
        alert("El carrito esta vacio");
    } else {
        console.log("Carrito de compras:");
        for (const product of cart) {
            console.log(`${product.name} - $${product.price}`);
        }
    }
}

// La funcion calculeTotal calcula el total del carrito
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

// La funcion showOption muestra las acciones que se pueden realizar
function showOption() {
    alert(`Opciones:
            1. Mostrar productos
            2. Ordenar de forma creciente
            3. Filtrar productos por precio
            4. Buscar producto por nombre
            5. Agregar producto al carrito
            6. Mostrar carrito
            7. Calcular total
            8. Salir`);
}

// Funcion para ejecutar una opcion, recibo por parametro que opcion se realiza y se ejecuta por un switch
function executeOpcion(option) {

    switch (option) {

        case 1:
            showProducts();
            break;

        case 2:
            const condition = prompt("Ingrese como desea ordenar la lista: (id - name - price)")
            const organizedProducts = sortBy(condition);

            console.log("Productos Ordenados:");
            for (const product of organizedProducts) {
                console.log(`${product.id} - ${product.name} - $${product.price}`);
            }
            break;

        case 3:
            const maxPrice = parseFloat(prompt("Ingrese el precio máximo: "));
            const filterProducts = filterProductsByPrice(maxPrice);

            console.log("Productos filtrados:");
            for (const product of filterProducts) {
                console.log(`${product.id} - ${product.name} - $${product.price}`);
            }
            break;

        case 4:
            let name = prompt("Ingrese el nombre del producto que desea buscar");
            searchProduct(name);
            break;

        case 5:
            const productId = parseInt(prompt("Ingrese el ID del producto: "));
            addToCart(productId);
            break;

        case 6:   
            showCart();
            break;

        case 7:
            const total = calculateTotal();
            alert(`Total: $${total}`);
            break;

        case 8:
            alert("¡Hasta luego!");
            break;

        default:
            alert("Opción no válida.");
            break;
    }
}

// Ecommerce va a ser mi funcion principal, al principio controlo si es mayor de edad, si no lo es salgo de la pagina
function ECommerce() {

    let access = loginToMyPage();

    if (!access) {
        return;
    }

    // Aca voy a elegir la opcion para pasarla como parametro 
    let option = 0;
    while (option !== 8) {
        showOption();

        option = parseInt(prompt(`Seleccione una opción:`));
        executeOpcion(option);
    }
}

// Iniciar el e-commerce
ECommerce();