import IOfficial from "../interfaces/official.interface";
import OfficialModel from "../models/official.model";
import { encryptPassword, paginate } from "../utils/helpers";

export default class OfficialService {
	async registerOfficial(data: Partial<IOfficial>) {
		// Logic to register a new official in the database
		const { name, email, password, description, position, department, contactInfo } = data;
		const encryptedPassword = await encryptPassword(password as string);
		return await OfficialModel.create({
			name,
            email,
			password: encryptedPassword,
            description,
            position,
            department,
            contactInfo,
		});
	}
	async getAllOfficials(page: number, limit: number) {
		// Logic to fetch all officials from the database
		return await paginate(OfficialModel, page, limit, { role: "OFFICIAL" });
	}

    async getOfficialDetails(email:string){
        // Logic to fetch official details from the database
        return await OfficialModel.findOne({ email, role: "OFFICIAL" });
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
