import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class PostJob extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public phone_num: string;

  @column()
  public email: string;

  @column()
  public address: string;

  @column()
  public state: string;

  @column()
  public zip: Number;

  @column()
  public type_clothing: string;

  @column()
  public description: string;

  @column()
  public budget: Number;

  @column()
  public userId: Number;

  @column()
  public images: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
