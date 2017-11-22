const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Ingot = require('../models/ingot'),
    Item = require('../models/item');

class ItemsRepository {


    // insert a ingot
    insertIngot(body, callback) {
        console.log('*** ItemsRepository.insertIngot');
        let item = new Ingot();
        console.log(body);
        let items = [];

        this.getItems((err, data) => {
            if (err) {
                console.log('*** getItems error: ' + util.inspect(err));
            } else {
                console.log('*** getItems ok');
                items = data.items;


                item.ingotName = body.ingotName;
                item.formulaName = body.formulaName;
                item.profit = body.profit;
                item.itemCost = body.itemCost;
                item.wasteCost = body.wasteCost;
                item.ingotCost = body.ingotCost;
                item.rodi = body.rodi;
                item.lm = body.lm;
                item.sisa = body.sisa;
                item.loha = body.loha;
                item.zinc = body.zinc;
                item.netIngotWeight = body.netIngotWeight;
                item.totalItemWeight = body.totalItemWeight;
                item.totalItemWeightMinusZinc = body.totalItemWeight;
                item.items = items;

                item.save((err, item) => {
                    if (err) {
                        console.log(`*** ItemsRepository insertItem error: ${err}`);
                        return callback(err, null);
                    }

                    callback(null, item);
                });

            }
        });
    }


    // insert a item
    insertItem(body, callback) {
        console.log('*** ItemsRepository.insertItem');
        let item = new Item();
        console.log(body);

        item.name = body.name;
        item.zinc = body.zinc;
        item.waste = body.waste;

       item.save((err, item) => {
            if (err) {
                console.log(`*** ItemsRepository insertItem error: ${err}`);
                return callback(err, null);
            }

            callback(null, item);
        });
    }

    // get all the customers
    getItems(callback) {
        console.log('*** ItemsRepository.getItems');
        Item.count((err, itemsCount) => {
            let count = itemsCount;
            console.log(`Items count: ${count}`);

            Item.find({}, (err, items) => {
                if (err) {
                    console.log(`*** ItemsRepository.getItems error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    items: items
                });
            });

        });
    }


    // get all the states
    // getStates(callback) {
    //     console.log('*** StatesRepository.getStates');
    //     State.find({}, {}, { sort: { name: 1 } }, (err, states) => {
    //         if (err) { 
    //             console.log(`*** StatesRepository.getStates err: ${err}`); 
    //             return callback(err); 
    //         }
    //         callback(null, states);
    //     });
    // }

    // // get a state
    // getState(stateId, callback) {
    //     console.log('*** StatesRepository.getState');
    //     State.find({ 'id': stateId }, {}, (err, state) => {
    //         if (err) { 
    //             console.log(`*** StatesRepository.getState err: ${err}`); 
    //             return callback(err); 
    //         }
    //         callback(null, state);
    //     });
    // }
}

module.exports = new ItemsRepository();

