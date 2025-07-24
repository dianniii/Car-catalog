'use client';

import { Car } from '@/api/types';
import { Button } from '@/components/ui/button';
import { useCars } from '@/hooks/useCars';
import dynamic from 'next/dynamic';
import { Input } from './ui/input';
import { useSearchCars } from '@/hooks/useSearchCars';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction
} from '@/components/ui/card';

// машины в маркеры для карты
const MapWithNoSSR = dynamic(
  () => import('@/components/carsMap'),
  { ssr: false }
)

export function CarList({ cars: initialCars }: { cars: Car[] }) {
  const {
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
  } = useCars(initialCars);

    const {
    searchQuery,
    setSearchQuery,
    filteredCars,
    carMarkers
  } = useSearchCars(cars);


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Поле поиска */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search cars by name, model, year, price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Кнопки сортировки */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => sortCars('year')}
            className="flex items-center gap-2"
          >
            Sort by Year
            {sortConfig?.field === 'year' && (
              <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => sortCars('price')}
            className="flex items-center gap-2"
          >
            Sort by Price
            {sortConfig?.field === 'price' && (
              <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Карта с авто */}
      <div className="mb-8 h-96 w-full rounded-lg overflow-hidden shadow-md">
        <MapWithNoSSR markers={carMarkers} />
      </div>

      {/* Счетчик найденных автомобилей */}
      {searchQuery && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {filteredCars.length} cars matching your search
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map(car => (
          <Card key={car.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            {/* Остальное содержимое карточки остается без изменений */}
            <CardHeader>
              <CardTitle className="text-xl">
                {editingId === car.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded mb-2"
                    placeholder="Car name"
                  />
                ) : (
                  car.name
                )}
              </CardTitle>
              <CardDescription>
                {editingId === car.id ? (
                  <input
                    type="text"
                    name="model"
                    value={editForm.model || ''}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Model"
                  />
                ) : (
                  <>
                    <div className="font-medium">{car.model}</div>
                    <div>{car.year} • {car.color}</div>
                  </>
                )}
              </CardDescription>
              {editingId === car.id && (
                <CardAction>
                  <Button 
                    size="sm" 
                    onClick={() => handleSave(car.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </CardAction>
              )}
            </CardHeader>

            <CardContent className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                {editingId === car.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editForm.price || ''}
                    onChange={handleChange}
                    className="w-24 px-2 py-1 border rounded"
                    min="0"
                  />
                ) : (
                  <span className="font-medium">
                    ${car.price.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">
                  {car.latitude.toFixed(2)}, {car.longitude.toFixed(2)}
                </span>
              </div>
            </CardContent>

            <CardFooter className="border-t flex gap-2">
              {editingId === car.id ? (
                <Button 
                  variant="outline" 
                  onClick={() => setEditingId(null)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => handleEdit(car)}
                    className="flex-1"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(car.id)}
                    className="flex-1"
                    variant="destructive"
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}