const mongoose = require('mongoose');

const Gebruiker = mongoose.model('Gebruiker');


exports.getGebruikerOnEmail = (email) => {
    return new Promise((resolve, reject) => {
        Gebruiker.findOne({ email })
            .select('+wachtwoord')
            .populate('gebruikerstype')
            .exec((err, gebruiker) => {
                if (err) {
                    console.log("gebruikerService : getGebruikerOnEmail : geen gebruiker gevonden");
                    resolve(undefined)
                }
                resolve(gebruiker)
            })
    })

}