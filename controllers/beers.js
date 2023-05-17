const Catalelog = require('../models/catalelog')

module.exports = {
    index,
    show,
    addBeerToCatalelog,
    deleteBeerFromCatalelog
}

function index(req, res, next) {
    const encodedKey = process.env.ENCODED_KEY
    const options = {
        headers: {
            Authorization: `Basic ${encodedKey}`,
            Accept: 'application/json'
        }
    }
    fetch('https://api.catalog.beer/beer?count=10%cursor=', options)
    .then(res => {
        if (res.ok) return res.json();
    })    
    .then(beers => {
        res.render('beers/index', {
            beers: beers.data,
            title: 'Beer List'
        })
        console.log(beers.data)
    })
    .catch(next)
}

function show(req, res, next) {
    res.render('beers/show', {
        title: 'Beer Detail'
    })
}

function addBeerToCatalelog(req, res, next) {
    Catalelog.findById(req.params.catalelogId)
        .then(catalelog => {
            catalelog.beer.push(req.body)
            return catalelog.save()
        })
        .then(() => res.redirect(`/catalelogs/${req.params.catalelogId}`))
        .catch(next)
}

function deleteBeerFromCatalelog(req, res, next) {
    Catalelog.findById(req.params.catalelogId)
        .then(catalelog => {
            if (!catalelog.user.equals(req.user.id)) throw new Error('Unauthorized Access')
            catalelog.beer.id(req.params.beerId).deleteOne()
            return catalelog.save()
        })
        .then(() => res.redirect(`/catalelogs/${req.params.catalelogId}`))
        .catch(next)
}