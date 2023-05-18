const Catalelog = require('../models/catalelog')

module.exports = {
    index,
    show,
    searchBeer,
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
    fetch('https://api.catalog.beer/beer?count=100%cursor=', options)
    .then(res => res.json())    
    .then(beers => {
        res.render('beers/index', {
            beers: beers.data,
            title: 'Beer List'
        })
    })
    .catch(next)
}

function show(req, res, next) {
    res.render('beers/show', {
        title: 'Beer Detail'
    })
}

function searchBeer(req, res, next) {
    const encodedKey = process.env.ENCODED_KEY;
    const searchTerm = req.query.searchName; // Assuming the user enters the search term in a form field named "searchTerm"

    const options = {
        headers: {
            Authorization: `Basic ${encodedKey}`,
            Accept: 'application/json'
        }
    };

    fetch('https://api.catalog.beer/beer', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch beers');
            }
            return response.json();
        })
        .then(beers => {
            // Filter the beers based on the search term
            const filteredBeers = beers.data.filter(beer =>
                beer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            res.render('beers/index', {
                beers: filteredBeers,
                title: 'Search Results'
            });
        })
        .catch(error => {
            next(error);
        });
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