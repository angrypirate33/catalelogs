const express = require('express')
const router = express.Router()

const beerCtrl = require('../controllers/beers')

router.get('/', beerCtrl.index)
router.get('/search', beerCtrl.searchBeer)
router.get('/:id', beerCtrl.show)
router.put('/:beerId/add-beer/:catalelogId', beerCtrl.addBeer)
router.post('/:beerId/:catalelogId', beerCtrl.addBeerToCatalelog)
router.delete('/:catalelogId/:beerId', beerCtrl.deleteBeerFromCatalelog)

module.exports = router