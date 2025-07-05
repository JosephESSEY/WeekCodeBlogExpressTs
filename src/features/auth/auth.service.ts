import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../environment/env.config";
import { AuthRepository } from "./auth.repository";
import { User } from "../users/users.model";
// import { EmailService } from "../../shared/services/email.service";


export class AuthService {
  private authRepository: AuthRepository;
//   private emailService: EmailService;

  constructor() {
    this.authRepository = new AuthRepository();
    // this.emailService = new EmailService();
  }

  public async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw { statusCode: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authRepository.createUser(name, email, hashedPassword);
    // await this.emailService.sendWelcomeEmail(email);
    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: "Not found Email" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: "Incorrect Password" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role},
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}
