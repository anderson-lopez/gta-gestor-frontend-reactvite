import { useState } from 'react';
import { CardsProps, Employee } from '../../interface/employee';
import { MdCancel } from 'react-icons/md';
import { postEmployees, putEmployees } from '../../services/employee';

export const FormEmployee = ({ action, employee, setAction, updateEmployees }: CardsProps) => {
  const [formData, setFormData] = useState<Employee>(employee ?  employee : {
    first_name: '',
    first_last_name: '',
    second_last_name: '',
    other_names: '',
    country: '',
    id_type: '',
    id_number: '',
    email: '',
    entry_date: '',
    area: '',
    status: 'Active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  

    let normalizedValue = value;
    if (name === 'first_name' || name === 'first_last_name' || name === 'second_last_name' || name === 'other_names') {
      normalizedValue = value.toUpperCase().replace(/\s+/g, '');
    } else if (name === 'id_type') {
      normalizedValue = value;
    }
  

    if (name === 'country' || name === 'first_name' || name === 'first_last_name') {
      const countryValidation = value === 'Colombia' ? '@global.com.co' : '@global.com.us';
      const email = formData.first_name.toUpperCase().replace(/\s+/g, '') + '.' + formData.first_last_name.toUpperCase().replace(/\s+/g, '') + countryValidation;
      setFormData({ ...formData, [name]: value, email: email });
    } else {
      setFormData({ ...formData, [name]: normalizedValue });
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === 'create') {
      await postEmployees(formData, setAction, updateEmployees)
    } else if (action === 'edit') {
      await putEmployees(formData, employee?.id, setAction, updateEmployees)
    }
  };

  return (
    <div className=" w-full h-full flex justify-center items-center p-4 rounded-lg">
      <div className="w-[40rem] bg-[#131313] p-6 rounded-lg">
        <div className="flex items-center justify-between text-green-500">
          <h1 className="text-2xl font-bold mb-4">
            {action === "create" ? "Crear Empleado" : "Editar Empleado"}
          </h1>
          <MdCancel
            size={25}
            className="mb-4 cursor-pointer hover:opacity-60 "
            onClick={() => setAction(null)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[35rem] overflow-auto">
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Nombre
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="first_last_name"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Primer Apellido
              </label>
              <input
                type="text"
                id="first_last_name"
                name="first_last_name"
                value={formData.first_last_name}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="second_last_name"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Segundo Apellido
              </label>
              <input
                type="text"
                id="second_last_name"
                name="second_last_name"
                value={formData.second_last_name}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="other_names"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Otros Nombres
              </label>
              <input
                type="text"
                id="other_names"
                name="other_names"
                value={formData.other_names}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                País del Empleo
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-500  py-3 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              >
                <option value="">Seleccione un país</option>
                <option value="Colombia">Colombia</option>
                <option value="United States">Estados Unidos</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Tipo de Identificación
              </label>
              <select
                id="id_type"
                name="id_type"
                value={formData.id_type}
                onChange={handleChange}
                className="border border-gray-500  py-3 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              >
                <option value="">Seleccione una Identificacion</option>
                <option value="Cedula de CIudadania">Cedula de CIudadania</option>
                <option value="Cedula de Extranjeria">Cedula de Extranjeria</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="id_number"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Número de Identificación
              </label>
              <input
                type="text"
                id="id_number"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="entry_date"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Fecha de Ingreso
              </label>
              <input
                type="date"
                id="entry_date"
                name="entry_date"
                value={formData.entry_date}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-sm font-semibold mb-1 text-white opacity-60"
              >
                Área
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5  dark:bg-[#0c0c0c] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white "
                required
              />
            </div>
          </div>
          <div className='flex w-full justify-center'>
            <button
              type="submit"
              className="bg-green-500 cursor-pointer w-[20rem] duration-300 hover:text-black text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
            >
              {action === "create" ? "Crear" : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};