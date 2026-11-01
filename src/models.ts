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

const variantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
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
    position: { type: Number, required: true, min: 0 },
    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator(value: unknown[]) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Product must have at least one variant",
      },
    },
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
    variantId: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    name: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, required: true, enum: ["cash"] },
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

const presenceSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, unique: true },
  city: { type: String, default: null },
  country: { type: String, default: null },
  lastSeen: { type: Date, required: true },
});

export const Product = mongoose.model("Product", productSchema);
export const Order = mongoose.model("Order", orderSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Presence = mongoose.model("Presence", presenceSchema);
