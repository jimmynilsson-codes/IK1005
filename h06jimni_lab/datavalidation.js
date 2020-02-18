
const userValidation = (userData) => {
    if (userData.id !== undefined && userData.id.length === 0) {
        return false;
    }
    
    const userDataValidation = {
        emailValid: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(userData.email),
        firstnameValid: /^[a-ö]{1,100}$/.test(userData.firstname),
        lastnameValid: /^[a-ö]{1,100}$/.test(userData.lastname),
        passwordValid: /^[\w@-]{6,30}$/.test(userData.password)
    };

    for (isValid in userDataValidation) {
        if (!userDataValidation[isValid]) {
            return false;
        }
    }
    return true;
};

const productValidation = (prodData) => {
    if (prodData.productId !== undefined && prodData.productId.length === 0) {
        return false;
    }

    const productDataValidation = {
        productNameValid: /^[\sa-ö\d]{2,100}$/i.test(prodData.productName),
        descriptionValid: /^[\sa-ö\d]{2,100}$/i.test(prodData.productDesc),
        priceValid: /^[\d\.]{1,100}$/.test(prodData.productPrice),
        categoryIdValid: /^[\d]{1,100}$/.test(prodData.productCategoryId)
    };

    for (isValid in productDataValidation) {
        if (!productDataValidation[isValid]) {
            return false;
        }
    }
    return true;
};

const categoryValidation = (categoryData) => {
    if (categoryData.categoryId !== undefined && categoryData.categoryId.length === 0) {
        return false;
    }
    
    const categoryNameRegExp = /^[\sa-ö\d]{2,100}$/i;

    if (!categoryNameRegExp.test(categoryData.categoryName)) {
        return false;
    }
    return true;
};

module.exports = {
    userValidation: userValidation,
    productValidation: productValidation,
    categoryValidation: categoryValidation,
};