const houses = require('./db.json');
const priceChange = 10000;
let nextId = houses.reduce((bigId, currentHouse) => Math.max(bigId, parseInt(currentHouse.id)), 0) + 1

module.exports = {

    getHouses: (req, res) => {
        res.status(200).send(houses);
    },

    deleteHouse: (req, res) => {
        const {id} = req.params;
        for (let i=0; i<houses.length; i++) {
            if (houses[i].id === id) {
                houses.splice(i,1);
                res.status(200).send(`House ${id} deleted.`);
                return;
            }
        }

        res.status(400).send(`House ${id} not found.`);
    },

    createHouse: (req, res) => {

        const { address, price, imageURL } = req.body
        houses.push(
            {
                id: nextId++,
                address: address,
                price: price,
                imageURL: imageURL
            }
        )

        res.status(200).send('House Added')
    },

    updateHouse: (req, res) => {

        const {id} = req.params;
        const {type} = req.body;

        for (let i=0; i<houses.length; i++) {

            if (houses[i].id === id) {

                const house = houses[i]
                if (type === 'plus') {
                    house.price += priceChange;
                    ;
                } else if (type === 'minus') {
                    house.price -= priceChange;
                }
                res.status(200).send(houses);
                return;
            }
        }

        res.status(400).send(`House ${id} not found.`);
    }

}