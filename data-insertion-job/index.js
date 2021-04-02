const mysql = require('mysql');
const { commerce } = require('faker');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'products'
});

connection.connect();

Array.from({
    length: 100
})
    .map(() => ({
        id: null,
        color: commerce.color(),
        department: commerce.department(),
        productName: commerce.productName(),
        price: Number(commerce.price(1, 10000, 2)),
        productAdjective: commerce.productAdjective(),
        productMaterial: commerce.productMaterial(),
        product: commerce.product(),
        productDescription: commerce.productDescription(),
    }))
    .forEach((p) => {

        const values = Object.values(p).map(v => (
            typeof v === 'string' ? `"${v}"` : (v === null ? 'null' : v)
        )).join(",");

        connection.query(`INSERT INTO products values (${values})`,
            function (error) {
                if (error) return console.error(error.message);
                console.log(`Row inserted`);
            });
    })
