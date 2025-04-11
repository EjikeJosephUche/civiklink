import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import OfficialService from "../services/official.service";
import { HttpError } from "../utils/httpError";

const { getAllOfficials, getOfficialDetails } = new OfficialService();

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
		try {
			const userId = req.user?.userId as string;
			const email = req.user?.email as string;
			const official = await getOfficialDetails(email, userId);
			if (!official) {
				return next(new HttpError(404, "Official not found"));
			}
			res.status(200).send({ success: true, data: official });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	async updateOfficialProfile(req: AuthRequest, res: Response, next: NextFunction) {

	}

	async deleteOfficialProfile(req: AuthRequest, res: Response, next: NextFunction) {

	}
}