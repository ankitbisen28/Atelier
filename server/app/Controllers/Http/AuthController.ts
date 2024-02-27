import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    //Validate user details
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.maxLength(20),
      ]),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    const token = await auth
      .use("api")
      .attempt(userDetails.email, userDetails.password, {
        expiresIn: "10 days",
      });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {
    //Validate user details
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.maxLength(20),
      ]),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    //Create a new user

    const user = new User();
    user.email = userDetails.email;
    user.password = userDetails.password;
    await user.save();

    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });

    return token.toJSON();
  }
}
