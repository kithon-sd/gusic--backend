const axios = require('axios')
const router = require('express').Router()
const config = require('./config')

const url = 'http://ws.audioscrobbler.com/2.0/'


router.get('/', async (req, res) => {
    const response = await axios.get(`${url}?method=album.search&album=${req.query.query}&api_key=${config.API_KEY}&format=json`)
    res.json(response.data)
})

module.exports = router