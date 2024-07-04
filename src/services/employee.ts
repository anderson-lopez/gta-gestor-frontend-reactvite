import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Employee } from "../interface/employee";

/*eslint-disable*/

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const { data }: { data: Employee[] } = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees`);
    toast.success('data de empleados encontrada');
    return data;
  } catch (error) {
    console.log(error, 'aqui hay un error');
    return [];
  }
};

export const postEmployees = async (
  employee: Employee,
  action: (value: string | null) => void,
  refreshData: () => void
): Promise<Employee | null> => {
  try {
    const response: AxiosResponse<Employee> = await axios.post(`${import.meta.env.VITE_BASE_URL}/employees`, employee);
    const createdEmployee: Employee = response.data;
    action(null);
    refreshData();
    toast.success('Empleado creado exitosamente');
    return createdEmployee;
  } catch (error) {
    if (isAxiosError(error)) {
      //eslint-disable-next-line
      const axiosError: AxiosError<any> = error;
      console.error('Error al crear empleado:', axiosError.response?.data);
      if (axiosError.response?.data.errors?.id_number) {
        toast.error('Ya existe un empleado con este número de identificación');
      } else if (axiosError.response?.data.errors?.email) {
        toast.error('Ya existe un empleado con este correo electrónico');
      } else if (axiosError.response?.data.errors) {
        toast.error('Solo se permiten caracteres de la A a la Z, mayúsculas, sin acentos, ni Ñ');
      } else if (axiosError.response?.data.errors?.entry_date) {
        toast.error('La fecha de ingreso no puede ser superior a la fecha actual');
      } else {
        toast.error('Error al crear empleado');
      }
    } else {
      console.error('Error desconocido al crear empleado:', error);
      toast.error('Error al crear empleado');
    }
    return null;
  }
};

// Función para verificar si el error es de tipo AxiosError
const isAxiosError = (error: unknown): error is AxiosError<any> => {
  return (error as AxiosError<any>).isAxiosError !== undefined;
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
    if (isAxiosError(error)) {
      const axiosError: AxiosError<any> = error;
      console.error('Error al crear empleado:', axiosError.response?.data);
      if (axiosError.response?.data.errors?.id_number) {
        toast.error('Ya existe un empleado con este número de identificación');
      } else if (axiosError.response?.data.errors?.email) {
        toast.error('Ya existe un empleado con este correo electrónico');
      } else if (axiosError.response?.data.errors) {
        toast.error('Solo se permiten caracteres de la A a la Z, mayúsculas, sin acentos, ni Ñ');
      } else if (axiosError.response?.data.errors?.entry_date) {
        toast.error('La fecha de ingreso no puede ser superior a la fecha actual');
      } else {
        toast.error('Error al crear empleado');
      }
    } else {
      console.error('Error desconocido al crear empleado:', error);
      toast.error('Error al crear empleado');
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

/*eslint-enable*/