import { 
  users, User, InsertUser, 
  categories, Category, InsertCategory, 
  products, Product, InsertProduct,
  cart, Cart, InsertCart,
  cartItems, CartItem, InsertCartItem,
  watchlist, Watchlist, InsertWatchlist
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(filters?: {
    categoryId?: number;
    categorySlug?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    ageGroups?: string[];
    isFeatured?: boolean;
    isOnSale?: boolean;
    isNew?: boolean;
  }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  
  // Cart
  getCart(userId?: number, sessionId?: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  getCartItems(cartId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(cartId: number): Promise<boolean>;
  
  // Watchlist
  getWatchlistItems(userId?: number, sessionId?: string): Promise<(Watchlist & { product: Product })[]>;
  addToWatchlist(watchlistItem: InsertWatchlist): Promise<Watchlist>;
  removeFromWatchlist(id: number): Promise<boolean>;
  isInWatchlist(productId: number, userId?: number, sessionId?: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private carts: Map<number, Cart>;
  private cartItems: Map<number, CartItem>;
  private watchlistItems: Map<number, Watchlist>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartId: number;
  private currentCartItemId: number;
  private currentWatchlistId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    this.watchlistItems = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentCartItemId = 1;
    this.currentWatchlistId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Product methods
  async getProducts(filters?: {
    categoryId?: number;
    categorySlug?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    ageGroups?: string[];
    isFeatured?: boolean;
    isOnSale?: boolean;
    isNew?: boolean;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (filters) {
      if (filters.categoryId) {
        products = products.filter(product => product.categoryId === filters.categoryId);
      }

      if (filters.categorySlug) {
        const category = Array.from(this.categories.values()).find(
          c => c.slug === filters.categorySlug
        );
        if (category) {
          products = products.filter(product => product.categoryId === category.id);
        }
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchLower) || 
          (product.description && product.description.toLowerCase().includes(searchLower))
        );
      }

      if (filters.minPrice !== undefined) {
        products = products.filter(product => 
          (product.salePrice || product.price) >= filters.minPrice!
        );
      }

      if (filters.maxPrice !== undefined) {
        products = products.filter(product => 
          (product.salePrice || product.price) <= filters.maxPrice!
        );
      }

      if (filters.sizes && filters.sizes.length > 0) {
        products = products.filter(product => 
          filters.sizes!.some(size => product.sizes.includes(size))
        );
      }

      if (filters.colors && filters.colors.length > 0) {
        products = products.filter(product => 
          filters.colors!.some(color => product.colors.includes(color))
        );
      }

      if (filters.ageGroups && filters.ageGroups.length > 0) {
        products = products.filter(product => 
          filters.ageGroups!.some(ageGroup => product.ageGroups.includes(ageGroup))
        );
      }

      if (filters.isFeatured !== undefined) {
        products = products.filter(product => product.isFeatured === filters.isFeatured);
      }

      if (filters.isOnSale !== undefined) {
        products = products.filter(product => product.isOnSale === filters.isOnSale);
      }

      if (filters.isNew !== undefined) {
        products = products.filter(product => product.isNew === filters.isNew);
      }
    }

    return products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productUpdate };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Cart methods
  async getCart(userId?: number, sessionId?: string): Promise<Cart | undefined> {
    if (userId) {
      return Array.from(this.carts.values()).find(
        cart => cart.userId === userId
      );
    }
    
    if (sessionId) {
      return Array.from(this.carts.values()).find(
        cart => cart.sessionId === sessionId
      );
    }
    
    return undefined;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const cart: Cart = { ...insertCart, id };
    this.carts.set(id, cart);
    return cart;
  }

  async getCartItems(cartId: number): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values())
      .filter(item => item.cartId === cartId);
    
    return items.map(item => {
      const product = this.products.get(item.productId)!;
      return { ...item, product };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the same product, size, and color already exists in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => 
        item.cartId === insertCartItem.cartId && 
        item.productId === insertCartItem.productId &&
        item.size === insertCartItem.size &&
        item.color === insertCartItem.color
    );

    if (existingItem) {
      // Update quantity instead of creating a new item
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    cartItem.quantity = quantity;
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(cartId: number): Promise<boolean> {
    const cartItemIds = Array.from(this.cartItems.values())
      .filter(item => item.cartId === cartId)
      .map(item => item.id);
    
    cartItemIds.forEach(id => this.cartItems.delete(id));
    return true;
  }

  // Watchlist methods
  async getWatchlistItems(userId?: number, sessionId?: string): Promise<(Watchlist & { product: Product })[]> {
    let items: Watchlist[] = [];
    
    if (userId) {
      items = Array.from(this.watchlistItems.values()).filter(
        item => item.userId === userId
      );
    } else if (sessionId) {
      items = Array.from(this.watchlistItems.values()).filter(
        item => item.sessionId === sessionId
      );
    }
    
    return items.map(item => {
      const product = this.products.get(item.productId)!;
      return { ...item, product };
    });
  }

  async addToWatchlist(insertWatchlist: InsertWatchlist): Promise<Watchlist> {
    // Check if the product is already in the watchlist
    const existing = Array.from(this.watchlistItems.values()).find(
      item => 
        item.productId === insertWatchlist.productId && 
        (
          (item.userId && item.userId === insertWatchlist.userId) || 
          (item.sessionId && item.sessionId === insertWatchlist.sessionId)
        )
    );

    if (existing) {
      return existing;
    }

    const id = this.currentWatchlistId++;
    const watchlistItem: Watchlist = { ...insertWatchlist, id };
    this.watchlistItems.set(id, watchlistItem);
    return watchlistItem;
  }

  async removeFromWatchlist(id: number): Promise<boolean> {
    return this.watchlistItems.delete(id);
  }

  async isInWatchlist(productId: number, userId?: number, sessionId?: string): Promise<boolean> {
    return Array.from(this.watchlistItems.values()).some(
      item => 
        item.productId === productId && 
        (
          (userId && item.userId === userId) || 
          (sessionId && item.sessionId === sessionId)
        )
    );
  }

  // Initialize sample data
  private initializeData() {
    // Add categories
    const categories: InsertCategory[] = [
      { name: "Pants", slug: "pants", description: "Comfortable pants for kids", itemCount: 120 },
      { name: "Cargo", slug: "cargo", description: "Stylish cargo pants for kids", itemCount: 85 },
      { name: "Capris", slug: "capris", description: "Trendy capris for kids", itemCount: 64 },
      { name: "Shorts", slug: "shorts", description: "Cool shorts for kids", itemCount: 98 },
      { name: "Mom Fit", slug: "mom-fit", description: "Mom fit styles for kids", itemCount: 45 }
    ];
    
    categories.forEach(category => this.createCategory(category));

    // Add products
    const products: InsertProduct[] = [
      {
        name: "Denim Jacket",
        slug: "denim-jacket",
        description: "A classic denim jacket that never goes out of style. Perfect for layering in any season.",
        price: 34.99,
        categoryId: 1,
        images: [
          "https://images.unsplash.com/photo-1522771930-78848d9293e8",
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c",
          "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Blue", "Light Blue", "Dark Blue"],
        ageGroups: ["5-7y", "8-10y"],
        rating: 4,
        reviewCount: 24,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isOnSale: false
      },
      {
        name: "Floral Summer Dress",
        slug: "floral-summer-dress",
        description: "A beautiful floral dress perfect for summer days and special occasions.",
        price: 29.99,
        salePrice: 24.99,
        categoryId: 5,
        images: [
          "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8",
          "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8",
          "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Pink", "Yellow"],
        ageGroups: ["2-4y", "5-7y"],
        rating: 5,
        reviewCount: 42,
        inStock: true,
        isNew: false,
        isFeatured: false,
        isOnSale: true
      },
      {
        name: "Cargo Pants",
        slug: "cargo-pants",
        description: "Durable cargo pants with plenty of pockets for adventures.",
        price: 29.99,
        categoryId: 2,
        images: [
          "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2",
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Khaki", "Green", "Black", "Navy"],
        ageGroups: ["8-10y", "11-13y"],
        rating: 3,
        reviewCount: 18,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isOnSale: false
      },
      {
        name: "Striped T-Shirt",
        slug: "striped-t-shirt",
        description: "Comfortable striped t-shirt perfect for everyday wear.",
        price: 19.99,
        categoryId: 5,
        images: [
          "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4",
          "https://images.unsplash.com/photo-1580309240297-73f2ee2a0fff",
          "https://images.unsplash.com/photo-1593143233715-99c988340dcf"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Red/White", "Blue/White", "Green/White", "Black/White", "Yellow/White", "Pink/White"],
        ageGroups: ["2-4y", "5-7y", "8-10y", "11-13y", "14+y"],
        rating: 4,
        reviewCount: 31,
        inStock: true,
        isNew: true,
        isFeatured: false,
        isOnSale: false
      },
      {
        name: "Denim Shorts",
        slug: "denim-shorts",
        description: "Classic denim shorts for warm weather days.",
        price: 22.99,
        categoryId: 4,
        images: [
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
          "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue", "Light Blue"],
        ageGroups: ["5-7y", "8-10y"],
        rating: 5,
        reviewCount: 47,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isOnSale: false
      },
      {
        name: "Knit Sweater",
        slug: "knit-sweater",
        description: "Warm knit sweater for colder days, made with soft materials for comfort.",
        price: 39.99,
        salePrice: 32.99,
        categoryId: 5,
        images: [
          "https://images.unsplash.com/photo-1476234251651-f353703a034d",
          "https://images.unsplash.com/photo-1564859228273-274232fdb516",
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Red", "Blue", "Gray"],
        ageGroups: ["8-10y", "11-13y"],
        rating: 4,
        reviewCount: 28,
        inStock: true,
        isNew: false,
        isFeatured: false,
        isOnSale: true
      },
      {
        name: "Athletic Pants",
        slug: "athletic-pants",
        description: "Comfortable athletic pants perfect for sports and active play.",
        price: 24.99,
        categoryId: 1,
        images: [
          "https://images.unsplash.com/photo-1511089739981-1fdfe2a91a1d",
          "https://images.unsplash.com/photo-1580309240297-73f2ee2a0fff",
          "https://images.unsplash.com/photo-1580742314019-e48e96114f4b"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Gray", "Red"],
        ageGroups: ["5-7y", "8-10y", "11-13y", "14+y"],
        rating: 4.5,
        reviewCount: 36,
        inStock: true,
        isNew: true,
        isFeatured: true,
        isOnSale: false
      },
      {
        name: "Patterned Leggings",
        slug: "patterned-leggings",
        description: "Fun patterned leggings that are comfortable and stylish.",
        price: 18.99,
        categoryId: 1,
        images: [
          "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
          "https://images.unsplash.com/photo-1577744486770-993118c2fdf6",
          "https://images.unsplash.com/photo-1548233600-ea3c2e8abcee"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Multicolor", "Pink Pattern", "Blue Pattern"],
        ageGroups: ["2-4y", "5-7y", "8-10y"],
        rating: 4.5,
        reviewCount: 52,
        inStock: true,
        isNew: false,
        isFeatured: false,
        isOnSale: false
      },
      {
        name: "Casual Capris",
        slug: "casual-capris",
        description: "Stylish capris for casual everyday wear.",
        price: 26.99,
        categoryId: 3,
        images: [
          "https://images.unsplash.com/photo-1591369822096-ffd140ec948f",
          "https://images.unsplash.com/photo-1581338834647-b0fb40704e21",
          "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42"
        ],
        sizes: ["S", "M", "L"],
        colors: ["Beige", "Navy", "White", "Black"],
        ageGroups: ["8-10y", "11-13y", "14+y"],
        rating: 4,
        reviewCount: 29,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isOnSale: false
      },
      {
        name: "Cargo Shorts",
        slug: "cargo-shorts",
        description: "Durable cargo shorts with multiple pockets, perfect for outdoor adventures.",
        price: 23.99,
        categoryId: 4,
        images: [
          "https://images.unsplash.com/photo-1517492929235-4a2ac8f1a961",
          "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7",
          "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Khaki", "Green", "Navy", "Black"],
        ageGroups: ["5-7y", "8-10y", "11-13y"],
        rating: 4.5,
        reviewCount: 38,
        inStock: true,
        isNew: true,
        isFeatured: false,
        isOnSale: false
      },
      {
        name: "Denim Overalls",
        slug: "denim-overalls",
        description: "Classic denim overalls for a playful, stylish look.",
        price: 34.99,
        salePrice: 29.99,
        categoryId: 5,
        images: [
          "https://images.unsplash.com/photo-1520923642038-b4259acecbd7",
          "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7",
          "https://images.unsplash.com/photo-1607703900726-cd39ddb9e174"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue", "Light Blue"],
        ageGroups: ["2-4y", "5-7y", "8-10y"],
        rating: 4.5,
        reviewCount: 43,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isOnSale: true
      },
      {
        name: "School Uniform Pants",
        slug: "school-uniform-pants",
        description: "Durable school uniform pants that meet most school dress code requirements.",
        price: 28.99,
        categoryId: 1,
        images: [
          "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
          "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114",
          "https://images.unsplash.com/photo-1512909006721-3d6018887383"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Navy", "Black", "Khaki", "Gray"],
        ageGroups: ["5-7y", "8-10y", "11-13y", "14+y"],
        rating: 4,
        reviewCount: 65,
        inStock: true,
        isNew: false,
        isFeatured: false,
        isOnSale: false
      }
    ];
    
    products.forEach(product => this.createProduct(product));

    // Add admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@example.com",
      isAdmin: true
    });
  }
}

export const storage = new MemStorage();
