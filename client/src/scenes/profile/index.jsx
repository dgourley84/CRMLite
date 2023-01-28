import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from 'helpers/validate';
import convertToBase64 from 'helpers/convert';
import useFetch from 'hooks/fetch.hook';
import { updateUser } from 'helpers/helper';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/profile.jpg';
import styles from '../../assets/Profile.module.css';
import extend from '../../assets/Username.module.css'
import { Avatar } from '@mui/material';
import { useAuthStore } from 'store/store';

export default function Profile() {

  const [file, setFile] = useState();
  const navigate = useNavigate()
  const {email} =useAuthStore(state=> state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch();
 
  const formik = useFormik({
    initialValues : {
      name : apiData?.name || '',
      email: apiData?.email || '',
      city: apiData?.city || '',
      state : apiData?.state || '',
      country : apiData?.country || '',
      occupation : apiData?.occupation || '',
      phoneNumber : apiData?.phoneNumber || '',
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || profileImg} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('name')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Name*' />
                    <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

                <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('occupation')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Occupation' />
                    <input {...formik.getFieldProps('city')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='City' />
                </div>

                <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('state')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='State' />
                    <input {...formik.getFieldProps('country')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Country' />
                </div>

               
                  <input {...formik.getFieldProps('phoneNumber')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Phone Number' />
                  <button className={styles.btn} type='submit'>Update</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}