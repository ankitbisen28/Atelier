import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";

export default class UserImagesController {
  public async index({ params, response }: HttpContextContract) {
    const { filename } = params;
    const filePath = Application.publicPath(`profileImage/${filename}`);
    response.download(filePath);
  }
}
