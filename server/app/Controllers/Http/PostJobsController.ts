import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PostJob from "App/Models/PostJob";
import Application from "@ioc:Adonis/Core/Application";

export default class PostJobsController {
  public async index({ response }: HttpContextContract) {
    const posts = await PostJob.query();
    response.send(posts);
  }

  public async Post({ request, auth }: HttpContextContract) {
    const first_name = request.input("first_name");
    const last_name = request.input("last_name");
    const phone_num = request.input("phone_num");
    const email = request.input("email");
    const address = request.input("address");
    const state = request.input("state");
    const zip = request.input("post_code");
    const type_clothing = request.input("type_clothing");
    const description = request.input("post_description");
    const budget = request.input("budget");
    const images = request.files("images");

    const post_job = new PostJob();
    post_job.first_name = first_name;
    post_job.last_name = last_name;
    post_job.phone_num = phone_num;
    post_job.email = email;
    post_job.address = address;
    post_job.state = state;
    post_job.zip = zip;
    post_job.type_clothing = type_clothing;
    post_job.description = description;
    post_job.budget = budget;
    post_job.userId = auth.user!.id;

    if (images) {
      const imagePaths: string[] = [];
      for (let image of images) {
        const imageName = new Date().getTime().toString() + `.${image.extname}`;
        await image.move(Application.publicPath("images"), {
          name: imageName,
        });
        imagePaths.push(imageName);
      }
      post_job.images = JSON.stringify(imagePaths); // Serialize the array to JSON
    }

    post_job.save();
    return post_job;
  }
}
