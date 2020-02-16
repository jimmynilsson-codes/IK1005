const emailRegExp = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const firstnameRegExp = /^[a-ö]{1,100}$/;
const lastnameRegExp = /^[a-ö]{1,100}$/;
const passwordRegExp = /^[\w@-]{8,30}$/;

const dataPatterns = [emailRegExp, firstnameRegExp, lastnameRegExp, passwordRegExp];

const emailErrMsg = 'email ';
const firstnameErrMsg = 'firstname ';
const lastnameErrMsg = 'lastname ';
const passwordErrMsg = 'password'
const dataInput = [emailErrMsg, firstnameErrMsg, lastnameErrMsg, passwordErrMsg];

const userValidation = (userData) => {
    let errormsg = 'Invalid input: ';
    for (let i = 0; i < userData.length; i++) {
        if (!dataPatterns[i].test(userData[i])) {
            errormsg = errormsg.concat(dataInput[i]);
        };
    };

    if (errormsg.length > 15) {
        errormsg = errormsg.trimRight();
        throw Error(errormsg);
    };
};
module.exports = {
    userValidation: userValidation,
};