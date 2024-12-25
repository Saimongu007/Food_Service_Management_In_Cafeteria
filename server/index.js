import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import { createServer } from 'http';
import { User } from './models/User.js';
import cors from "cors"
dotenv.config();

const app = express();
const server = createServer(app);

// database connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected MongoDB DataBase")
  })
  .catch((err) => {
    console.log("Mongoose connection err : ", err);
  })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("req body : ", req.body);
    console.log(req.body)
    const user = await User.findOne({ email: email })

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already used"
      })
    }

    const newUser = await User.create(req.body);
    const userObject = newUser.toObject();
    userObject.password = null;

    return res.status(201).json({
      success: true,
      data: userObject
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
});
// app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
// app.use(
//   cors({
//     origin: 'http://localhost:5000',
//     methods: ['GET', 'POST'],
//   })
// );


let PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("Server is runnning on port", PORT);
})
