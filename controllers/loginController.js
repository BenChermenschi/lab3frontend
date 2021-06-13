require('dotenv').config();
const gebruikersController = require('./gebruikerController');
const { genToken } = require('./tokenController');


exports.login = async function (req, res) {
    console.log("test")
    let email = req.body.email;
    let wachtwoord = req.body.wachtwoord;
    let isAdmin = false;
    console.log("attempting login");
    try {

        let resultaat1 = await gebruikersController.checkWachtwoordAndEmail(email, wachtwoord, res)

        console.log("resultaat1 : ");
        console.log(resultaat1);
        console.log("behind resultaat 1");
        if (resultaat1.gebruikerstype.naam == 'Administrator') {
            isAdmin = true;
            console.log('granting admin priviledge');
        }



        let final = await genToken(res, resultaat1.vollenaam, resultaat1._id, isAdmin);


        console.log(final)

        //// CHECK OUT PROMISES YOU DUM DUM!!! BCRYPT IS MAKING THIS STUFF ASYNC!!!!!!
        res.json({ token: final });
        console.log("test")
        res.send();



    } catch (err) {
        console.log("something has gone wrong, I blame this : ");
        console.log(err);
        res.json({ message: err });
    }
}













