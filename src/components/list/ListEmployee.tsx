import { useState } from 'react';
import { Employee } from '../../interface/employee';
import { CardEmployees } from '../card/CardEmployees';
import { FormEmployee } from '../form/FormEmployee'; // Importa el componente de formulario
import { CardDetailEmployee } from '../card/CardDetailEmployee';
import { deleteEmployees } from '../../services/employee';

export const ListEmployee = ({ listEmployees, updateEmployees }: { listEmployees: Employee[], updateEmployees: () => void }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [action, setAction] = useState<string | null>(null); 

  const handleAction = async (action: string, employee: Employee | null) => {
    setAction(action);
    setSelectedEmployee(employee);
    if(action === 'delete'){
      await deleteEmployees(employee?.id, employee?.first_name,updateEmployees )
    }
    
  };

  const handleFilterAction = () => {
    if(action === 'edit' || action === 'create'){
      return <FormEmployee action={action} setAction={setAction} employee={selectedEmployee} updateEmployees={updateEmployees} />
    }
    if(action === 'more'){
      return <CardDetailEmployee setAction={setAction} employee={selectedEmployee}/>
    }
    return listEmployees.map((employee) => (<CardEmployees key={employee.id} action={handleAction} employee={employee} />))
  }

  return (
    <div className="flex flex-wrap justify-center">
      {handleFilterAction()}
      <button
        onClick={() => handleAction('create', null)}
        className={`absolute bg-green-500 p-4 rounded-md font-bold hover:opacity-60 bottom-8 right-8 ${action === null ? "flex" : "hidden"}`}
      >
        Crear Empleado
      </button>
    </div>
  );
};