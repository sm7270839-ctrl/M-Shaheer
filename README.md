# M.SHAHEER — Luxury Fashion & Lifestyle E-Commerce Store

Welcome to the **M.SHAHEER** luxury e-commerce platform. This project has been engineered specifically as an international-standard, mobile-first, and fully responsive fashion maison storefront tailored for the Pakistani fashion market (currency in PKR, with nationwide express logistics and Cash on Delivery support).

---

## 🌟 Quick Overview & Credentials

- **Store Name:** M.SHAHEER
- **Theme:** Luxury Black, White, and Gold
- **Default Currency:** Pakistani Rupee (PKR)
- **Target Market:** Pakistan (Complimentary express delivery nationwide above PKR 5,000)
- **Admin Control Panel:** Click **"Admin"** in the top navigation or bottom footer.
- **Admin Login:**
  - **Email:** `admin@shaheer.pk`
  - **Password:** `ShaheerAdmin2026` (or click the **"1-Click Demo Admin Login"** button on the login screen)

---

## 📖 Beginner's Operating Manual

### 1. How to Run the Website Locally
To launch the website on your local computer:
```bash
# 1. Install all required dependencies
npm install

# 2. Start the development server
npm run dev
```
The website will run locally at `http://localhost:3000`.

---

### 2. How to Add, Edit, and Delete Products Without Coding
You can manage your entire product catalog directly from the **Admin Dashboard**:
1. Open the website and click **Admin** in the header.
2. Enter your credentials or click **1-Click Demo Admin Login**.
3. Go to the **Products** tab.
4. **To Add a New Product:**
   - Click the gold **+ Add New Product** button.
   - Enter Product Name, Department (Men, Women, Children), Subcategory (e.g., Traditional Clothes, Tuxedo, Watches, Frocks), Price in PKR, and Stock Count.
   - Enter comma-separated sizes (`S, M, L, XL` or shoe sizes `40, 41, 42, 43`).
   - Check promotional flags (Featured, New Arrival, Best Seller, VIP Exclusive).
   - Click **Save Product**.
5. **To Edit or Change Prices:**
   - Locate the product in the table.
   - Click the **Pencil (Edit)** icon on the right.
   - Modify the price in PKR, original price, or description, then save.
6. **To Delete a Product:**
   - Click the **Trash** icon next to the item.

---

### 3. How to Upload and Change Images
- Product images can be assigned using any image URL or local asset path in `src/assets/images/`.
- In the **Admin Dashboard > Products > Edit**, add the URL or relative path into the **Image URLs** field.
- Multiple images can be separated with a comma (e.g. `/path/front.jpg, /path/back.jpg`).

---

### 4. How to Change Homepage Banners & Contact Information
1. Open the **Admin Dashboard** and select the **Homepage & Banners** tab.
2. Update:
   - **Promotional Announcement Ticker** (shown at the top of every page).
   - **Hero Headline & Subtext** (the large luxury banner).
   - **Boutique Phone, WhatsApp & Address** (Lahore, Karachi, Islamabad).
3. Click **Save Homepage Configuration**. Changes appear immediately on the storefront.

---

### 5. How to Change the Logo and Brand Colors
- **Logo Text:** The brand logo is rendered as a clean luxury serif wordmark in `src/components/Header.tsx` using the Google Font `Cinzel`. You can change `M.SHAHEER` to any desired brand name in `src/components/Header.tsx` and `src/components/Footer.tsx`.
- **Colors:** The palette is defined in `src/index.css`. The primary gold accents use hex codes `#d4af37`, `#f7d070`, and `#aa771c`. You can customize the gradient in `.gold-gradient-text` or `.gold-card-shimmer`.

---

### 6. How to Manage VIP Memberships & Reward Points
- M.SHAHEER features 3 luxury membership tiers:
  1. **Silver Privilege** (5% automatic discount, 1.0x points)
  2. **Gold Elite** (10% automatic discount, 2.0x points)
  3. **Platinum Sovereign** (15% automatic discount, 3.0x points, private salon access)
- In **Admin Dashboard > VIP & Rewards**:
  - Adjust any customer's reward points with a recorded audit reason.
  - Modify tier discount percentages or benefits.

---

### 7. How to Manage Orders & Cash on Delivery (COD)
1. Navigate to **Admin Dashboard > Orders & COD**.
2. View customer name, contact phone, delivery city, full address, and total amount payable.
3. As the order moves through logistics, update the status dropdown:
   - `Order Placed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
4. Customers can track their package at any time by entering their order number (e.g., `MSH-94812`) into the **Track Order** page.

---

### 8. How to Connect a Permanent Cloud Database
The website currently preserves all data in instantaneous client-side persistence (`localStorage`). To connect a permanent centralized database:

#### Option A: Firebase Firestore (Recommended)
1. In Google AI Studio, request to provision Firebase.
2. Follow the setup flow to enable Firestore.
3. Collections will store `products`, `orders`, `customers`, and `giftCards`.

#### Option B: Relational PostgreSQL (Cloud SQL)
1. Request Cloud SQL PostgreSQL provisioning in AI Studio.
2. The included Node.js / Express backend in `server.ts` can serve API routes (`/api/products`, `/api/orders`) connected via Drizzle ORM or `pg`.

---

### 9. How to Publish and Deploy
- **Google Cloud Run:** Click **Deploy** in Google AI Studio to publish directly to Cloud Run.
- **Vercel / Netlify:**
  ```bash
  npm run build
  ```
  Deploy the generated `dist/` directory and configure your custom domain (e.g. `mshaheer.pk`).

---

&copy; 2026 M.SHAHEER Haute Couture. Engineered with React, TypeScript & Tailwind CSS.
