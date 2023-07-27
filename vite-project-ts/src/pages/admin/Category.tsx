import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import List from '../../components/List';
import { Category } from '../../interfaces/Category';

interface ApiResponse {
  success: boolean;
}

const Category = () => {
  const initialFormData = {
    nombre: '',
    apellidos: '',
    pais: '',
    imagen: null as File | null,
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null); // New state for tracking the category being edited

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data: Category[]) => { // Define el tipo de data como category[]
        setCategories(data); // Pasa el resultado de response.json() a setCategories
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0] || null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagen: imageFile,
    }));
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('apellidos', formData.apellidos);
    formDataToSend.append('pais', formData.pais);
    if (formData.imagen !== null) {
      formDataToSend.append('imagen', formData.imagen);
    }
    if (editingCategoryId !== null) {
      // Realizar la solicitud PUT al backend para editar el usuario
      fetch(`http://localhost:3000/categories/${editingCategoryId}`, {
        method: 'PUT',
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then(() => {
          setFormData(initialFormData);
          setEditingCategoryId(null);
          getCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Realizar la solicitud POST al backend para registrar el usuario
      fetch('http://localhost:3000/categories', {
        method: 'POST',
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then(() => {
          setFormData(initialFormData);
          getCategories();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEdit = (categoryId: number) => {
    const categoryToEdit = categories.find((category) => category.id === categoryId);
    if (categoryToEdit) {
      const { nombre, apellidos, pais } = categoryToEdit;
      setFormData((prevFormData) => ({
        ...prevFormData,
        nombre,
        apellidos,
        pais,
        imagen: null, // Aquí estableces la imagen en null, ya que no estás editando la imagen
      }));
      setEditingCategoryId(categoryId);
    }
  };

  const onDelete = (categoryId: number) => {
    fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => { // Especifica el tipo ApiResponse para data
        if (data.success) {
          // Eliminar el usuario del estado 'categories'
          setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
        }
      })
      .then(() => {
        getCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Generar las columnas de forma dinámica en función de los campos de usuario disponibles
  const columns = Object.keys(categories[0] || {}).map((field) => ({
    field,
    header: field.charAt(0).toUpperCase() + field.slice(1),
    // Propiedad render para personalizar la visualización del contenido de la imagen
    render: (rowData: { imagen: string | undefined; }) =>
      rowData.imagen ? (
        <img
          src={rowData.imagen}
          alt="Imagen"
          style={{ width: "8rem", borderRadius: "1rem" }}
        />
      ) : (
        "No imagen"
      ),
  }));

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>{editingCategoryId !== null ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
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
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*" // Acepta solo imágenes
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">{editingCategoryId !== null ? 'Editar' : 'Registrar'}</button>
      </form>
      <List
        data={categories}
        onClick={onDelete}
        onEdit={handleEdit}
        columns={columns}
        isCategory={false}
      />
    </div>
  )
}

export default Category;
