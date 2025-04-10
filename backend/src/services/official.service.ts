import IOfficial from "../interfaces/official.interface";
import OfficialModel from "../models/official.model";
import { CitizenService } from "./citizen.service";

export default class OfficialService {
	async registerOfficial(data: Partial<IOfficial>) {
		// Logic to register a new official in the database
		return await OfficialModel.create(data);
	}
	async getAllOfficialsDetails() {
		return await OfficialModel.find({ role: "OFFICIAL" });
	}

	async getOfficialByEmail(email: String, userId: String) {
		return await OfficialModel.findOne({
			email,
			_id: userId,
			role: "OFFICIAL",
		});
	}
	async updateOfficialDetails(
		email: String,
		userId: String,
		role: String,
		data: Partial<IOfficial>
	) {
		return await OfficialModel.findOneAndUpdate(
			{ email, _id: userId, role },
			data,
			{
				new: true,
				runValidators: true,
			}
		);
	}
	async deleteOfficial(email: String, userId: String, role: String) {
		return await OfficialModel.findOneAndDelete({ email, _id: userId, role });
	}
}
