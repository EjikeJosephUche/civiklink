import { Update } from "./../../../frontend/node_modules/vite/types/hmrPayload.d";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import { CitizenService } from "../services/citizen.service";
import { HttpError } from "../utils/httpError";

const { getCitizenDetails, updateCitizenDetails, deleteCitizen } = new CitizenService();

export default class CitizensController {
	async getCitizenProfile(req: AuthRequest, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.userId as string;
			const email = req.user?.email as string;
			// Logic to fetch citizen profile from the database using userId or email
			const citizenProfile = await getCitizenDetails(email, userId);
			if (!citizenProfile) {
				return next(new HttpError(404, "user not found"));
			}
			res.status(200).send({ success: true, data: citizenProfile });
		} catch (error) {
			next(new HttpError(500, "Internal Server Error"));
		}
	}

	async UpdateCitizenProfile( req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId as string;
            const email = req.user?.email as string;
            const role = req.user?.role as string;
            const data = req.body;

            // Logic to update citizen profile in the database 
            const updatedCitizenProfile = await updateCitizenDetails(email, userId, role, data);
            if (!updatedCitizenProfile) {
                return next(new HttpError(404, "User not found"));
            }
            res.status(200).send({ success: true, data: updatedCitizenProfile });
        } catch (error) {
            next(new HttpError(500, "Internal Server Error"));
        }
    }

    async deleteCitizenProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId as string;
            const email = req.user?.email as string;
            const role = req.user?.role as string;
            // Logic to delete citizen profile from the database
            const deletedCitizenProfile = await deleteCitizen(email, userId, role);
            if (!deletedCitizenProfile) {
                return next(new HttpError(404, "User not found"));
            }
            res.status(200).send({ success: true, message: "User deleted successfully" });
        } catch (error) {
            next(new HttpError(500, "Internal Server Error"));
        }
    }
}
