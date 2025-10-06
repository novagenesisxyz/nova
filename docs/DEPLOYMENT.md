# Deploying Nova to Vercel

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
pnpm add -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
From the project directory (`/Users/allan/src/nova`), run:
```bash
vercel
```

Follow the prompts:
- Set up and deploy: Yes
- Which scope: Choose your account
- Link to existing project: No (first time) / Yes (subsequent deploys)
- Project name: nova (or your preferred name)
- Directory: ./ (current directory)
- Override settings: No

### Step 4: Production Deployment
For production deployment:
```bash
vercel --prod
```

## Option 2: Deploy via GitHub Integration

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `pnpm build`
   - Output Directory: `.next` (default)
   - Install Command: `pnpm install`

### Step 3: Environment Variables
Add these in Vercel Dashboard > Settings > Environment Variables:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
NEXT_PUBLIC_GENESIS_POOL_ADDRESS=0x...
NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_ASSET_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_GENESIS_GOAL_USDC=5000000
NEXT_TELEMETRY_DISABLED=1
# Optional, published once NOVA is live
NEXT_PUBLIC_NOVA_TOKEN_ADDRESS=0x...
```

To get a WalletConnect Project ID:
1. Go to https://cloud.walletconnect.com
2. Sign up/Login
3. Create a new project
4. Copy the Project ID

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

## Post-Deployment

### Custom Domain
1. Go to your project in Vercel Dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables for Production
Make sure to update these in Vercel Dashboard:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from WalletConnect Cloud
- `NEXT_PUBLIC_SEPOLIA_RPC_URL` - RPC endpoint for Sepolia (Infura, Alchemy, etc.)
- `NEXT_PUBLIC_GENESIS_POOL_ADDRESS` - Genesis pool address
- `NEXT_PUBLIC_NOGE_TOKEN_ADDRESS` - NOGE token deployed address
- `NEXT_PUBLIC_ASSET_ADDRESS` - Stablecoin used for Genesis deposits (mock or real)
- `NEXT_PUBLIC_TREASURY_ADDRESS` - Research treasury multisig receiving sweepable yield
- `NEXT_PUBLIC_CHAIN_ID` - Chain ID the frontend should target (e.g., 11155111 for Sepolia)
- `NEXT_PUBLIC_GENESIS_GOAL_USDC` - USDC amount you’re targeting for the Genesis raise
- `NEXT_PUBLIC_NOVA_TOKEN_ADDRESS` - Leave unset until the NOVA token contract is deployed and verified
- Any other API keys or secrets you add later

Remember: Genesis reservations are non-refundable. Make sure your landing copy and legal disclaimers in the frontend match the current lockup terms before promoting a production deployment.

> The Foundry deploy script (`DeployGenesis.s.sol`) can either use real asset/aToken/Aave addresses
> supplied via environment variables or deploy local mocks when values are omitted.

## Monitoring

### Build Logs
View build logs in Vercel Dashboard > Deployments

### Function Logs
View runtime logs in Vercel Dashboard > Functions

### Analytics
Enable Web Analytics in Vercel Dashboard > Analytics

## Troubleshooting

### Build Failures
1. Check build logs for specific errors
2. Ensure all dependencies are in package.json
3. Test local build: `pnpm build`

### Runtime Errors
1. Check Function logs
2. Verify environment variables are set
3. Check browser console for client-side errors

### Performance Issues
1. Enable Vercel Analytics
2. Check bundle size in build output
3. Consider enabling ISR for dynamic routes

## Useful Commands

### Local Testing
```bash
# Test production build locally
pnpm build
pnpm start
```

### Vercel CLI Commands
```bash
# List deployments
vercel ls

# Inspect deployment
vercel inspect [deployment-url]

# View logs
vercel logs [deployment-url]

# Set environment variables
vercel env add VARIABLE_NAME

# Pull environment variables
vercel env pull
```

## Important Notes

1. **Free Tier Limits**: 
   - 100GB bandwidth/month
   - Unlimited deployments
   - SSL included

2. **Build Settings**: Already configured in vercel.json

3. **Preview Deployments**: Every push to a branch creates a preview deployment

4. **Production Deployments**: Only pushes to main/master trigger production deployments

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Status: https://vercel-status.com
