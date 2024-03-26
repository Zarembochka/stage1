import { Car } from "../view/utils/interfaces";

const carNames = [
    {
        brand: "Tesla",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Scoda",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Ford",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Reno",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "BMW",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Fiat",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Porshe",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Mersedes",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Toyota",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
    {
        brand: "Seat",
        models: ["Model1", "Model2", "Model3", "Model4", "Model5", "Model6", "Model7", "Model8", "Model9", "Model10"],
    },
];

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
}

function getRandomTitle(): string {
    const randomBrand = carNames[getRandomNumber(carNames.length)];
    const randomModel = randomBrand.models[getRandomNumber(randomBrand.models.length)];
    return randomBrand.brand.concat(" ", randomModel);
}

function getRandomColor(): string {
    const red = getRandomNumber(256).toString(16);
    const green = getRandomNumber(256).toString(16);
    const blue = getRandomNumber(256).toString(16);
    return `#${red}${green}${blue}`;
}

export function getRandomCar(): Car {
    const name = getRandomTitle();
    const color = getRandomColor();
    return { name: name, color: color };
}
