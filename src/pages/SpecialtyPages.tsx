import React, { useEffect, useState } from "react";
import { useGeneralTask } from "../context/GeneralTaskContext";

interface SpecialtyItemProps {
  specialty: { ID_specialty: number; name: string };
  onUpdate: (id: number, data: { name: string }) => Promise<void>;
}

// ✅ Subcomponente: cada fila maneja su propio estado
const SpecialtyItem = ({ specialty, onUpdate }: SpecialtyItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(specialty.name);

  const handleSave = async () => {
    if (value.trim() && value !== specialty.name) {
      await onUpdate(specialty.ID_specialty, { name: value.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between border rounded-full px-4 py-2 shadow-sm transition-all duration-200 ${
        isEditing ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded px-2 py-1 flex-1 mr-2 outline-none focus:ring-2 focus:ring-green-400"
        />
      ) : (
        <span className="text-gray-800 font-medium flex-1">{specialty.name}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setValue(specialty.name);
                setIsEditing(false);
              }}
              className="bg-gray-400 hover:bg-red-500 text-white px-3 py-1 rounded-full"
            >
              x
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded"
            >
              Editar
            </button>
          </>
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
      <h1 className="text-green-700 font-bold text-2xl uppercase tracking-wide mb-4">
        Modificar especialidad:
      </h1>

      <div className="flex flex-wrap items-center gap-3 mb-6 justify-between">
        <span className="text-gray-700">Agrega una nueva especialidad para el taller: </span>
        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          <button
            onClick={handleAddSpecialty}
            className="bg-green-600 hover:bg-green-700 text-white text-2xl px-4 py-1"
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
            onUpdate={updateSpecialty}
          />
        ))}
      </div>
    </div>
  );
};