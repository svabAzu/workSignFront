import React, { useEffect, useState } from "react";
import { useGeneralTask } from "../context/GeneralTaskContext";




export const SpecialtyPages: React.FC = () => {
  
  const [newSpecialty, setNewSpecialty] = useState<string>("");
  const { getSpecialties, specialties, addSpecialty, updateSpecialty, deleteSpecialty} = useGeneralTask();

  useEffect(() => {
    getSpecialties
  }, []);
  
  const handleAddSpecialty = async () => {
    console.log(newSpecialty);
  }
   const handleUpdateSpecialty = async () => {
    console.log();
  }
   const handleDeleteSpecialty = async () => {
    console.log();
  }
   

  
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-green-600 font-bold text-xl sm:text-2xl mb-6 uppercase tracking-wide text-center sm:text-left">Modificar Especialidad</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Nueva especialidad"
          value={newSpecialty}
          onChange={(e) => setNewSpecialty(e.target.value)}
        />
        <button
          className="bg-[#199431] hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded"
          onClick={handleAddSpecialty}
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {specialties.map((specialty) => (
          <li
            key={specialty.name}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{specialty.name}</span>
            <div className="flex gap-2">
              <button
                className="bg-[#FFC107] hover:bg-amber-500 cursor-pointer text-white px-2 py-1 rounded"
                onClick={() => handleUpdateSpecialty}
              >
                Editar
              </button>
              <button
                className="bg-[#DC3545]  hover:bg-red-700 cursor-pointer text-white px-2 py-1 rounded"
                onClick={() => handleDeleteSpecialty}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


