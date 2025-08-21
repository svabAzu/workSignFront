import { useFormik } from "formik";
import * as Yup from "yup";

//import { useAuth } from "../context/AuthContext";
//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { PiBroomFill } from "react-icons/pi";




interface myFormValues {
  password: string;

  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required(),
  password: Yup.string().required(),
});


export const LoginPages = () => {

  // const { signin, authErrors, isAutheticaded } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAutheticaded) navigate("/main");
  // }, [isAutheticaded]);

  const submitForm = async (values: myFormValues) => {
    //signin(values);

    console.log(values)
  };

  const { handleSubmit, handleChange, handleReset, errors, values } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: submitForm,
      validationSchema: schema,
    }
  );
  return (
    <div className="flex flex-col items-start justify-center h-[95vh] bg-[#F1F1F1]">
      <div className="h-[95%] w-[98%] bg-white rounded-4xl flex justify-center">

        <section className="w-1/2 flex flex-col items-center justify-center gap-4 ">
           <img className="max-h-[50%] w-auto" src="/iconos/WorkSign-Engranaje.png" alt="Isotipo de la empresa" />
           <h1 className="text-5xl font-bold">Bienvenido</h1>
        </section>  

        <div className="h-full w-1/2 flex items-center ">
          <div className="bg-[#F1F1F1] w-[80%] flex items-center flex-col h-auto rounded-xl shadow-lg ">
            <div className="w-full flex justify-center items-center py-4 rounded-t-lg  bg-custom-green">
              {/* <LogoWhite /> */}
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset} className="w-[80%] flex flex-col mt-5 mb-5">
              <h2 className="text-black mt-3 font-bold mb-1">Usuario</h2>
              <input
                className="border border-gray-400 p-2 rounded flex justify-center"
                type="email"
                placeholder="usuario@usuario.com"
                name="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && (
                <span className="text-custom-yellow text-xs">Email invalido</span>
              )}
              <br />
              <h2 className="text-black mb-1 font-bold mt-1">Contraseña</h2>
              <input
                className="border border-gray-400 p-2 rounded flex justify-center"
                type="password"
                placeholder="********"
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.password && (
                <span className="text-custom-yellow text-xs">
                  Password invalido
                </span>
              )}

              <div className="w-full flex flex-col items-center justify-center">
                {/* {authErrors.map((error, i) => (
                  <div className="text-custom-yellow my-1 text-xs" key={i}>
                    {error}
                  </div>
                ))} */}
                <div className="w-full mb-5 flex items-center justify-center">
                  <button
                    className=" flex justify-center items-center mt-5 p-6 w-40 h-10 hover:bg-[#ffff] bg-green-600 text-[#ffff] font-bold hover:text-custom-green rounded-2xl"
                    type="submit"
                  >
                    Ingresar
                  </button>


                  {/* <button
                    className="mt-5 ml-3 h-10 hover:text-custom-green hover:bg-[#ffff] bg-custom-green text-[#ffff] p-2 rounded"
                    type="reset"
                  >
                    <PiBroomFill />
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
