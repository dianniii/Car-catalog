import { useState, useMemo } from 'react';
import { Car } from '@/api/types';
import { LatLngTuple } from 'leaflet';

export interface CarMarker {
  position: LatLngTuple;
  carInfo: string;
}

//функция поиска
export function useSearchCars(initialCars: Car[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = useMemo(() => {
    if (!searchQuery) return initialCars;

    const searchLower = searchQuery.toLowerCase();
    return initialCars.filter(car => {
      return (
        car.name.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower) ||
        car.color.toLowerCase().includes(searchLower) ||
        car.year.toString().includes(searchQuery) ||
        car.price.toString().includes(searchQuery)
      );
    });
  }, [initialCars, searchQuery]);

  const carMarkers = useMemo<CarMarker[]>(() => {
    return filteredCars.map(car => ({
      position: [car.latitude, car.longitude] as LatLngTuple,
      carInfo: `${car.name} ${car.model} (${car.year})`
    }));
  }, [filteredCars]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCars,
    carMarkers
  };
}