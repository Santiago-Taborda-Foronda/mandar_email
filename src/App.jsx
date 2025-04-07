import { useRef, useState } from 'react';
import React from 'react'
import emailjs from '@emailjs/browser';

export const App = () => {

  const refForm = useRef();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      tempErrors.userName = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "El mensaje es requerido";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "El mensaje debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      emailjs.sendForm(
        'service_135d067',
        'template_dtuok7f',
        refForm.current,
        'g64AktJxP-FEeMKuP'
      )
        .then((result) => {
          setSubmitStatus('success');
          setFormData({
            userName: '',
            email: '',
            message: ''
          });
          refForm.current.reset();
        }, (error) => {
          setSubmitStatus('error');
          console.error('Error al enviar email:', error.text);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };


  return (
    <>
    <div className='flex flex-col justify-center px-20 pr-30 w-full space-y-10 items-center'>
    <section className='flex  justify-center items-center  gap-20  w-full pt-20'>
      <div className='flex flex-col justify-center items-center shadow-lg border-1 border-gray-100 p-10 rounded-3xl min-w-110 space-y-5'>
      {submitStatus === 'success' && (
        <div className="">
          ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="">
          Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo más tarde.
        </div>
      )}
        <p className='text-2xl'>Enviar correo</p>
          <form ref={refForm} action='' onSubmit={handleSubmit} className='flex flex-col space-y-3 w-full'>
            <fieldset> 
              <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}  
              className='p-3 border-gray-400 hover:border-gray-600 focus:outline-none border-2 rounded-lg w-full' placeholder='Ingrese su nombre'
              />
              {errors.userName && <span className="text-red-600 text-sm mt-1 block">{errors.userName}</span>}  
              
            </fieldset>

            <fieldset> 
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange} 
                className='p-3 border-gray-400 hover:border-gray-600 focus:outline-none border-2 rounded-lg w-full' placeholder='✉ Ingrese su correo'
                />
                {errors.email && <span className="text-red-600 text-sm mt-1 block">{errors.email}</span>}
            </fieldset>
            <fieldset>
              <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange} 
              className='p-3 border-gray-400 hover:border-gray-600 focus:outline-none border-2 rounded-lg w-full' placeholder='🔒Ingrese el contenido del correo'
              />
              {errors.message && <span className="text-red-600 text-sm mt-1 block">{errors.message}</span>}  
            </fieldset>   
            <button
              type="submit"
              disabled={isSubmitting}
              className='bg-sky-500 text-white p-3 w-full rou<nded-2xl'>
                Enviar
            </button>
          </form>
            
        </div>

    </section>
    </div>
    </>
  )
}



