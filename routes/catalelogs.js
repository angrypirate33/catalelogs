const express = require('express')
const router = express.Router()

const catalelogCtrl = require('../controllers/catalelogs')

router.get('/',  catalelogCtrl.index)
router.get('/new', catalelogCtrl.newCatalelog)
router.post('/', catalelogCtrl.create)
router.get('/:id', catalelogCtrl.show)
router.get('/:id/edit', catalelogCtrl.updateCatalelogForm)
router.put('/:id', catalelogCtrl.update)
router.delete('/:id', catalelogCtrl.deleteCatalelog)

module.exports = router