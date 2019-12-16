const axios = require('axios')
const md5 = require('md5')
const router = require('express').Router()
const config = require('./config')

const url = 'http://ws.audioscrobbler.com/2.0/'


router.get('/api/album/search', async (req, res) => {
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

router.get('/api/album/getInfo', async (req, res) => {
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

router.get('/api/artist/getSimilar', async (req, res) => {
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

router.get('/api/artist/getInfo', async (req, res) => {
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

router.get('/api/artist/getTopAlbums', async (req, res) => {
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

router.get('/api/user/fetchApiKey', async (req, res) => { //make this more secure somehow
    res.json({
        key: config.API_KEY
    })
})

router.get('/api/auth/getSession', async (req , res) => {
    const apiSignature = md5(
        `api_key${config.API_KEY}` +
        `methodauth.getSession` +
        `token${req.query.token}` +
        `${config.SECRET}`)

    try {    
     const response = await axios.get(`${url}`, {
         params: {
             method: 'auth.getSession',
             api_key: config.API_KEY,
             api_sig: apiSignature,
             token: req.query.token,
             format: 'json',
         }
     })
     res.json(response.data)
    }
    catch(err) {
        console.error(err.response.data.message)
    }
})


router.post('/api/track/love', async (req, res) => {
    try {
    const apiSignature = md5(
        `api_key${config.API_KEY}` +
        `artist${req.body.artist}` +
        `methodtrack.love` +
        `sk${req.body.sessionKey}` +
        `track${req.body.track}` +
        `${config.SECRET}` 

    )

    const response = await axios({
        method: 'post',
        url: url,
        params: {
            method: 'track.love',
            api_key: config.API_KEY,
            api_sig: apiSignature,
            format: 'json',
            artist: req.body.artist,
            track: req.body.track,
            sk: req.body.sessionKey
        }
    })
    res.json(response.statusCode)
    }
    catch(err) {
        console.error(err.response.data)        
    }
})

router.get('/api/user/getLovedTracks', async (req, res) => {
    try {
        const response = await axios.get(url, {
            params: {
                method: 'user.getLovedTracks',
                api_key: config.API_KEY,
                user: req.query.user,
                format: 'json'
            }
        })
        res.json(response.data)
    }
    catch(err) {
        console.error(err.data)
    }
})

module.exports = router