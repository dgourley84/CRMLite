import toast from 'react-hot-toast'

// validate login page email
export async function emailValidate(values){
    const errors = emailVerify({}, values)
    
    return errors;
}

// validate login email
function emailVerify (error ={}, values) {
    if(!values.email){
        error.email = toast.error('Email Required...!');
    } else if (values.email.includes("")){
        error.email = toast.error('Email Invalid...!');
    }

    return error;
}