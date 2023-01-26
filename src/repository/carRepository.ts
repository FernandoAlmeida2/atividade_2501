import prisma from "../config/database.js";

function getCars() {
  return prisma.cars.findMany();
}

function getCar(id: number) {
  return prisma.cars.findUnique({ where: { id } });
}

function getCarWithLicensePlate(licensePlate: string) {
  return prisma.cars.findUnique({ where: { licensePlate } });
}

async function createCar(
  model: string,
  licensePlate: string,
  year: string,
  color: string
) {
  await prisma.cars.create({ data: { model, licensePlate, year, color } });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({ where: { id } });
}

async function updateCar(
  id: number,
  model: string,
  licensePlate: string,
  year: string,
  color: string
) {
  await prisma.cars.update({
    where: { id },
    data: { model, licensePlate, year, color },
  });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
  updateCar,
};

export default carRepository;
