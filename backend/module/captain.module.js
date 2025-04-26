import captainModel from '../model/captain.model.js'

export const registerCpatinModule = async (reqbody) => {
    try {
        const { fullName, email, vehicle } = reqbody
        const isCaptainExsists = await captainModel.findOne({ email })
        if (isCaptainExsists) {
            throw Error("Captain already exsists")
        }

        const firstName = fullName.firstName
        const lastName = fullName.lastName || ""
        const color = vehicle.color
        const registrationNumber = vehicle.registrationNumber
        const seatingCapacity = vehicle.seatingCapacity
        const typeOfVehicle = vehicle.typeOfVehicle
        let password = reqbody.password
        if (!fullName || !firstName || !color || !registrationNumber
            || !seatingCapacity || !typeOfVehicle) {
            throw Error('All the fields are required')
        }
        password = await captainModel.hashPassword(password)
        const captain = await captainModel.create({
            fullName: {
                firstName, lastName
            },
            vehicle: {
                color,
                registrationNumber,
                seatingCapacity,
                typeOfVehicle,
            },
            email,
            password
        })

        const token = captain.generateAuthToken()
        return { captain, token }
    } catch (error) {
        throw error
    }
}

