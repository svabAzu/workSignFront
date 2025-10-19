import React, { useEffect, useState } from "react";
import { useGeneralTask } from "../context/GeneralTaskContext";

// Componente para un solo ítem de especialidad
const SpecialtyItem = ({
  specialty,
  onUpdate,
}: {
  specialty: Specialty;
  onUpdate: (id: number, name: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(specialty.name);

  const handleUpdate = () => {
    if (specialty.ID_specialty) {
      onUpdate(specialty.ID_specialty, name);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 rounded-md w-0 grow mr-2"
        />
      ) : (
        <p className="font-semibold truncate">{specialty.name}</p>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-[#199431] text-white hover:bg-[#ADC708] hover:text-black px-3 py-1 rounded-md"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#FFC107] text-black px-3 py-1 rounded-md"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
};


export const SpecialtyPages: React.FC = () => {
  const [newSpecialty, setNewSpecialty] = useState("");
  const { getSpecialties, specialties, addSpecialty, updateSpecialty } =
    useGeneralTask();

  useEffect(() => {
    getSpecialties();
  }, []);

  const handleAddSpecialty = async () => {
    if (newSpecialty.trim()) {
      await addSpecialty({ name: newSpecialty.trim() });
      setNewSpecialty("");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl uppercase tracking-wide mb-4">
        MODIFICAR ESPECIALIDADES:
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-6 justify-between">
        <span className="text-gray-700">Agrega una nueva especialidad para el taller: </span>
        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          <button
            onClick={handleAddSpecialty}
            className="bg-[#199431] hover:bg-[#ADC708] hover:text-black text-white text-2xl px-4 py-1"
          >
            +
          </button>
          <input
            type="text"
            placeholder="Nueva especialidad"
            value={newSpecialty}
            onChange={(e) => setNewSpecialty(e.target.value)}
            className="px-3 py-2 outline-none border-l w-56 sm:w-72"
          />
        </div>
      </div>

      <hr className="border-gray-300 mb-4" />
      <p className="text-gray-700 font-medium mb-2">Especialidades activas:</p>

      {/* ✅ Grilla responsive y eficiente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties.map((specialty, index) => (
          <SpecialtyItem
            key={specialty.ID_specialty ?? index}
            specialty={specialty}
            onUpdate={(id, name) => updateSpecialty(id, { name })}
          />
        ))}
      </div>
    </div>
  );
};