import { pgTable, text, serial, integer, boolean, doublePrecision, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

// Product categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  itemCount: integer("item_count").default(0),
});

// Product model
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  salePrice: doublePrecision("sale_price"),
  categoryId: integer("category_id").notNull(),
  images: json("images").$type<string[]>().notNull(),
  sizes: json("sizes").$type<string[]>().notNull(),
  colors: json("colors").$type<string[]>().notNull(),
  ageGroups: json("age_groups").$type<string[]>().notNull(),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  isOnSale: boolean("is_on_sale").default(false),
  minimumOrderQuantity: integer("minimum_order_quantity").default(1).notNull(),
});

// Cart model
export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: text("session_id"),
  createdAt: text("created_at").notNull(),
});

// Cart items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  size: text("size").notNull(),
  color: text("color").notNull(),
});

// Watchlist
export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: text("session_id"),
  productId: integer("product_id").notNull(),
  createdAt: text("created_at").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isAdmin: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  description: true,
  itemCount: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  salePrice: true,
  categoryId: true,
  images: true,
  sizes: true,
  colors: true,
  ageGroups: true,
  rating: true,
  reviewCount: true,
  inStock: true,
  isNew: true,
  isFeatured: true,
  isOnSale: true,
});

export const insertCartSchema = createInsertSchema(cart).pick({
  userId: true,
  sessionId: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  cartId: true,
  productId: true,
  quantity: true,
  size: true,
  color: true,
});

export const insertWatchlistSchema = createInsertSchema(watchlist).pick({
  userId: true,
  sessionId: true,
  productId: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Cart = typeof cart.$inferSelect;
export type InsertCart = z.infer<typeof insertCartSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Watchlist = typeof watchlist.$inferSelect;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
