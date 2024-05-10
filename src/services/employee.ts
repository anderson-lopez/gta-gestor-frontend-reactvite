import axios from "axios";
import toast from "react-hot-toast";
import { Employee } from "../interface/employee";

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const { data }: { data: Employee[] } = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees`);
    toast.success('data de empleados encontrada');
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postEmployees = async (employee: Employee, action: (value: string | null) => void, refreshData: () => void): Promise<Employee | null> => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/employees`, employee);
    const createdEmployee: Employee = response.data;
    action(null)
    refreshData()
    toast.success('Empleado creado exitosamente');
    return createdEmployee;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    if(error?.response.data.errors.id_number){
      toast.error('Hay un Usuario creado con este Numero de Identificacion')
    }
    if (error?.response.data.errors.email) {
      toast.error('Hay un Usuario creado con este Correo Electronico')
    }
    if (error?.response.data.errors) {
      toast.error('Solo se permite caracteres de la A a la Z, mayúsculas, sin Acentuaciones, ni Ñ')
    }
    if (error?.response.data.errors.entry_date) {
      toast.error('La fecha de ingreso no puede ser superior a la fecha actual')
    }
    return null;
  }
};

export const putEmployees = async (employee: Employee, id?: string | number | undefined, action?: (value: string | null) => void, refreshData?: () => void): Promise<Employee | null> => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/employees/${id}`, employee);
    const createdEmployee: Employee = response.data;
    action && action(null)
    refreshData && refreshData()
    toast.success('Empleado Actualizado exitosamente');
    return createdEmployee;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    if(error?.response.data.errors.id_number){
      toast.error('Hay un Usuario creado con este Numero de Identificacion')
    }
    if (error?.response.data.errors.email) {
      toast.error('Hay un Usuario creado con este Correo Electronico')
    }
    if (error?.response.data.errors) {
      toast.error('Solo se permite caracteres de la A a la Z, mayúsculas, sin Acentuaciones, ni Ñ')
    }
    if (error?.response.data.errors.entry_date) {
      toast.error('La fecha de ingreso no puede ser superior a la fecha actual')
    }
    if (error?.response.data.errors.id_number) {
      toast.error('El numero de identificacion no debe sobrepasar los 20 caracteres')
    }
    return null;
  }
};

export const deleteEmployees = async (id: string | number | undefined, name: string | number | undefined, refreshData?: () => void): Promise<Employee[]> => {
  try {
    const { data }: { data: Employee[] } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/employees/${id}`);
    toast.success(`El Empleado ${name} a sido Eliminado Exitosamente`);
    refreshData && refreshData()
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};