import React from 'react';

export default class validateForm {
    
    static isEmpty = (text) => {       
        return !text.trim();
    }

    static isEmail = (text) =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(text) == 0;
    }
}

