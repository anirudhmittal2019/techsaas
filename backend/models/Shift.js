// /models/Shift.js
const shiftSchema = new mongoose.Schema({
    laborGroup: { type: String, required: true }, // labor position (e.g., 'technician', 'operator')
    date: { type: Date, required: true },
    shiftHours: { type: String, required: true }, // e.g., '9am - 5pm'
    assignedLabor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Labor' }],  // Assigned laborers
    notificationsSent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Shift', shiftSchema);