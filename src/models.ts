import bcrypt from "bcryptjs";
import mongoose, { type InferSchemaType } from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    label: { type: String, trim: true },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Rings", "Necklaces", "Bracelets", "Watches"],
    },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    position: { type: Number, required: true, min: 0 },
    translations: {
      en: { type: translationSchema, required: true },
      fr: { type: translationSchema, required: true },
      ar: { type: translationSchema, required: true },
    },
  },
  { timestamps: true },
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["new", "confirmed", "fulfilled", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true },
);

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = function comparePassword(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export type ProductDocument = InferSchemaType<typeof productSchema> & { _id: mongoose.Types.ObjectId };
export type OrderDocument = InferSchemaType<typeof orderSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
};

export const Product = mongoose.model("Product", productSchema);
export const Order = mongoose.model("Order", orderSchema);
export const Admin = mongoose.model("Admin", adminSchema);
