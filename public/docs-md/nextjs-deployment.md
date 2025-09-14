# Deployment

Next.js applications can be deployed to various hosting platforms with minimal configuration.

## Vercel (Recommended)

Vercel is the creators of Next.js and provides the best deployment experience:

### Deploy with Git

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your project to Vercel
3. Vercel automatically detects Next.js and configures the deployment

### Deploy with CLI

```bash
npm install -g vercel
vercel
```

### Environment Variables

Set environment variables in the Vercel dashboard or using the CLI:

```bash
vercel env add NEXT_PUBLIC_API_URL
```

## Manual Deployment

Build and deploy manually:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The built application will be in the `.next` directory.

## Docker Deployment

Create a Dockerfile for containerized deployment:

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
ENV PORT 3000
CMD ["node", "server.js"]
```

Build and run the Docker container:

```bash
# Build the image
docker build -t my-next-app .

# Run the container
docker run -p 3000:3000 my-next-app
```

## Netlify Deployment

Deploy to Netlify with minimal configuration:

### Install Adapter

```bash
npm install @next/netlify
```

### Update next.config.js

```js
// next.config.js
const { withNetlify } = require('@next/netlify')

const nextConfig = {
  // Your Next.js config
}

module.exports = withNetlify(nextConfig)
```

### Deploy with Git

1. Push your code to GitHub
2. Connect Netlify to your repository
3. Set the build command to `next build`
4. Set the publish directory to `.next`

## AWS Deployment

Deploy to AWS using various services:

### AWS Amplify

1. Connect your Git repository to AWS Amplify
2. Amplify automatically detects Next.js
3. Set the build command to `next build`
4. Set the publish directory to `.next`

### AWS Elastic Beanstalk

1. Create a `.ebextensions` directory
2. Add configuration files for environment variables
3. Deploy using the Elastic Beanstalk CLI

### AWS Lambda

Use the Serverless Framework:

```bash
npm install -g serverless
serverless create --template aws-nodejs --path my-next-app
```

## Environment Variables

Set environment variables for different environments:

```bash
# Development
.env.development

# Production
.env.production

# Local
.env.local
```

Example `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

## Custom Server

If you need a custom server, create a `server.js` file:

```js
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Custom logic here
    handle(req, res, parse(req.url, true))
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

Update package.json:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

## Monitoring and Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.js

export default function RootLayout({ children }) {
  return (

        {children}

  )
}
```

### Error Tracking

Implement error tracking with services like Sentry:

```bash
npm install @sentry/nextjs
```

```js
// sentry.client.config.js

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## Performance Optimization

### CDN Configuration

Configure CDN settings in your hosting platform:

1. Enable CDN caching
2. Set proper cache headers
3. Configure edge locations

### Compression

Enable compression in your hosting configuration:

```js
// next.config.js
const nextConfig = {
  compress: true,
}

module.exports = nextConfig
```

## Best Practices

1. **Use environment variables** for configuration
2. **Implement proper error handling** and monitoring
3. **Optimize images** before deployment
4. **Use a CDN** for static assets
5. **Enable compression** for better performance
6. **Set proper cache headers** for static resources
7. **Implement health checks** for monitoring
8. **Use HTTPS** in production
9. **Regularly update dependencies** for security
10. **Test deployment** in a staging environment first

---

**Component Path:** `nextjs\deployment\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
