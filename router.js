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
            page: req.query.page,
            limit: req.query.limit,
            format: 'json'
        }
    })
    res.json(response.data)
})

router.get('/api/album/info', async (req, res) => {
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

router.get('/api/album/similarArtists', async (req, res) => {
    const response = await axios.get(`${url}`, {
        params: {
            method: 'artist.getSimilar',
            api_key: config.API_KEY,
            format: 'json',
            artist: req.query.artist,
            limit: req.query.limit 
        }
    })
    res.json(response.data)
})

router.get('/api/artist/info', async (req, res) => {
    const response = await axios.get(`${url}`, {
        params: {
            method: 'artist.getInfo',
            api_key: config.API_KEY,
            format: 'json',
            artist: req.query.artist
        }
    })
    res.json(response.data)
})

router.get('/api/artist/topAlbums', async (req, res) => {
    const response = await axios.get(`${url}`, {
        params: {
            method: 'artist.getTopAlbums',
            api_key: config.API_KEY,
            format: 'json',
            artist: req.query.artist,
            page: req.query.page || 1, 
            limit: req.query.limit || 3
        }
    })
    res.json(response.data)
})

module.exports = router