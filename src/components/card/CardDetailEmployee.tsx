import { MdCancel } from "react-icons/md";
import { Employee } from "../../interface/employee";
import { format } from "date-fns";

interface CardsProps {
  setAction: (value: string | null) => void
  employee: Employee | null
}

export const CardDetailEmployee = ({
  employee,
  setAction,
}: CardsProps) => {
  // Verificar si employee es null y proporcionar un valor predeterminado
  const validateEmployee = employee || {
    id: '',
    first_last_name: '',
    second_last_name: '',
    first_name: '',
    other_names: '',
    country: '',
    id_type: '',
    id_number: '',
    email: '',
    entry_date: '',
    area: '',
    status: '',
    registration_date: '',
    created_at: '',
    updated_at: '',
  };

  const formatDate = (dateString: string) => {
    const formattedDate = format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
    return formattedDate;
  };

  const  {
    first_name,
    first_last_name,
    area,
    country,
    email,
    entry_date,
    status,
    registration_date,
    id_number,
    id_type,
    other_names,
    second_last_name,
    created_at,
    updated_at
  } = validateEmployee;

  const ListEmployee = [
    {
      label: 'Nombre',
      value: `${first_name} ${other_names} ${first_last_name} ${second_last_name}`,
    },
    {
      label: 'Área',
      value: area,
    },
    {
      label: 'País',
      value: country,
    },
    {
      label: 'Correo',
      value: email.toLowerCase(),
    },
    {
      label: 'Fecha de Entrada',
      value: formatDate(entry_date),
    },
    {
      label: 'Fecha de Registro',
      value: registration_date && formatDate(registration_date),
    },
    {
      label: 'Tipo de Identificacion',
      value: id_type,
    },
    {
      label: 'Numero de Identificacion',
      value: id_number,
    },
    {
      label: 'Fecha de Creacion',
      value: created_at && formatDate(created_at),
    },
    {
      label: 'Fecha de actualizacion',
      value: updated_at && formatDate(updated_at),
    },
    {
      label: 'Estado',
      value: status,
    },
  ];

  return (
    <div className="bg-[#131313] min-w-[40rem] p-4 rounded-lg w-[20rem]">
      <div className="flex items-center justify-between text-green-500">
        <h1 className="text-2xl font-bold mb-4">Detalles del empleado</h1>
        <MdCancel
          size={25}
          className="mb-4 cursor-pointer hover:opacity-60 "
          onClick={() => setAction(null)}
        />
      </div>

      {/* Usar las variables desestructuradas para mostrar la información */}
      {ListEmployee.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-lg my-2">
          <h1 className="text-white opacity-45">{item.label}:</h1>
          <p className={`${item.value === 'Active' ? " bg-green-200 bg-opacity-20 px-3 font-semibold rounded-md text-green-500" : "text-white p-2 bg-opacity-20 rounded-lg my-1 bg-green-200"}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};