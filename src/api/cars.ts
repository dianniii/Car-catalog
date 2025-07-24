import { Car } from "@/api/types";

const API_BASE_URL = 'https://ofc-test-01.tspb.su/test-task';

export async function getCars (): Promise<Car[]>  {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
        cache: 'force-cache',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const data: Car[] = await response.json();
    return data;
}


export async function updateCar(id: number, data: Partial<Car>): Promise<Car> {
  const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update car');
  }
  return response.json();
}

//удаление машины
export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`https://ofc-test-01.tspb.su/test-task/vehicles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete car');
  }
}
