import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {
    Route.get("jobs", "PostJobsController.index");
    Route.post("post/job", "PostJobsController.Post");
    Route.get("user/profiles", "UserProfilesController.index");
    Route.post("user/profile/create", "UserProfilesController.store");
    Route.get("user/image/:filename", "UserImagesController.index");
  }).middleware("auth:api");
}).prefix("api");
