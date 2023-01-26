import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(
  model: string,
  licensePlate: string,
  year: string,
  color: string
) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car) {
    throw conflictError(
      `Car with license plate ${licensePlate} already registered.`
    );
  }

  await carRepository.createCar(model, licensePlate, year, color);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

async function updateCar(
  id: number,
  model: string,
  licensePlate: string,
  year: string,
  color: string
) {
  await getCar(id);
  await carRepository.updateCar(id, model, licensePlate, year, color);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};

export default carService;
