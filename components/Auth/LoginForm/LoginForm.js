import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginApi } from '../../../api/user';

const LoginForm = (props) => {
   const { showRegisterForm, onCloseModal } = props;

   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues,
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
         setLoading(true);
         const response = await loginApi(formData);

         if (response?.jwt) {
            toast.success('Acceso correcto!');
            onCloseModal();
            showLoginForm();
         } else {
            toast.error('Email y/o contraseña incorrectos');
         }

         setLoading(false);
      },
   });

   return (
      <Form className='login-form' onSubmit={formik.handleSubmit}>
         <Form.Input
            name='identifier'
            type='text'
            placeholder='Correo Electrónico'
            onChange={formik.handleChange}
            error={formik.errors.identifier}
         />

         <Form.Input
            name='password'
            type='password'
            placeholder='Contraseña'
            onChange={formik.handleChange}
            error={formik.errors.password}
         />

         <div className='actions'>
            <Button type='button' basic onClick={showRegisterForm}>
               Registrarme
            </Button>

            <div>
               <Button className='submit' type='submit' loading={loading}>
                  Login
               </Button>

               <Button type='button'>¿Olvidaste la contraseña?</Button>
            </div>
         </div>
      </Form>
   );
};

const initialValues = () => {
   return {
      identifier: '',
      password: '',
   };
};

const validationSchema = () => {
   return {
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
   };
};

export default LoginForm;