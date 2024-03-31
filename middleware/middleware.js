const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
}


const sessionVerify = (req, res, next) => {
    const sessionID = req.sessionID
    //console.log(req.cookies['connect.sid'])
    const cookieId = req.cookies['connect.sid'].split(':')[1].split('.')[0]
    if(sessionID !== cookieId || !sessionID || ! cookieId || !req.session.user){
        res.status(401).send('You MUST be logged in before')
    }else {
        next()
    }
}


module.exports = {loggingMiddleware, sessionVerify}
