import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import { HttpError } from "../utils/httpError";
import { CitizenService } from "../services/citizen.service";
import OfficialService from "../services/official.service";

const { getCitizenDetails, registerCitizen } = new CitizenService();
const { getOfficialDetails } = new OfficialService();

export default class UserController {
	async registerCitizen(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, firstName, lastName, email, password } = req.body;
			const user = await getCitizenDetails(email);
			if (user) {
				return next(new HttpError(409, "User already exists"));
			}

			// Logic to register a new citizen in the database

			const newCitizen = await registerCitizen({
				username,
				firstName,
				lastName,
				email,
				password,
			});

			if (!newCitizen) {
				return next(new HttpError(500, "User registration failed"));
			} else {
				res
					.status(201)
					.json({ success: true, message: "User registered successfully" });
			}
		} catch (error) {
            console.error("Error in registerCitizen:", error);
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	async registerOfficial(req: AuthRequest, res: Response, next: NextFunction) {
		const data = req.body;
		try {
			console.log("Admin data", data);
			console.log("Admin data type", typeof data);
			res.status(201).json({ message: "Admin registered successfully" });
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}

	async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password, role } = req.body;
			const userCitizen = await getCitizenDetails(email);
			const userOfficial = await getOfficialDetails(email);
			if (!userCitizen && !userOfficial) {
				return next(new HttpError(401, "Invalid credentials"));
			}
			if (
				(userCitizen && userCitizen.role !== role) &&
				(userOfficial && userOfficial.role !== role)
			) {
				return next(new HttpError(403, "Forbidden"));
			}else {
                if (userCitizen && userCitizen.role === role) {
                    console.log("Citizen login");
                    res.status(200).send({
                        success: true,
                        message: "Login successful as citizen",
                        // data: { email: user.email, token },
                    });
                }
                if (userOfficial && userOfficial.role === role) {
                    console.log("Official login");
                    res.status(200).send({
                        success: true,
                        message: "Login successful as user",
                        // data: { email: user.email, token },
                    });
                }
            }
		} catch (error) {
			return next(new HttpError(500, "Internal Server Error"));
		}
	}
}
