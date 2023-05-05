const { Router } = require('express')
const router = Router()

const fn = require('./functions')


router.get('/logout', (req, res) => {
    res.json('Desconectado')
})

router.get('/profile', () => {

})

router.get('/', function (req, res) {
    res.redirect('login')
})

router.get('/login', (req, res) => {
    //validar si hay una sesion
    // validar si existe
    console.log(req.session)
        res.render('index')
})

router.get('/validate', (req, res) => {
    //const session = fn.getSessions()
    console.log(req.session)

})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    fn.authenticate(username, password, (error, user) => {
        if (error) return next(err)
        if (user) { 
            req.session.regenerate(() => {
                req.session.user = user
                req.session.success = 'FerSession'

                console.log(req.session)
                res.redirect('back')
            })
        } else {
            req.session.error = ''
            res.redirect('/')
        }
    })
})


module.exports = router