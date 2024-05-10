export interface Employee {
  id?: number;
  first_last_name: string;
  second_last_name: string;
  first_name: string;
  other_names: string;
  country: string;
  id_type: string;
  id_number: string;
  email: string;
  entry_date: string;
  area: string;
  status: string;
  registration_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CardsProps {
  setAction: (value: string | null) => void
  action: string;
  employee: Employee | null
  updateEmployees: () => void
}