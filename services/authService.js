const bcrypt = require('bcryptjs');

exports.isPwdCorrect = async (usedPwd, pwdString) => {
    try {
        let isValid = await bcrypt.compare(usedPwd, pwdString)
        if (!isValid) {
            console.log("authService: wrong login")
        }
        return isValid
    }
    catch (err) {
        console.log("authService: error in bcrypt" + err)
        return false
    }
}

