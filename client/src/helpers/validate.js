import toast from 'react-hot-toast';
import { authenticate } from './helper.js';

function validateEmail(email) {
    if (!email) {
        return 'Email Required...!';
    } else if (email.includes(" ")) {
        return 'Email Invalid...!';
    }
    return null;
}

export async function emailValidate(values) {
    const errors = {};

    const emailError = validateEmail(values.email);
    if (emailError) {
        errors.email = toast.error(emailError);
    }

    if (values.email) {
        //check email exists or not
        const { status } = await authenticate(values.email);

        if (status !== 200) {
            errors.exist = toast.error('User does not exist');
        }
    }
    return errors;
}

/** validate register form */
export async function registerValidation(values) {
    const errors = nameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/**Error messages for passwords */
const ERROR_MESSAGES = {
    REQUIRED: "Password is required",
    INVALID_CHARS: "Password contains invalid characters",
    TOO_SHORT: "Password must be at least 5 characters long"
}

/**verify password */
function passwordVerify(password) {
    const errors = [];

    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' });
    } else if (/\s/.test(password)) {
        errors.push({ field: 'password', message: 'Password cannot contain spaces' });
    } else if (password.length < 5) {
        errors.push({ field: 'password', message: 'Password must be at least 5 characters long' });
    }
    return errors;
}


/** validate password */
export async function passwordValidate(values) {
    return passwordVerify(values.password);
}


/** validate email */
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }
    return error;
}

/** validate name */
function nameVerify(error = {}, values) {
    if (!values.name) {
        error.name = toast.error('Name Required...!');
    } else if (values.name.length < 2) {
        error.name = toast.error("Name must be more than 2 characters long");
    }

    return error;
}

/** validate profile page */
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}