# Deployment

Next.js provides several deployment options for your applications, with Vercel being the recommended platform.

## Vercel Deployment

### Deploy with Git

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository to Vercel
3. Vercel automatically detects Next.js and configures the deployment

### Deploy with CLI

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy your project:
```bash
vercel
```

### Environment Variables

Set environment variables in the Vercel dashboard or via CLI:
```bash
vercel env add MY_VARIABLE production
```

## Self-hosting

### Node.js Server

Build your application:
```bash
npm run build
```

Start the server:
```bash
npm run start
```

This starts a Node.js server on port 3000 by default.

### Docker Deployment

Create a Dockerfile:
```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t my-next-app .
docker run -p 3000:3000 my-next-app
```

### Static Export

For static sites, you can export your Next.js app to static HTML:

Update `next.config.js`:
```js
// next.config.js
module.exports = {
  output: 'export',
}
```

Export the app:
```bash
npm run build
```

This creates a static version in the `out` directory.

## Platform-specific Guides

### AWS Deployment

Deploy to AWS using Elastic Beanstalk or Lambda:

1. Install Serverless Framework:
```bash
npm install -g serverless
```

2. Create serverless.yml:
```yaml
service: nextjs-app

provider:
  name: aws
  runtime: nodejs18.x

functions:
  app:
    handler: server.handler
    events:
      - http:
          path: /
          method: ANY
          cors: true
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
```

### Google Cloud Platform

Deploy to Google Cloud Run:

1. Build and push to Container Registry:
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/nextjs-app
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy --image gcr.io/PROJECT-ID/nextjs-app --platform managed
```

### Azure Deployment

Deploy to Azure App Service:

1. Create a deployment package:
```bash
npm run build
zip -r deployment.zip .next package.json package-lock.json
```

2. Deploy via Azure CLI:
```bash
az webapp deployment source config-zip --resource-group myResourceGroup --name myApp --src deployment.zip
```

## Environment Configuration

### Environment Variables

Use environment variables for different environments:

```js
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}
```

Access in your code:
```jsx
export default function Page() {
  return <div>{process.env.CUSTOM_KEY}</div>
}
```

### Runtime Configuration

For runtime configuration, use `getInitialProps`:

```jsx
// pages/_app.js
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  
  return {
    ...appProps,
    config: {
      API_URL: process.env.API_URL,
    }
  }
}
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### GitLab CI

Create `.gitlab-ci.yml`:
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - .next/

deploy:
  stage: deploy
  script:
    - echo "Deploying to production"
  only:
    - main
```

## Monitoring and Analytics

### Error Tracking

Integrate error tracking services:

```bash
npm install @sentry/nextjs
```

```js
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "YOUR_DSN",
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

Use tools like:
- Vercel Analytics
- Google Analytics
- New Relic
- DataDog

```jsx
// app/layout.js
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Optimization for Production

### Caching Strategies

Configure caching headers in `next.config.js`:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

### Compression

Next.js automatically compresses responses with gzip and Brotli.

### Asset Optimization

Optimize images and fonts:
```jsx
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1200}
        height={600}
        priority
      />
    </main>
  )
}
```

## Troubleshooting

### Common Deployment Issues

1. **Missing Environment Variables**:
   Ensure all required environment variables are set in your deployment platform.

2. **Build Failures**:
   Check build logs for dependency issues or TypeScript errors.

3. **Runtime Errors**:
   Verify that your server has the correct Node.js version.

4. **Performance Issues**:
   Use bundle analyzer to identify large dependencies.

### Debugging in Production

Enable detailed logging:
```bash
NEXT_DEBUG_BUILD=true npm run build
```

Check server logs:
```bash
# For Vercel
vercel logs your-app-name
```

Monitor application performance with tools like:
- Vercel Speed Insights
- Lighthouse CI
- WebPageTest

## Best Practices

### Security

1. Use HTTPS in production
2. Set secure headers
3. Validate all user inputs
4. Keep dependencies updated

### Performance

1. Optimize images with next/image
2. Use code splitting with dynamic imports
3. Implement proper caching strategies
4. Minimize bundle size

### Maintainability

1. Use TypeScript for type safety
2. Implement proper error handling
3. Set up monitoring and alerting
4. Document deployment procedures

### Cost Optimization

1. Use static exports when possible
2. Implement CDN caching
3. Optimize database queries
4. Use serverless functions judiciously