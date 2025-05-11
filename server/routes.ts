import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomUUID } from "crypto";
import { insertCartItemSchema, insertCartSchema, insertWatchlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import path from 'path'; // Added import for path resolution

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a session ID for non-authenticated users
  const getSessionId = (req: Request): string => {
    if (!req.headers.authorization) {
      return randomUUID();
    }
    return req.headers.authorization;
  };

  // Error handling middleware
  const handleError = (res: Response, error: any) => {
    console.error("API Error:", error);

    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error",
        errors: error.errors 
      });
    }

    return res.status(500).json({ 
      message: error.message || "Internal server error" 
    });
  };

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get all products with optional filtering
  app.get("/api/products", async (req, res) => {
    try {
      const filters: any = {};

      if (req.query.category) {
        filters.categorySlug = req.query.category as string;
      }

      if (req.query.search) {
        filters.search = req.query.search as string;
      }

      if (req.query.minPrice) {
        filters.minPrice = parseFloat(req.query.minPrice as string);
      }

      if (req.query.maxPrice) {
        filters.maxPrice = parseFloat(req.query.maxPrice as string);
      }

      if (req.query.sizes) {
        filters.sizes = (req.query.sizes as string).split(',');
      }

      if (req.query.colors) {
        filters.colors = (req.query.colors as string).split(',');
      }

      if (req.query.ageGroups) {
        filters.ageGroups = (req.query.ageGroups as string).split(',');
      }

      if (req.query.featured === 'true') {
        filters.isFeatured = true;
      }

      if (req.query.sale === 'true') {
        filters.isOnSale = true;
      }

      if (req.query.new === 'true') {
        filters.isNew = true;
      }

      const products = await storage.getProducts(filters);

      //Make call to our Backend API
      res.json(products);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Get product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Cart endpoints
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cart = await storage.getCart(undefined, sessionId);

      if (!cart) {
        return res.json({ items: [], total: 0 });
      }

      const cartItems = await storage.getCartItems(cart.id);
      const total = cartItems.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

      res.json({
        id: cart.id,
        items: cartItems,
        total
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cart/add", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cartItemData = insertCartItemSchema.parse(req.body);

      let cart = await storage.getCart(undefined, sessionId);

      if (!cart) {
        cart = await storage.createCart({
          userId: undefined,
          sessionId,
          createdAt: new Date().toISOString()
        });
      }

      const cartItem = await storage.addToCart({
        ...cartItemData,
        cartId: cart.id
      });

      const updatedCart = await storage.getCart(undefined, sessionId);
      const cartItems = await storage.getCartItems(updatedCart!.id);
      const total = cartItems.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

      res.json({
        id: updatedCart!.id,
        items: cartItems,
        total
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put("/api/cart/update/:id", async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const { quantity } = req.body;

      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const updatedItem = await storage.updateCartItem(itemId, quantity);

      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      const sessionId = getSessionId(req);
      const cart = await storage.getCart(undefined, sessionId);
      const cartItems = await storage.getCartItems(cart!.id);
      const total = cartItems.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

      res.json({
        id: cart!.id,
        items: cartItems,
        total
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/cart/remove/:id", async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const removed = await storage.removeCartItem(itemId);

      if (!removed) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      const sessionId = getSessionId(req);
      const cart = await storage.getCart(undefined, sessionId);

      if (!cart) {
        return res.json({ items: [], total: 0 });
      }

      const cartItems = await storage.getCartItems(cart.id);
      const total = cartItems.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

      res.json({
        id: cart.id,
        items: cartItems,
        total
      });
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/cart/clear", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cart = await storage.getCart(undefined, sessionId);

      if (cart) {
        await storage.clearCart(cart.id);
      }

      res.json({ items: [], total: 0 });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Watchlist endpoints
  app.get("/api/watchlist", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const watchlistItems = await storage.getWatchlistItems(undefined, sessionId);

      res.json(watchlistItems);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post("/api/watchlist/add", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await storage.getProductById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const watchlistItem = await storage.addToWatchlist({
        userId: undefined,
        sessionId,
        productId,
        createdAt: new Date().toISOString()
      });

      res.json(watchlistItem);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete("/api/watchlist/remove/:id", async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const removed = await storage.removeFromWatchlist(itemId);

      if (!removed) {
        return res.status(404).json({ message: "Watchlist item not found" });
      }

      const sessionId = getSessionId(req);
      const watchlistItems = await storage.getWatchlistItems(undefined, sessionId);

      res.json(watchlistItems);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get("/api/watchlist/check/:productId", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      const sessionId = getSessionId(req);

      const isInWatchlist = await storage.isInWatchlist(productId, undefined, sessionId);

      res.json({ isInWatchlist });
    } catch (error) {
      handleError(res, error);
    }
  });

  // Added route to handle /wholesale requests
  app.get("/wholesale", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });


  const httpServer = createServer(app);
  return httpServer;
}