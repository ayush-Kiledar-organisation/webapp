const  generateMail = ()=> {
    const begin = 'hdeuyefeufycbuchybdwqihdbqfiuqgfiffbefuiebfeifefuygeifdjbcekucjoef';
    var email = '';

    const end = Math.floor(Math.random()*(1000-2))+2;

    beginlength = begin.length;

    const first = begin.charAt(Math.floor(Math.random() * beginlength));

    // Add a domain name
    email += first;
    email += "abcnewnewemail";
    email += end;
    email += '@gmail.com';
    console.log(email)

    return email;
}

module.exports = generateMail;