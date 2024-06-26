import Jwt from "@kodeapps/common/build/services/jwt";
import PasswordHasher from "@kodeapps/common/build/services/password_hasher";
import mongoose from "mongoose";
// import { Password } from "../services/password";
// import { Jwt } from "../services/jwt";
// An interface that describes the properties
// that are required to create a new User
//
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  generateAuthToken(): string;
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordHasher.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// generate jwt token
userSchema.methods.generateAuthToken = function () {
  return Jwt.sign({
    id: this._id,
    email: this.email,
  });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
