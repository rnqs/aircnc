const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const PerfilController = require('./controllers/PerfilController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/perfil', PerfilController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/booking/:booking_id/approvals', ApprovalController.store);
routes.post('/booking/:booking_id/rejections', RejectionController.store);

module.exports = routes;