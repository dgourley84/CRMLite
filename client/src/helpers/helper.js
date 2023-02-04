import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;



/**Autheticate function */
export async function authenticate(email) {
    try {
        return await axios.post("/home/authenticate", { email })
    } catch (error) {
        return { error: "Email does not exist" }
    }
}

/**get User details */
export async function getUser() {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.get('/home/user', { headers: { "Authorization": `Bearer ${token}` } })
        return Promise.resolve({ data })
    } catch (error) {
        return { error: "User not found" }
    }
}

/**register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post('/home/register', credentials);

        if (status === 201) {
            const { email, name } = credentials;
            await axios.post('home/registerMail', { name, userEmail: email, text: msg });
        }

        return msg;
    } catch (error) {
        throw error;
    }
}


/**Login function */
export async function verifyPassword({ email, password }) {
    try {
        if (email) {
            const { data } = await axios.post('/home/login', { email, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesnt Match" })
    }
}

/** Update user function*/
export async function updateUser(response) {
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/home/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } })
        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error: "Couldnt update profile" })
    }
}

/**generate OTP */
export async function generateOTP(email) {
    try {
        const { data: { code }, status } = await axios.get('/home/generateOTP', { params: { email } })
        //send mail with OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ email });
            let text = `Your password recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/home/registerMail', { userEmail: email, text, subject: "Password Recovery OTP" }) // add name field - this keeps running error when done.
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/**verify OTP */
export async function verifyOTP({ email, code }) {
    try {
        const { data, status } = await axios.get('/home/verifyOTP', { params: { email, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/**reset password */
export async function resetPassword({ email, password }) {
    try {
        const { data, status } = await axios.put('/home/resetPassword', { email, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }

}