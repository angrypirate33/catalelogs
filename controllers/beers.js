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
    const beerId = req.params.id
    const encodedKey = process.env.ENCODED_KEY
    const options = {
      headers: {
        Authorization: `Basic ${encodedKey}`,
        Accept: 'application/json',
      }
    }
    fetch(`https://api.catalog.beer/beer/${beerId}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch beer details')
        }
        return response.json()
      })
      .then((beer) => {
        res.render('beers/show', {
          beer,
          title: 'Beer Detail'
        })
      })
      .catch(next);
  }

async function searchBeer(req, res, next) {
    const encodedKey = process.env.ENCODED_KEY
    const perPage = 10000 // Number of beers to fetch per search request
    const searchTerm = req.query.searchName

  const options = {
    headers: {
      Authorization: `Basic ${encodedKey}`,
      Accept: 'application/json'
    }
  }

  try {
    let nextCursor = null
    let allBeers = []

    while (true) {
        let url = `https://api.catalog.beer/beer?count=${perPage}`
        if (nextCursor) {
          url += `&cursor=${encodeURIComponent(nextCursor)}`
        }
  
        const response = await fetch(url, options)
        const apiData = await response.json()
        const beers = apiData.data
  
        // Filter the beers based on the search term
        const filteredBeers = beers.filter(beer =>
          beer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
  
        // Add the filtered beers to the result array
        allBeers.push(...filteredBeers)
  
        if (!apiData.next_cursor) {
          // Reached the last page, exit the loop
          break
        }
  
        nextCursor = apiData.next_cursor;
      }
  
      res.render('beers/index', {
        beers: allBeers,
        title: 'Search Results'
      })
    } catch (error) {
      next(error);
    }
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