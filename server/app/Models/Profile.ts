import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public phone: string;

  @column()
  public address: string;

  @column()
  public state: string;

  @column()
  public post_code: number;

  @column()
  public image: string;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public profile_id: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
