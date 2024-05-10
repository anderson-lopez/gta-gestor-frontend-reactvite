import { useState, useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { getEmployees } from "./services/employee";
import { ListEmployee } from "./components/list/ListEmployee";
import { Employee } from "./interface/employee";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const [listEmployees, setListEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setListEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = listEmployees.filter((employee) =>
    `${employee.first_name} ${employee.first_last_name} ${employee.area} ${employee.id_type} ${employee.email} ${employee.country} ${employee.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <ListEmployee listEmployees={filteredEmployees} updateEmployees={fetchEmployees} />
    </Layout>
  );
}

export default App;