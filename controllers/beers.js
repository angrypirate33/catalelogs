const Catalelog = require('../models/catalelog')
const encodedKey = base64_encode('c5084d96-3d59-48a0-b9d8-df5a31695d9e:')

module.exports = {
    show,
    addBeerToCatalelog,
    deleteBeerFromCatalelog,
    searchBeers
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

function searchBeers(req, res, next) {
    const name = document.getElementById("name").value
    const url = `https://api.catalog.beer/beers?name=${name}`
    const request = new Request(url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${encodedKey}`,
    },
    })
    fetch(request)
        .then(response => {
            if (response.status === 200) {
            const beers = response.json()
            const list = document.getElementById("beers-list")
            list.innerHTML = ""

        beers.forEach(beer => {
            const li = document.createElement("li");
            li.textContent = beer.name;
            list.appendChild(li);
        })
        } else {
            console.log(`Error ${response.status}`);
        }   
        })
}