import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import OfficialService from "../services/official.service";
import { HttpError } from "../utils/httpError";

const {
	getAllOfficials,
	getOfficialDetails,
	updateOfficialDetails,
	deleteOfficial,
	getOfficialsBySearch,
	getOfficialById,
} = new OfficialService();

export default class OfficialsController {
	// Fetch all officials
	async getOffcials(req: AuthRequest, res: Response, next: NextFunction) {
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

	async getOfficialsByCategory(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
		// TODO: Implement this method to fetch officials by category
	}

	async getOfficialsBySearchKeyword(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;
			const searchWord = req.query.searchWord as string;

			const data = await getOfficialsBySearch( searchWord, page, limit);

			res.status(200).send({ success: true, ...data });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}

	}

	async getOfficialDetailsById(req:AuthRequest, res: Response, next: NextFunction) {
		try {
			const officialId = req.params.id as string;
			const official = await getOfficialById(officialId);
			if (!official) {
				return next(new HttpError(404, "Official not found"));
			}
			res.status(200).send({ success: true, data: official });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	async getOfficialProfile(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
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

	//Update official profile
	async updateOfficialProfile(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = req.user?.userId as string;
			const email = req.user?.email as string;
			const role = req.user?.role as string;

			// Logic to update official profile in the database
			const data = req.body;

			const official = await getOfficialDetails(email, userId);
			if (!official) {
				return next(new HttpError(404, "Official not found"));
			}
			
			const updatedOfficial = await updateOfficialDetails(
				email,
				userId,
				role,
				data
			);

			res.status(200).send({ success: true, data: updatedOfficial });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	// Delete official profile
	async deleteOfficialProfile(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = req.user?.userId as string;
			const email = req.user?.email as string;
			const role = req.user?.role as string;

			const official = await getOfficialDetails(email, userId);
			if (!official) {
				return next(new HttpError(404, "Official not found"));
			}

			const data = await deleteOfficial(email, userId, role);

			res
				.status(200)
				.send({ success: true, message: "Official profile deleted", data });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}
}
