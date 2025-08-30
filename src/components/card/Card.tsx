
import { Link } from "react-router-dom";

const Card = () => {







    return (
        <>
            <Link
                to={`/main/`}
                className=" h-auto  flex justify-start rounded-lg my-4 mx-4 py-4  border-solid border-1 border-[#ACACAE] shadow-xl gap-4  "
            >
                <div className="w-30 h-30 ml-5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                    <img src={'0'} alt={"Imagen de generaltask"} className="object-cover w-full h-full" />
                </div>

                <div className="flex w-[80%]  ">
                    <div className="flex w-full justify-between items-center ">
                        <div className="w-auto flex  flex-col gap-3  text-left ">
                            <h1 className=" text-xl  text-custom-green font-bold ">{`Titulo de la generalTask`}</h1>
                            <h2 className=" text-base ">

                                <span className="font-bold"> Cliente: </span>
                                {`Nombre del Cliente`}
                            </h2>

                        </div>
                        <div className=" w-auto flex flex-col gap-3  text-left ">
                            <h2 className=" text-base ">

                                <span className="font-bold"> Fecha de Entrega </span>
                                {``}
                            </h2>
                            <h1 className=" text-base text-custom-blue border-2 border-black p-2 rounded-lg">

                                <span className="font-bold"> 12/12/2022 </span>
                                {``}
                            </h1>
                        </div>

                        <div className="w-10 h-10 bg-green-500 rounded-full overflow-hidden border border-gray-300">

                        </div>
                    </div>
                   
                </div>
            </Link>
        </>
    );
};

export default Card;