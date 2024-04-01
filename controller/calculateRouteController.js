// pathController.js

const Route = require('../model/routeModel');

class CalculateRouteController {
    constructor() {
        this.route = new Route();
        this.Route = this.route.getRouteModel();
        this.insertRoute = this.insertRoute.bind(this);
        this.getAllRoutes = this.getAllRoutes.bind(this);
    }

    async insertRoute(req, res) {
        if (!req.body || !req.body.start || !req.body.end || !req.body.profile ||
            !req.body.start.id || !req.body.start.title || !req.body.start.latLng ||
            !req.body.end.id || !req.body.end.title || !req.body.end.latLng ||
            !req.body.profile.difficulty) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid or incomplete request body', data: null });
        }

        const { start, end, profile } = req.body;

        if (typeof start.id !== 'number' || typeof start.title !== 'string' || !Array.isArray(start.latLng) || start.latLng.length !== 2 ||
            typeof end.id !== 'number' || typeof end.title !== 'string' || !Array.isArray(end.latLng) || end.latLng.length !== 2 ||
            typeof profile.difficulty !== 'string') {
            return res.status(400).json({ statusCode: 400, message: 'Invalid data format in request body', data: null });
        }

        const data = new this.Path({
            start: {
                id: start.id,
                title: start.title,
                latLng: start.latLng
            },
            end: {
                id: end.id,
                title: end.title,
                latLng: end.latLng
            },
            profile: {
                difficulty: profile.difficulty
            }
        });

        try {
            await data.save();
            return res.status(201).json({ statusCode: 201, message: 'Route selected successfully', data: data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }


    async getAllRoutes(req, res) {
        try {
            const routes = await this.Route.find();
            return res.status(200).json({ statusCode: 200, message: 'Routes retrieved successfully', data: routes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
        }
    }
}

module.exports = CalculateRouteController;

