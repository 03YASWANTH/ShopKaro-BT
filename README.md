<h1>ShopKaro Backend</h1>

<p>This is the backend of the <strong>ShopKaro</strong> application, built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>.</p>

<h2>Features</h2>
<ul>
  <li>JWT-based authentication</li>
  <li>Product CRUD APIs</li>
  <li>Category support</li>
  <li>Secure routes with token verification</li>
  <li>Error handling middleware</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB & Mongoose</li>
  <li>JSON Web Token (JWT)</li>
  <li>Cors</li>
</ul>

<h2>Setup & Installation</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/yourusername/shopkaro-backend.git
cd shopkaro-backend
</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Setup environment variables:
    <pre><code>PORT=3000
MONGO_URI=mongodb://localhost:27017/shopkaro
JWT_SECRET=your_jwt_secret
CloudName = 
Api_Key = 
Api_Secret =
</code></pre>
  </li>
  <li>Start the server:
    <pre><code>npm run dev</code></pre>
    <p>The server will run on <code>http://localhost:3000</code>.</p>
  </li>
</ol>

<h2>API Endpoints</h2>

<h3>Auth</h3>
<ul>
  <li><code>POST /api/v1/auth/register</code> → Register a new user</li>
  <li><code>POST /api/v1/auth/login</code> → Login a user</li>
</ul>

<h3>Products</h3>
<ul>
  <li><code>GET /api/v1/product</code> → Fetch all products</li>
  <li><code>POST /api/v1/product</code> → Create a new product (protected)</li>
  <li><code>GET /api/v1/product/:id</code> → Fetch single product</li>
  <li><code>PUT /api/v1/product/:id</code> → Update product (protected)</li>
  <li><code>DELETE /api/v1/product/:id</code> → Delete product (protected)</li>
</ul>

<h3>Categories</h3>
<ul>
  <li><code>GET /api/v1/category</code> → Fetch all categories</li>
  <li><code>POST /api/v1/category</code> → Create new category (protected)</li>
</ul>

<h2>Folder Structure</h2>
<pre><code>src/
├── controllers/     # Route logic
├── models/          # Mongoose models
├── routes/          # Express routes
├── middleware/      # Auth and error handling
├── config/          # DB connection
└── server.js        # Entry point
</code></pre>

<h2>Notes</h2>
<ul>
  <li>Make sure MongoDB is running locally or use a cloud DB.</li>
  <li>Protected routes require JWT token in <code>Authorization</code> header: <code>Bearer &lt;token&gt;</code>.</li>
</ul>
