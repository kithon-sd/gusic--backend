const axios = require('axios')
const router = require('express').Router()
const config = require('./config')

const url = 'http://ws.audioscrobbler.com/2.0/'


router.get('/', async (req, res) => {
    const response = await axios.get(`${url}`, {
        params: {
            method: 'album.search',
            album: req.query.query,
            api_key: config.API_KEY,
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            format: 'json'
        }
    })
    res.json(response.data)
})

router.get('/placeholder', async (req, res) => {
    const response = await axios.get(`${url}`, {
        params: {
            method: 'album.getInfo',
            api_key: config.API_KEY,
            format: 'json',
            artist: req.query.artist,
            album: req.query.album
        }
    })
    res.json(response.data)
})

module.exports = router