const Catalelog = require('../models/catalelog')

module.exports = {
    index,
    newCatalelog,
    create,
    show,
    updateCatalelogForm,
    update,
    deleteCatalelog
}

function index(req, res, next) {
    Catalelog.find({ user: req.user._id })
        .then(catalelogs => {
            res.render('catalelogs/index', {
                catalelogs,
                title: 'My catALElogs'
            })
        })
        .catch(next)
}

function newCatalelog(req, res) {
    res.render('catalelogs/new', { title: 'New catALElog' })
}

function create(req, res, next) {
    req.body.user = req.user._id
    Catalelog.create(req.body)
        .then(() => res.redirect('/catalelogs'))
        .catch(next)
}

function show(req, res, next) {
    Catalelog.findById(req.params.id)
    .then(catalelog => {
        res.render('catalelogs/show', {
            catalelog,
            title: 'catALElog Details'
        })
    })
    .catch(next)
}

function updateCatalelogForm(req, res, next) {
    Catalelog.findById(req.params.id)
        .then(catalelog => {
            res.render('catalelogs/edit', {
                catalelog,
                title: 'catALElog Edit Details'
            })
        })
}

function update(req, res, next) {
    Catalelog.findById(req.params.id)
    .then(catalelog => {
        if (!catalelog.user.equals(req.user.id)) throw new Error('Unauthorized Access')
        return catalelog.updateOne(req.body)
    })
    .then(() => res.redirect(`/catalelogs/${req.params.id}`))
    .catch(next)
}

function deleteCatalelog(req, res, next) {
    Catalelog.findById(req.params.id)
    .then(catalelog => {
        if (!catalelog.user.equals(req.user.id)) throw new Error('Unauthorized Access')
        return catalelog.deleteOne(req.body)
    })
    .then(() => res.redirect('/catalelogs'))
    .catch()
}