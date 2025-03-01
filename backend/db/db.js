import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Databse connected successfully')
  } catch (error) {
    console.log('Error while connecting to the DB')
  }
}

export default connectDb
