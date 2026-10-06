# Deploy Backend to Vercel

## Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the server directory**:
   ```bash
   cd server
   vercel
   ```

4. **On first deployment, answer the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (select your account)
   - Link to existing project? `N`
   - What's your project's name? `tesfabunna-api` (or your preferred name)
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **Set Environment Variables** in Vercel Dashboard:
   
   Go to your project settings → Environment Variables and add:
   
   ```
   NODE_ENV=production
   APP_NAME=TesfaBunna
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-backend-url.vercel.app
   PORT=8000
   
   FRONTEND_URL=https://tesfabuna-bar.vercel.app
   
   DATABASE_URL=postgresql://neondb_owner:npg_kM2W4rezKVfx@ep-round-sun-b7y8v042-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   DB_SSL=true
   
   AUTH_TOKEN_NAME=admin-token
   AUTH_TOKEN_TTL_DAYS=0
   BCRYPT_ROUNDS=12
   
   UPLOAD_DIR=storage/uploads
   UPLOAD_MAX_KB=5120
   ```

6. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

7. **Get your backend URL** (something like `https://tesfabunna-api.vercel.app`)

8. **Update frontend .env**:
   ```
   VITE_API_URL=https://tesfabunna-api.vercel.app
   ```

9. **Redeploy frontend** to Vercel with the new API URL

## Important Notes:

- File uploads will be stored in Vercel's temporary filesystem (files are lost on redeployment)
- For persistent file storage, consider using:
  - Cloudinary
  - AWS S3
  - Vercel Blob Storage
  
- Database migrations need to be run manually:
  ```bash
  # Set DATABASE_URL in your local .env to the production database
  npm run migrate
  npm run seed
  ```
