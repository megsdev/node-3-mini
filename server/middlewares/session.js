module.exports = (req, res, next) => {
    console.log(req.session)
    if(!req.session.user) {
        req.session.user = {messages: []}
    }
    console.log(req.session)
    next()
}