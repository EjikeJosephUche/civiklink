import { paginate } from "./../utils/helpers";
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";

export class CitizenService {
	async getCitizenDetails(email: string) {
		// Logic to fetch citizen details from the database
		return await UserModel.findOne({ email, role: "CITIZEN" });
	}

	async updateCitizenDetails(
		email: string,
		userId: string,
		role: String,
		data: Partial<IUser>
	) {
		// Logic to update citizen details in the database
		return await UserModel.findOneAndUpdate(
			{ email, _id: userId, role },
			data,
			{ new: true, runValidators: true } // Return the updated document and run validators
		);
	}

	async deleteCitizen(email: string, userId: string, role: String) {
		// Logic to delete a citizen from the database
		return await UserModel.findOneAndDelete({
			email,
			_id: userId,
			role,
		});
	}

	async getAllOfficials(page: number, limit: number) {
		// Logic to fetch all officials from the database
		return await paginate(UserModel, page, limit, { role: "OFFICIAL" });
	}

	async getOfficialsBySearch(searchWord: string, page: number, limit: number) {
		// Logic to fetch officials by department from the database
		const query = {
			$or: [
				{ role: "OFFICIAL" },
				{ department: { $regex: searchWord, options: "i" } },
				{ name: { $regex: searchWord, options: "i" } },
			],
		};
		return await paginate(UserModel, page, limit, query);
	}
}
