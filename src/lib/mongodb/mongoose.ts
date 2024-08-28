import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const mongoURL = process.env.MONGODB_URL;

        if (!mongoURL) {
            throw new Error('MongoDB URL is not defined in environment variables');
        }

        await mongoose.connect(mongoURL, {
            dbName: 'Connect',
            // `useNewUrlParser` and `useUnifiedTopology` are defaults in recent Mongoose versions
        });

        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error:any) {
        console.error('Error connecting to MongoDB:', error.message);
        // Optionally, you might want to handle the error further, like sending alerts
    }
};
