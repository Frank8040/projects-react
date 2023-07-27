import { useEffect, useState } from 'react';
import List from '../../components/List';
import { User } from '../../interfaces/User';

interface ApiResponse {
  success: boolean;
}

const User = () => {
  const initialFormData = {
    nombre: '',
    apellidos: '',
    pais: '',
  };

  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingUserId, setEditingUserId] = useState<number | null>(null); // New state for tracking the user being edited

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data: User[]) => { // Define el tipo de data como User[]
        setUsers(data); // Pasa el resultado de response.json() a setUsers
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUserId !== null) {
      // Realizar la solicitud PUT al backend para editar el usuario
      fetch(`http://localhost:3000/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setFormData(initialFormData);
          setEditingUserId(null);
          getUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Realizar la solicitud POST al backend para registrar el usuario
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setFormData(initialFormData);
          getUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEdit = (userId: number) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setFormData(userToEdit);
      setEditingUserId(userId);
    }
  };

  const onDelete = (userId: number) => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => { // Especifica el tipo ApiResponse para data
        if (data.success) {
          // Eliminar el usuario del estado 'users'
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        }
      })
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Generar las columnas de forma dinámica en función de los campos de usuario disponibles
  const columns = Object.keys(users[0] || {}).map((field) => ({
    field,
    header: field.charAt(0).toUpperCase() + field.slice(1)
  }));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingUserId !== null ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pais">País:</label>
          <input
            type="text"
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingUserId !== null ? 'Editar' : 'Registrar'}</button>
      </form>
      <List
        data={users}
        onClick={onDelete}
        onEdit={handleEdit}
        columns={columns}
        isCategory={false}
      />
    </div>
  )
}

export default User; 