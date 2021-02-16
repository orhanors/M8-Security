import { model, Schema, Model, Document } from "mongoose";

const bcrypt = require("bcrypt");

type findByCredentialsType = (email: string, password: string) => IUser | null;
export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: number;
	findByCredentials: findByCredentialsType;
}
const UserSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: Number, default: 0 }, //0:user,1:admin
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		console.log("Bcrypt pre hook error: ", error);
		next(error);
	}
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject: any = user.toObject();

	delete userObject.password;
	delete userObject.__v;
	return userObject;
};

UserSchema.statics.findByCredentials = async function (
	email: string,
	password: string
) {
	const user: any = await this.findOne({ email });

	if (user) {
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) return user;
		else return null;
	} else return null;
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

module.exports = User;
