import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { userSchema } from "./schema";

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const user = await db
      .query("user")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    return user;
  },
});

export const getByUserName = query({
  args: {
    username: v.string(),
  },
  handler: async ({ db }, { username }) => {
    const user = await db
      .query("user")
      .withIndex("by_username", (q) => q.eq("username", username))
      .unique();
    return user;
  },
});

export const create = mutation({
  args: userSchema,
  handler: async ({ db }, args) => {
    const user = await db.insert("user", args);
    return user;
  },
});
