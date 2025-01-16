import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  phone: string;
  comparePasswords: (password: string) => Promise<boolean>;
}

const emailRegexExp: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
      validate: {
        validator: (value: string) => {
          return emailRegexExp.test(value);
        },
        message: "Invalid email format. Try again...",
      },
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "user",
    },

    avatar: {
      public_id: String,
      url: String,
    },

    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

//bcrypt hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
userSchema.methods.comparePasswords = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;