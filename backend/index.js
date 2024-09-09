require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connectDB } = require('./config/db');
const industryRoutes = require('./routes/industry_routes');

// Initialize app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Routes
app.use('/api/industry', industryRoutes);

// Serve uploaded files (PAN card photos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const industryRoutes = require('./routes/industry_routes');
const chatRoutes = require('./routes/chat_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/industry', industryRoutes);
app.use('/api/chat', chatRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const supplyChainRoutes = require('./routes/supply_chain_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/supply-chain', supplyChainRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const laborRoutes = require('./routes/labor_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Labor Routes
app.use('/api/labor', laborRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const paymentsRoutes = require('./routes/payments_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Payments Routes
app.use('/api/payments', paymentsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const logisticsRoutes = require('./routes/logistics_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Logistics Routes
app.use('/api/logistics', logisticsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const digitalAgentRoutes = require('./routes/digital_agent_routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// Digital Agent System Routes
app.use('/api/digital-agent', digitalAgentRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
