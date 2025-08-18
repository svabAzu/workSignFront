import { useFormik } from "formik";
import React from "react";

export const RegisterPages = () => {
  const submitForm = (values) => {};

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      dni: "",
      email: "",
      phone: "",
      password: "",
      foto: "",
      ussser: "",
    },
    onSubmit: submitForm,
  });

  return (
    <div className="flex flex-col items-start justify-center bg-[#F1F1F1] ">
      <div className="h-[95%] w-[98%] bg-white rounded-4xl items-center flex flex-col">
        <div className="w-[80%] flex flex-col">
          <h1 className=" text-[#199431] items-start font-bold">REGISTRO DE USUARIOS:</h1>
         <div className="flex justify-between ">
          <div className="flex flex-col gap-y-6 font-bold">
            <h2>Nombre</h2>
            <h2>Apellido</h2>
            <h2>DNI</h2>
            <h2>Correo</h2>
            <h2>Telefono</h2>
            <h2>Contaseña</h2>
          </div>
          <div>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
              <input className="border-2 border-[#ACACAE]"
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleChange}
              />
              <input className="border-2 border-[#ACACAE]"
                type="text"
                placeholder="Apellido"
                name="surname"
                onChange={handleChange}
              />
              <input className="border-2 border-[#ACACAE]"
                type="text"
                placeholder="DNI"
                name="dni"
                onChange={handleChange}
              />
              <input className="border-2 border-[#ACACAE]"
                type="email"
                placeholder="Correo"
                name="email"
                onChange={handleChange}
              />
              <input className="border-2 border-[#ACACAE]"
                type="text"
                placeholder="Telefono"
                name="phone"
                onChange={handleChange}
              />
              <input className="border-2 border-[#ACACAE]"
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
            </form>
          </div>
          <div>
            <input
                type="password"
                placeholder="password" 
                name="password"
                onChange={handleChange}
              />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
