"use strict";
const IMAGE_FOLDER = '../images/';
const DEFAULT_CAR_ID = 'bmw';
const DAILY_RENTAL_DAYS = 5;
const WEEKLY_RENTAL_DAYS = 7;
const PICKUP_HOUR = 10;
const INSURANCE_COST = 50;
const DELIVERY_COST = 25;
const CURRENCY_SYMBOL = '€';
const PERIOD_LABELS = { day: 'día', week: 'semana' };
const RESERVATION_CONFIRMATION_MESSAGE = '¡Reserva confirmada! Te hemos enviado un email con los detalles.';
const CAR_CATALOG = {
    'audi': { name: 'Audi A8', price: 140, period: 'day', image: 'audi.jpg', alt: 'Audi A8, sedán de lujo', seats: '5 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'bmw': { name: 'BMW Serie 7', price: 150, period: 'day', image: 'bmw.jpg', alt: 'BMW Serie 7, sedán de lujo', seats: '5 Asientos', transmission: 'Automático', fuel: 'Diesel' },
    'mercedes': { name: 'Mercedes-Benz Clase S', price: 160, period: 'day', image: 'FotoMercedes.jpg', alt: 'Mercedes-Benz Clase S, sedán de lujo', seats: '5 Asientos', transmission: 'Automático', fuel: 'Híbrido' },
    'ferrari': { name: 'Ferrari F8 Tributo', price: 450, period: 'day', image: 'Ferrari.jpg', alt: 'Ferrari F8 Tributo, superdeportivo italiano', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'toyota': { name: 'Toyota Supra GR', price: 120, period: 'day', image: 'toyota.jpg', alt: 'Toyota Supra GR, deportivo japonés', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'jeep': { name: 'Jeep Grand Cherokee', price: 650, period: 'week', image: 'jeep.jpg', alt: 'Jeep Grand Cherokee, SUV todoterreno', seats: '5 Asientos', transmission: 'Automático', fuel: 'Diesel' },
    'tesla': { name: 'Tesla Model X', price: 800, period: 'week', image: 'tesla.jpg', alt: 'Tesla Model X, SUV eléctrico', seats: '5 Asientos', transmission: 'Automático', fuel: 'Eléctrico' },
    'porsche': { name: 'Porsche 911 Turbo S', price: 350, period: 'day', image: 'porsche.jpg', alt: 'Porsche 911 Turbo S, deportivo alemán', seats: '2+2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'range-rover': { name: 'Range Rover Sport', price: 180, period: 'day', image: 'rangerover.jpg', alt: 'Range Rover Sport, SUV de lujo', seats: '5 Asientos', transmission: 'Automático', fuel: 'Diesel' },
    'lamborghini': { name: 'Lamborghini Huracán', price: 550, period: 'day', image: 'lamborghini.jpg', alt: 'Lamborghini Huracán, superdeportivo italiano', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'lexus': { name: 'Lexus LC 500', price: 220, period: 'day', image: 'lexus.jpg', alt: 'Lexus LC 500, coupé deportivo de lujo', seats: '2+2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'amg': { name: 'Mercedes-AMG GT', price: 280, period: 'day', image: 'amg.jpg', alt: 'Mercedes-AMG GT, deportivo gran turismo', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'bmw-i8': { name: 'BMW i8', price: 250, period: 'day', image: 'bmwi8.jpg', alt: 'BMW i8, deportivo híbrido', seats: '2+2 Asientos', transmission: 'Automático', fuel: 'Híbrido' },
    'audi-r8': { name: 'Audi R8 V10', price: 380, period: 'day', image: 'audir8.jpg', alt: 'Audi R8 V10, superdeportivo', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'volvo': { name: 'Volvo XC90 Excellence', price: 170, period: 'day', image: 'volvo.jpg', alt: 'Volvo XC90 Excellence, SUV familiar de lujo', seats: '4 Asientos', transmission: 'Automático', fuel: 'Híbrido' },
    'mclaren': { name: 'McLaren 720S', price: 600, period: 'day', image: 'mclaren.jpg', alt: 'McLaren 720S, superdeportivo', seats: '2 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
    'mustang': { name: 'Ford Mustang Shelby GT500', price: 200, period: 'day', image: 'mustang.jpg', alt: 'Ford Mustang Shelby GT500, muscle car americano', seats: '4 Asientos', transmission: 'Automático', fuel: 'Gasolina' },
};
const formatPrice = (amount) => `${CURRENCY_SYMBOL}${amount}`;
const formatCarPrice = (car) => `${formatPrice(car.price)}/${PERIOD_LABELS[car.period]}`;
const getRentalDays = (car) => (car.period === 'week' ? WEEKLY_RENTAL_DAYS : DAILY_RENTAL_DAYS);
const calculateRentalCost = (car) => (car.period === 'week' ? car.price : car.price * DAILY_RENTAL_DAYS);
const calculateTotalCost = (car) => calculateRentalCost(car) + INSURANCE_COST + DELIVERY_COST;
const getSelectedCarId = () => new URLSearchParams(window.location.search).get('car');
const findCar = (carId) => carId !== null && Object.hasOwn(CAR_CATALOG, carId) ? CAR_CATALOG[carId] : CAR_CATALOG[DEFAULT_CAR_ID];
const setText = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
};
const createFeatureItem = (featureText) => {
    const featureItem = document.createElement('li');
    featureItem.textContent = featureText;
    return featureItem;
};
const renderCarImage = (car) => {
    const carImage = document.getElementById('selected-car-image');
    if (!carImage)
        return;
    carImage.src = `${IMAGE_FOLDER}${car.image}`;
    carImage.alt = car.alt;
};
const renderCarFeatures = (car) => {
    const featuresList = document.getElementById('selected-car-features');
    if (!featuresList)
        return;
    const featureItems = [car.seats, car.transmission, car.fuel].map(createFeatureItem);
    featuresList.replaceChildren(...featureItems);
};
const renderSelectedCar = (car) => {
    setText('selected-car-name', car.name);
    setText('selected-car-price', formatCarPrice(car));
    renderCarImage(car);
    renderCarFeatures(car);
};
const getPickupDate = () => {
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 1);
    pickupDate.setHours(PICKUP_HOUR, 0, 0, 0);
    return pickupDate;
};
const addDays = (date, days) => {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + days);
    return resultDate;
};
const formatDateTime = (date) => date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});
const renderRentalDates = (car) => {
    const rentalDays = getRentalDays(car);
    const pickupDate = getPickupDate();
    setText('pickup-date', formatDateTime(pickupDate));
    setText('return-date', formatDateTime(addDays(pickupDate, rentalDays)));
    setText('rental-duration', `${rentalDays} días`);
};
const renderPriceSummary = (car) => {
    setText('rental-label', `Alquiler (${getRentalDays(car)} días)`);
    setText('rental-cost', formatPrice(calculateRentalCost(car)));
    setText('insurance-cost', formatPrice(INSURANCE_COST));
    setText('delivery-cost', formatPrice(DELIVERY_COST));
    setText('total-cost', formatPrice(calculateTotalCost(car)));
};
const handleReservationSubmit = (event) => {
    event.preventDefault();
    // Here the reservation data would normally be sent to a server.
    alert(RESERVATION_CONFIRMATION_MESSAGE);
};
const initReservationPage = () => {
    const selectedCar = findCar(getSelectedCarId());
    renderSelectedCar(selectedCar);
    renderRentalDates(selectedCar);
    renderPriceSummary(selectedCar);
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
};
document.addEventListener('DOMContentLoaded', initReservationPage);
//# sourceMappingURL=reservation.js.map