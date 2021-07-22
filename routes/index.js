const express = require('express');
const router = express.Router()

// home
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login.hbs'
    });
})

// /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

module.exports = router;