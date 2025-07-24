import { useState } from 'react';
import { Car, SortDirection, SortField } from '@/api/types';
import { deleteCar, updateCar } from '@/api/cars';


export function useCars(initialCars: Car[]) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Car>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  } | null>(null);

  //сортировка
  const sortCars = (field: SortField) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ field, direction });

    const sortedCars = [...cars].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setCars(sortedCars);
  };

  //редактирование
  const handleEdit = (car: Car) => {
    setEditingId(car.id);
    setEditForm({ name: car.name, model: car.model, price: car.price });
  };

  //изменение
  const handleSave = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCar = await updateCar(id, editForm);
      setCars(cars.map(car => car.id === id ? updatedCar : car));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update car');
    } finally {
      setIsLoading(false);
    }
  };

  //удаление
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete car');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  return {
    cars,
    editingId,
    editForm,
    isLoading,
    error,
    sortConfig,
    setEditingId,
    sortCars,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    setError
  };
}