import mongoose from "mongoose"

//connect to MongoDB database

export const connectDB = async (URI) => {

	try {
			await mongoose.connect(URI)
			console.log("MongoDB connected!")

		} catch (error) {

			console.log("Error connecting to MongoDB.", error)

			// End server and exit with failure if MongoDB connection failed.
			process.exit(1)
			
		}
	}