import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export const userSchema = {
  name: v.string(),
  username: v.string(),
  email: v.string(),
  provider: v.string(),
  role: v.union(v.literal("admin"), v.literal("user")),
  image: v.optional(v.string()),
  password: v.string(),
};

export default defineSchema({
  user: defineTable(userSchema)
    .index("by_email", ["email"])
    .index("by_username", ["username"]),
});
