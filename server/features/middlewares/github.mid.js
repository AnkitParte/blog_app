const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

const authMiddleware = async (req, res, next) => {

    try {
        const code = req.query.code;
        console.log(code);
        let access_token = "";
        let data = {};

        await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
            // Set the content type header, so that we get the response in JSON
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            access_token = response.data.access_token
        }).catch(e => {
            return res.send({ error: e })
        })

        await axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
                Authorization: 'token ' + access_token
            }
        }).then((response) => {
            //res.render('pages/success', { userData: response.data });
            data = response.data;
        }).catch(e => {
            return res.send({ error: e })
        })
        //res.send({ message: "login with github successful!!!", data: data });
        req.body = {email : data.login , username : data.name ,role : "user"};
        next();
    }
    catch (e) {
        return res.status(500).send({ message: "cannot perform this operation!!!" })
    }
}

module.exports = authMiddleware;