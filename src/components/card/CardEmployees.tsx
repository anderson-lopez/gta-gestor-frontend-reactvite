import { MdDelete, MdMoreVert } from "react-icons/md";
import { Employee } from "../../interface/employee";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";

export const CardEmployees = ({ employee, action }: { employee: Employee, action: (id: string, employee: Employee ) => void }) => {
  const {
    first_name,
    area,
    country,
    email,
    entry_date,
    status,
    registration_date,
    first_last_name
  } = employee;

  const formatDate = (dateString: string) => {
    const formattedDate = format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
    return formattedDate;
  };

  const ListEmployee = [
    {
      label: 'Nombre',
      value: `${first_name} ${first_last_name}`,
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
      value: email,
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
      label: 'Estado',
      value: status,
    },
  ];

  const listButton = [
    {
      id: "more",
      icon: <MdMoreVert size={20} />,
      text: "Ver Mas",
      color: "bg-green-600 mr-2",
    },
    {
      id: "edit",
      icon: <FaEdit />,
      text: "Editar",
      color: "bg-yellow-500",
    },
    {
      id: "delete",
      icon: <MdDelete />,
      text: "Eliminar",
      color: "bg-red-500 ml-2",
    },
  ];

  return (
    <div className="bg-[#131313] min-w-[28rem] text-white p-7 m-4  rounded-lg">
      {ListEmployee.map((item, idx) => (
        <div key={idx} className="flex mb-2">
          <div className=" text-xl opacity-60">
            <h1>{item.label}:</h1>
          </div>
          <div className={`ml-2 text-lg ${item.value === 'Active' ? " bg-green-200 bg-opacity-20 px-3 font-semibold rounded-md text-green-500" : ""}`}>
            <h1>{item.value}</h1>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-8">
        {listButton.map((button) => (
          <button onClick={() => action(button.id, employee)} className={`${button.color} p-2 hover:opacity-60 duration-300 flex rounded-lg font-semibold items-center justify-center`} key={button.id}>
            {button.icon}
            <h1 className="ml-1">{button.text}</h1>
          </button>
        ))}
      </div>
    </div>
  );
};
