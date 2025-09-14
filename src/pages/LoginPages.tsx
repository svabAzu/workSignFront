import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface myFormValues {
  password: string;
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required(),
  password: Yup.string().required(),
});

export const LoginPages = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, authErrors, isAutheticaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutheticaded) navigate("/");
  }, [isAutheticaded]);

  const submitForm = async (values: myFormValues) => {
    signin(values);
    
  };

  const { handleSubmit, handleChange, handleReset, errors, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: schema,
  });

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F1F1] p-6">
  <div className="flex flex-col md:flex-row justify-center items-center bg-[#F1F1F1] rounded-4xl w-11/12 max-w-7xl">
    
    <section className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 py-10">
      <img
        className="w-24 sm:w-32 md:w-48 lg:w-56 transition-all duration-300"
        src="/iconos/WorkSign-Engranaje.png"
        alt="Isotipo de la empresa"
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        BIENVENIDO
      </h1>
    </section>

    
    <div className="w-full md:w-1/2 flex justify-center p-6">
      <div className="bg-[#F1F1F1] w-full max-w-lg flex flex-col items-center rounded-xl shadow-gray-500 shadow-lg">
        <div className="w-full py-5 rounded-t-lg bg-custom-green"></div>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="w-[80%] flex flex-col mt-6 mb-6"
        >
          
          <h2 className="text-black mt-4 font-bold mb-2">Usuario</h2>
          <input
            className="border border-gray-400 p-3 rounded w-full"
            type="email"
            placeholder="usuario@example.com"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && (
            <span className="text-[#DC3545] text-xs">Email inválido</span>
          )}

          
          <h2 className="text-black mt-4 font-bold mb-2">Contraseña</h2>
          <div className="relative w-full">
            <input
              className="border border-gray-400 p-3 rounded w-full"
              type={showPassword ? "text" : "password"}
              placeholder="•••••••••"
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          {errors.password && (
            <span className="text-[#DC3545] text-xs">Contraseña inválida</span>
          )}

          
          <div className="w-full flex flex-col items-center mt-4">
            {authErrors.map((error, i) => (
              <div key={i} className="text-custom-yellow my-1 text-xs">
                {error}
              </div>
            ))}
            <button
              className="mt-6 w-44 h-12 hover:bg-[#ADC708] text-white hover:text-black font-bold rounded-2xl border-2 border-transparent bg-green-600 transition-colors duration-200"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  );
};