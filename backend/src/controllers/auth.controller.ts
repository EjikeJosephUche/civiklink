import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
import { CitizenService } from "../services/citizen.service";
import OfficialService from "../services/official.service";
import { decryptPassword, generateToken } from "../utils/helpers";

const { registerCitizen, getCitizenByEmail } = new CitizenService();
const { registerOfficial, getOfficialByEmail } = new OfficialService();

export default class AuthController {
  async registerCitizen(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, firstName, lastName, email, password } = req.body;
      const user = await getCitizenByEmail(email);
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

  async registerOfficial(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        email,
        password,
        position,
        description,
        department,
        contactInfo,
      } = req.body;
      const user = await getOfficialByEmail(email);
      if (user) {
        return next(new HttpError(409, "Official already exists"));
      }

      // Logic to register a new official in the database
      const newOfficial = await registerOfficial({
        name,
        email,
        password,
        position,
        description,
        department,
        contactInfo,
      });

      if (!newOfficial) {
        return next(new HttpError(500, "Official registration failed"));
      }
      res
        .status(201)
        .json({ success: true, message: "Official registered successfully" });
    } catch (error) {
      console.error("Error in registerOfficial:", error);
      return next(new HttpError(500, "Internal Server Error"));
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      const userCitizen = role == "CITIZEN" && (await getCitizenByEmail(email));
      const userOfficial =
        role == "OFFICIAL" && (await getOfficialByEmail(email));
      if (!userCitizen && !userOfficial) {
        return next(new HttpError(401, "Invalid credentials"));
      }
      if (
        userCitizen &&
        userCitizen.role !== role &&
        userOfficial &&
        userOfficial.role !== role
      ) {
        return next(new HttpError(403, "Forbidden"));
      } else {
        if (userCitizen && userCitizen.role === role) {
          console.log("Citizen login");
          // Logic to verify password and generate token
          const isPasswordValid = await decryptPassword(
            password,
            userCitizen.password
          );

          if (!isPasswordValid) {
            return next(new HttpError(401, "Invalid credentials"));
          }
          // Logic to generate token
          const userData = {
            userId: userCitizen._id as string,
            role: userCitizen.role,
            email: userCitizen.email,
          };
          const token = generateToken(userData);

          res.status(200).send({
            success: true,
            message: "Login successful as citizen",
            data: { token },
          });
        }
        if (userOfficial && userOfficial.role === role) {
          console.log("Official login");

          // Logic to verify password and generate token
          const isPasswordValid = await decryptPassword(
            password,
            userOfficial.password
          );
          if (!isPasswordValid) {
            return next(new HttpError(401, "Invalid credentials"));
          }
          // Logic to generate token
          const userData = {
            userId: userOfficial._id as string,
            role: userOfficial.role,
            email: userOfficial.email,
          };
          const token = generateToken(userData);
          res.status(200).send({
            success: true,
            message: "Login successful as Official",
            data: { token },
          });
        }
      }
    } catch (error) {
      console.log(error);
      return next(new HttpError(500, "Internal Server Error"));
    }
  }
}
