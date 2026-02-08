require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); 
const userRoutes = require('./routes/userRoutes'); 

// Future route imports
// const billRoutes = require('./routes/billRoutes');
// const complaintRoutes = require('./routes/complaintRoutes');
// const statsRoutes = require('./routes/statsRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;


// 1. MIDDLEWARE
app.use(cors());
// Built-in middleware to parse JSON bodies from incoming requests
app.use(express.json());

// 2. TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Society Management API is running...' });
});

// 3. ROUTES (We will add these next)
app.use('/api/users', userRoutes);
// Future routes
// app.use('/api/bills', billRoutes); 
// app.use('/api/complaints', complaintRoutes);
// app.use('/api/stats', statsRoutes); 
// app.use('/api/notices', require('./routes/noticeRoutes'));

// 4. DATABASE SYNC & SERVER START
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect/sync to the database:', err);
    process.exit(1); 
  });