const {credentials} = require('../cred/cred');

const healthzController = async(req, res) => {

    res.setHeader('Cache-Control', 'no-cache');

    if(req.method !== 'GET'){
        res.status(405).json();
        return;
    }

if(req.headers['content-length']){
    if (parseInt(req.headers['content-length']) > 0){

        res.status(400).json();
        return;
    }
}

    if(Object.keys(req.query).length != 0){
        res.status(400).json();
        return;
    }

    try{
        await credentials.authenticate();
        // console.log("db running")
        res.status(200).json();
    }
    catch(e){
        res.status(503).json();
    }
}

module.exports = healthzController;