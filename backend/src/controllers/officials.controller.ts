import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import OfficialService from "../services/official.service";
import { HttpError } from "../utils/httpError";

const { getAllOfficials } = new OfficialService();

export default class OfficialsController {
    async getOffcials(req: AuthRequest, res: Response, next: NextFunction){
        try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;

			const userId = req.user?.userId as string;
			const data = await getAllOfficials(page, limit);

			res.status(200).send({ success: true, ...data });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
    }

	async getOfficialsByCategory(req: AuthRequest, res: Response, next: NextFunction) {
		// TODO: Implement this method to fetch officials by category
	}

	async getOfficialProfile(req: AuthRequest, res: Response, next: NextFunction) {

	}

	async updateOfficialProfile(req: AuthRequest, res: Response, next: NextFunction) {

	}

	async deleteOfficialProfile(req: AuthRequest, res: Response, next: NextFunction) {

	}
}