const express = require('express')
const router = express.Router()

const beerCtrl = require('../controllers/beers')

router.get('/', beerCtrl.index)
router.get('/search', beerCtrl.searchBeer)
router.get('/:name', beerCtrl.show)
router.post('/:catalelogId', beerCtrl.addBeerToCatalelog)
router.delete('/:catalelogId/:beerId', beerCtrl.deleteBeerFromCatalelog)

module.exports = router