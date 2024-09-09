// /controllers/logistics_controller.js
const Truck = require('../models/Truck');
const Delivery = require('../models/Delivery');

const addTruck = async (req, res) => {
    const { licensePlate, type, capacity } = req.body;

    try {
        const truck = new Truck({ licensePlate, type, capacity });
        await truck.save();
        res.status(201).send({ message: 'Truck added successfully', truck });
    } catch (error) {
        res.status(500).send({ message: 'Error adding truck', error });
    }
};

const scheduleDelivery = async (req, res) => {
    const { truckId, origin, destination, departureDate, expectedDeliveryDate } = req.body;

    try {
        const truck = await Truck.findById(truckId);
        if (!truck || truck.status !== 'idle') {
            return res.status(400).send({ message: 'Truck not available for delivery' });
        }

        const delivery = new Delivery({
            truck: truckId,
            origin,
            destination,
            departureDate,
            expectedDeliveryDate
        });

        truck.status = 'on delivery';
        await truck.save();
        await delivery.save();

        res.status(201).send({ message: 'Delivery scheduled successfully', delivery });
    } catch (error) {
        res.status(500).send({ message: 'Error scheduling delivery', error });
    }
};

const updateDeliveryStatus = async (req, res) => {
    const { deliveryId, newStatus, actualDeliveryDate } = req.body;

    try {
        const delivery = await Delivery.findById(deliveryId);
        if (!delivery) return res.status(404).send({ message: 'Delivery not found' });

        delivery.deliveryStatus = newStatus;
        if (newStatus === 'delivered' && actualDeliveryDate) {
            delivery.actualDeliveryDate = actualDeliveryDate;
        }

        await delivery.save();

        // Update truck status after delivery
        const truck = await Truck.findById(delivery.truck);
        if (newStatus === 'delivered') {
            truck.status = 'idle';
        }
        await truck.save();

        res.status(200).send({ message: 'Delivery status updated successfully', delivery });
    } catch (error) {
        res.status(500).send({ message: 'Error updating delivery status', error });
    }
};

const logisticsSummary = async (req, res) => {
    try {
        const trucksOnDelivery = await Truck.countDocuments({ status: 'on delivery' });
        const trucksDelivered = await Truck.countDocuments({ status: 'delivered' });
        const trucksIdle = await Truck.countDocuments({ status: 'idle' });

        const summary = {
            trucksOnDelivery,
            trucksDelivered,
            trucksIdle
        };

        res.status(200).send({ message: 'Logistics summary', summary });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching logistics summary', error });
    }
};

module.exports = { addTruck, scheduleDelivery, updateDeliveryStatus, logisticsSummary };
