const express = require("express");
const dotenv = require("dotenv");
const mongooseDB = require("./config/connectDB");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const app = express();
const port = 7000;
const cors = require("cors");


const corsOptions = {
  origin: [
    'https://task-management-frontend-jade.vercel.app',
    'https://task-management-frontend-jade.vercel.app/' // Both variants
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ]
}



app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    console.log('CORS Error:', err.message);
    return res.status(403).json({ error: 'CORS Error' });
  }
  next();
});

app.use(cors(corsOptions));



dotenv.config();



app.options('*', cors()) 

mongooseDB();
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
