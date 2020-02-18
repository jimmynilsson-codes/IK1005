
const userValidation = (userData) => {

    //const errormsg = 'Invalid input!';

    //ALTERNATIVT 1 - två objekt som loopas i en for-in loop.

    //objekt som lagrar input från användare (endast avsedd för test) värdena tas från parameter objektet userData  
    const userInputData = {
        email: 'jimmydu.se',
        firstname: 'jimmy',
        lastname: '1111nilsson',
        password: '12345678910'
    };

    //objekt som håller regexp patterns för validering
    const userDataPatterns = {
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        firstname: /^[a-ö]{1,100}$/,
        lastname: /^[a-ö]{1,100}$/,
        password: /^[\w@-]{6,30}$/
    };

    //for-in loop som loopar över objekten userInputData och userDataPatterns.
    //För att detta ska fungera så måste propertyname vara samma i userInputData och userDataPattern.
    for (property in userDataPatterns) {
        if (userDataPatterns[property].test(userInputData[property])) {
            console.log('true');
        } else {
            console.log('false');
        }
        /* 
            Output:
            false - 'jimmydu.se' = invalid
            true - 'jimmy' = valid
            false - '1111nilsson' = invalid
            true - '12345678910' = valid
        */
    }

    //ALTERNATIV 2 - ett objekt som håller booleanska värden av regexp.test('input från data')

    //Objekt som lagrar true/false av regexp test. 
    //Obs värdena i test() är hårdkodade för testning. De tas från parameter objektet userData vid körning
    const userDataValidation = {
        emailValid: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test('jimmy@du.se'),
        firstnameValid: /^[a-ö]{1,100}$/.test('1jimmy'),
        lastnameValid: /^[a-ö]{1,100}$/.test('nilsson'),
        passwordValid: /^[\w@-]{6,30}$/.test('11')
    };

    for (isValid in userDataValidation) {
        if (userDataValidation[isValid]) {
            console.log('true');
        } else {
            console.log('false');
        }
        /* 
            Output:
            true - 'jimmy@du.se' = valid
            false - '1jimmy' = invalid
            true - 'nilsson' = valid
            false - '11' = invalid
        */
    }

};

const prodValidation = (prodData) => {
    const prodNameRegExp = /^[\sa-ö\d]{2,100}$/i;
    const descRegExp = /^[\sa-ö\d]{2,100}$/i;
    const priceValidation = /^[\d\.]{1,100}$/;
    const categoryIdRegExp = /^[\d]{1,100}$/;
    const proddataPattern = [prodNameRegExp, descRegExp, priceValidation, categoryIdRegExp];
    const errormsg = 'Invalid input!';

    for (let i = 0; i < prodData.length; i++) {
        if (!proddataPattern[i].test(prodData[i])) {
            throw Error(errormsg);
        }
    }
};

const catValidation = (categoryName) => {
    const categoryNameRegExp = /^[\sa-ö\d]{2,100}$/i;
    const errormsg = 'Invalid input!';

    if (!categoryNameRegExp.test(categoryName)) {
        throw Error(errormsg);
    }
};
module.exports = {
    userValidation: userValidation,
    prodValidation: prodValidation,
    catValidation: catValidation,
};

userValidation();