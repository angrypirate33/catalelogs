const express = require('express')
const router = express.Router()

const beerCtrl = require('../controllers/beers')

router.get('/', beerCtrl.index)
router.get('/search', beerCtrl.searchBeer)
router.get('/:id', beerCtrl.showBeerDetails)
router.get('/:id/catalelog', beerCtrl.showCatalelogBeerDetails)
router.put('/:beerId/add-beer/:catalelogId', beerCtrl.addBeer)
router.post('/:beerId/:catalelogId', beerCtrl.addBeerToCatalelog)
router.delete('/:catalelogId/:beerId', beerCtrl.deleteBeerFromCatalelog)
router.delete('/:beerId/catalelog?catalelogId=:catalelogId', beerCtrl.deleteBeerFromCatalelog)

module.exports = router