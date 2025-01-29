interface Product {
    id: number
    name: string
    price: number
}

interface Order {
    orderId: string
    products: Product[]
    totalPrice: number
    discount?: number // desconto percentual, ex.: 10 para 10%
}

class OrderManager {
    calculateTotal(order: Order): number {
        let total = 0
        order.products.forEach((product) => {
            total += product.price
        })

        if (order.discount !== undefined) { // O codigo antes nao verificava se o valor era indefinido antes de calcular
            if (order.discount < 0 || order.discount > 100) { // Codigo nao verificava se o disconto esta entre 0% ou 100%
                throw new Error("Desconto inválido. Deve estar entre 0% e 100%.")
            }
            total -= total * (order.discount / 100)
        }
        
        if (isNaN(total)) { // aqui verifico se é realmente um número 
            throw new Error("Erro ao calcular o total: valor inválido detectado.")
        }
        
        return total
    }
}

// os cenários de teste para simular os problemas relatados
const manager = new OrderManager()

// Cenário 1: Desconto negativo
try {
    const order1: Order = {
        orderId: "001",
        products: [{ id: 1, name: "Celular", price: 1000 }],
        totalPrice: 0,
        discount: -10,
    }
    console.log("Total Order 1:", manager.calculateTotal(order1))
} catch (error) {
    if(error instanceof Error) {
        console.error("Erro no pedido 1:", error.message)
    }
}

// Cenário 2: Desconto superior a 100%
try {
    const order2: Order = {
        orderId: "002",
        products: [{ id: 2, name: "Notebook", price: 2000 }],
        totalPrice: 0,
        discount: 150,
    }
    console.log("Total Order 2:", manager.calculateTotal(order2))
} catch (error) {
    if(error instanceof Error) {
        console.error("Erro no pedido 2:", error.message)
    }
}


// Cenário 3: Produto com preço inválido (NaN)
try {
    const order3: Order = {
        orderId: "003",
        products: [{ id: 3, name: "Mouse", price: NaN }],
        totalPrice: 0,
        discount: 10,
    }
    console.log("Total Order 3:", manager.calculateTotal(order3))
} catch (error) {    
    if(error instanceof Error) {
        console.error("Erro no pedido 3:", error.message)
    }
}

// Cenário 4: Produto com preço indefinido
try {
    const order4: Order = {
        orderId: "004",
        products: [{ id: 4, name: "Teclado", price: undefined as unknown as number }],
        totalPrice: 0,
        discount: 10,
    }
    console.log("Total Order 4:", manager.calculateTotal(order4))
} catch (error) {
    if(error instanceof Error) {
        console.error("Erro no pedido 4:", error.message)
    }
}
