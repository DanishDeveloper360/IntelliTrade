const itemsRepo = require('../../../lib/itemsRepository'),
      util = require('util');

class ItemsController {

    constructor(router) {
        router.get('/', this.getItems.bind(this));
        router.post('/', this.insertItem.bind(this));
        router.post('/ingot', this.insertIngot.bind(this));
    }

  insertIngot(req, res) {
        console.log('*** insertIngot' + req.body.ingotName);

                itemsRepo.insertIngot(req.body, (err, item) => {
                    if (err) {
                        console.log('*** itemsRepo.insertIngot error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', item: null});
                    } else {
                        console.log('*** insertIngot ok');
                        res.json({ status: true, error: null, item: item });
                    }
                });
    }

    insertItem(req, res) {
        console.log('*** insertItem' + req.body.name);

                itemsRepo.insertItem(req.body, (err, item) => {
                    if (err) {
                        console.log('*** itemsRepo.insertItem error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', item: null});
                    } else {
                        console.log('*** insertItem ok');
                        res.json({ status: true, error: null, item: item });
                    }
                });
    }




    getItems(req, res) {
        console.log('*** getItems');
        itemsRepo.getItems((err, data) => {
            if (err) {
                console.log('*** getItems error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getItems ok');
                res.json(data.items);
            }
        });
    }
    

}

module.exports = ItemsController;