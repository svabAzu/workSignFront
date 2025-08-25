import { useFormik } from "formik";
import React from "react";

export const RegisterForm = () => {
  const { handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      dni: "",
      email: "",
      phone: "",
      password: "",
      photo: null,
      ussser: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid items-center grid-cols-5 grid-rows-5 gap-4">
          <div className=" text-[#199431] items-start font-bold col-span-6 text-3xl  ">
            R E G I S T R O
          </div>
          <div className="flex flex-col gap-y-6 font-bold col-span-2 row-span-4 row-start-2">
            <h2>Nombre</h2>
            <h2>Apellido</h2>
            <h2>DNI</h2>
            <h2>Correo</h2>
            <h2>Telefono</h2>
            <h2>Contaseña</h2>
          </div>
          <div className="col-span-2 row-span-4 row-start-2 flex flex-col gap-y-5">
            
              <input
                className="border-2 border-[#ACACAE] "
                type="text"
                placeholder=" Nombre"
                name="name"
                onChange={handleChange}
              />
              <input
                className="border-2 border-[#ACACAE]"
                type="text"
                placeholder=" Apellido"
                name="surname"
                onChange={handleChange}
              />
              <input
                className="border-2 border-[#ACACAE]"
                type="text"
                placeholder=" DNI"
                name="dni"
                onChange={handleChange}
              />
              <input
                className="border-2 border-[#ACACAE]"
                type="email"
                placeholder=" Correo"
                name="email"
                onChange={handleChange}
              />
              <input
                className="border-2 border-[#ACACAE]"
                type="text"
                placeholder=" Telefono"
                name="phone"
                onChange={handleChange}
              />
              <input
                className="border-2 border-[#ACACAE]"
                type="password"
                placeholder=" ****"
                name="password"
                onChange={handleChange}
              />
            
          </div>
          <div className="col-span-2 row-span-4 row-start-2">
            <div>
              <label htmlFor="photo"  >
                Photo
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>{" "}
          </div>
        </div>
    </form>
  );
}

export const RegisterPages = () => {
  return (
    <div className="w-[100%] flex flex-col items-center justify-center h-[95dvh] bg-[#F1F1F1] ">
      <div className="h-[95%] w-[98%] bg-white rounded-4xl items-center justify-center flex flex-col">
        <RegisterForm />
      </div>
    </div>
  );
};
