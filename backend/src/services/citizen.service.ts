import { encryptPassword, paginate } from "./../utils/helpers";
import IUser from "../interfaces/user.interface";
import CitizenModel from "../models/citizen.model";
import OfficialModel from "../models/official.model";

export class CitizenService {
	async registerCitizen(data: Partial<IUser>) {
		// Logic to register a new citizen in the database
		const { username, firstName, lastName, email, password } = data;
		const encryptedPassword = await encryptPassword(password as string);
		return await CitizenModel.create({
			username,
			firstName,
			lastName,
			email,
			password: encryptedPassword,
		});
	}
    async getCitizenByEmail(email: string) {
        // Logic to fetch citizen by email from the database
        return await CitizenModel.findOne({ email, role: "CITIZEN" });
    }
    
	async getCitizenDetails(email: string, userId: string) {
		// Logic to fetch citizen details from the database
		return await CitizenModel.findOne({ email, _id: userId, role: "CITIZEN" });
	}

	async updateCitizenDetails(
		email: string,
		userId: string,
		role: String,
		data: Partial<IUser>
	) {
		// Logic to update citizen details in the database
		return await CitizenModel.findOneAndUpdate(
			{ email, _id: userId, role },
			data,
			{ new: true, runValidators: true } // Return the updated document and run validators
		);
	}

	async deleteCitizen(email: string, userId: string, role: String) {
		// Logic to delete a citizen from the database
		return await CitizenModel.findOneAndDelete({
			email,
			_id: userId,
			role,
		});
	}

}
