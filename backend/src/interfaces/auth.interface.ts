export interface AuthPayload {
	userId: string;
	role: string;
	email: string;
}

export interface AuthRequest extends Request {
	user?: AuthPayload;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials extends LoginCredentials {
	username: string;
	firstName: string;
	lastName: string;
}
