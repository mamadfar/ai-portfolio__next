# AI Portfolio Troubleshooting Guide

## Common 500 Error Causes & Solutions

### 1. **OpenAI API Issues** ⚠️
**Symptoms:** 500 errors that resolve after a few minutes  
**Causes:**
- Rate limit exceeded (requests per minute/day)
- Quota/billing limits reached
- API key issues or expiration
- OpenAI service downtime

**Solutions:**
- Check your OpenAI usage at: https://platform.openai.com/usage
- Verify billing and quota limits
- Check OpenAI status page: https://status.openai.com/
- Regenerate API key if needed

### 2. **AstraDB Connection Issues** 🗄️
**Symptoms:** Intermittent database errors  
**Causes:**
- Network timeouts
- Database token expiration
- Collection access issues
- Service maintenance

**Solutions:**
- Check AstraDB console: https://astra.datastax.com/
- Verify database status and token validity
- Check network connectivity to AstraDB endpoints

### 3. **Redis Cache Issues** 🔴
**Symptoms:** Performance degradation, cache errors  
**Causes:**
- Upstash Redis service issues
- Connection timeouts
- Memory limits exceeded

**Solutions:**
- Check Upstash console: https://console.upstash.com/
- Monitor Redis usage and limits
- Cache failures are now handled gracefully (won't break the app)

### 4. **Environment Variables** 🔧
**Symptoms:** Consistent failures on startup  
**Causes:**
- Missing or invalid environment variables
- API keys not properly set

**Solutions:**
- Verify all required environment variables are set:
  - `OPENAI_API_KEY`
  - `ASTRA_DB_ENDPOINT`
  - `ASTRA_DB_APPLICATION_TOKEN`
  - `ASTRA_DB_COLLECTION`
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

## Monitoring Commands

### Run Health Check
```bash
npm run health-check
```
This will test all services and report their status.

### Check Logs (Development)
```bash
npm run dev
```
Look for detailed error logs in the console with these prefixes:
- `[API]` - General API errors
- `[AI]` - OpenAI model issues  
- `[DB]` - AstraDB connection issues
- `[CACHE]` - Redis cache issues
- `[ASTRA]` - Detailed AstraDB logs

### Check Production Logs
If deployed on Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Functions" tab
4. View logs for `/api/chat`

## Improved Error Handling

The API now includes:
- ✅ Better error categorization (rate limits, auth, network)
- ✅ Graceful cache failure handling
- ✅ More specific error messages
- ✅ Detailed logging for debugging
- ✅ Service availability checks
- ✅ User-friendly error messages

## Service Status Pages

Monitor these external services:
- **OpenAI Status**: https://status.openai.com/
- **AstraDB Status**: Check DataStax status page
- **Upstash Status**: https://status.upstash.com/

## Best Practices

### For Rate Limiting:
1. Implement exponential backoff (already added via caching)
2. Use caching effectively (1-hour cache implemented)
3. Monitor usage regularly

### For Database Issues:
1. Use connection pooling (handled by AstraDB client)
2. Implement retry logic (added in error handling)
3. Monitor database performance

### For Cache Issues:
1. Make cache optional (implemented - app works without Redis)
2. Set appropriate TTL values (1 hour implemented)
3. Monitor cache hit rates

## Quick Fixes

### If you get 500 errors:
1. **Wait 2-3 minutes** - Many issues resolve automatically
2. **Check service status pages** - External service issues
3. **Run health check** - `npm run health-check`
4. **Check environment variables** - Ensure all are set correctly
5. **Review recent usage** - Check if you hit API limits

### Emergency Actions:
1. **Disable caching temporarily** - Comment out Redis calls
2. **Reduce retriever documents** - Change `k: 8` to `k: 4` in route.ts
3. **Switch to simpler model** - Change from "gpt-4-turbo" to "gpt-3.5-turbo"

## Log Monitoring

Look for these specific error patterns:
- `rate limit` or `quota` → OpenAI usage issue
- `authentication` or `API key` → Credential issue  
- `timeout` or `network` → Connection issue
- `ENOTFOUND` or `ECONNREFUSED` → DNS/Network issue

The new error handling provides specific HTTP status codes:
- `400` - Bad request (invalid input)
- `429` - Rate limit exceeded
- `503` - Service unavailable (temporary)
- `500` - Internal server error (unexpected)
