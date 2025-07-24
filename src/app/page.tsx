import { getCars } from "@/api/cars";
import { CarList } from "@/components/carList";



export const revalidate = 60;

export default async function HomePage() {
  const cars = await getCars();       
  return <CarList cars={cars} />;
}