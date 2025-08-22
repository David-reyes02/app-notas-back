import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error("No se encontró la variable MONGODB_URI en .env");
    }

    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectada en: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
