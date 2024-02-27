import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Profile from "App/Models/Profile";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Application from "@ioc:Adonis/Core/Application";

export default class UserProfilesController {
  public async index({ auth }: HttpContextContract) {
    const loggedUser = await auth.authenticate();
    const user = await User.find(loggedUser.id);
    const userProfile = await user?.related("profiles").query();
    const userDetails = [{ email: user?.email, userProfile }];
    return userDetails;
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      first_name: schema.string([rules.maxLength(10), rules.minLength(3)]),
      last_name: schema.string([rules.maxLength(10), rules.minLength(3)]),
      phone: schema.string([rules.maxLength(13), rules.minLength(10)]),
      address: schema.string(),
      state: schema.string(),
      post_code: schema.number(),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    const profile = new Profile();
    profile.first_name = userDetails.first_name;
    profile.last_name = userDetails.last_name;
    profile.phone = userDetails.phone;
    profile.address = userDetails.address;
    profile.state = userDetails.state;
    profile.post_code = userDetails.post_code;
    profile.userId = auth.user!.id;
    const image = request.file("image");

    if (image) {
      const imageName = new Date().getTime().toString() + `.${image.extname}`;
      await image.move(Application.publicPath("profileImage"), {
        name: imageName,
      });
      profile.image = imageName;
    }

    // Save userDetail
    await profile.save();
    response.send(profile);
  }
}
