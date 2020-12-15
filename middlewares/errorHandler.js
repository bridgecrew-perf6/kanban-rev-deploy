module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ status: err.status, message: err.message })
    } else if (Array.isArray(err.errors)) {
        const newErr = err.errors.map(el => el.message)
        res.status(400).json({ error: newErr })
    } else {
        res.status(500).json({ error: err.message })
    }
}