# 🎯 **Akamai + Vercel Geolocation Integration Guide**

## **The Problem**

When routing a Next.js app through **Akamai CDN** in front of **Vercel**, the standard Vercel geolocation feature stops working correctly because:

1. **Vercel sees Akamai's edge server IP** instead of the actual user's IP
2. **Geolocation detects the CDN location** (e.g., US) instead of user's real location (e.g., AU)
3. **Middleware may not run** on all routes when using custom domain routing

## **The Solution Steps**

### **1. 🔧 Configure Akamai Property Manager**

**Required Settings:**
- ✅ **Enable "True-Client-IP" header** 
  - Header Name: `True-Client-IP`
  - Header Value: `{{builtin.AK_CLIENT_IP}}`
  - Action: `Add`
- ✅ **Enable "Origin IP Access Control List"** feature (required by Vercel)
- ✅ **Enable SNI (Server Name Indication)** for outbound TLS

### **2. 📝 Update Next.js Middleware**

**Fix the matcher configuration:**
```js
// ❌ BAD - Only runs on homepage
export const config = {
  matcher: "/",
};

// ✅ GOOD - Runs on all pages except API/static files  
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Use Vercel's geolocation directly:**
```js
import { geolocation } from "@vercel/functions";

export default async function middleware(req: NextRequest) {
  // Vercel geolocation works with Akamai's True-Client-IP
  const geo = geolocation(req);
  const country = geo.country; // Now gets real user location!
  
  // Rest of your geolocation logic...
}
```

### **3. 🧪 Verify Configuration**

**Create a debug endpoint:**
```js
// /api/debug/headers/route.ts
export async function GET(req: NextRequest) {
  return NextResponse.json({
    trueClientIP: req.headers.get("true-client-ip"), // Should show real IP
    vercelGeo: geolocation(req), // Should show real location
  });
}
```

## **🔍 How to Diagnose Issues**

### **Check 1: Is Akamai sending True-Client-IP?**
Visit `/api/debug/headers` and look for:
```json
{
  "trueClientIP": "203.x.x.x",  // ✅ Real IP (not null)
  "vercelGeo": {
    "country": "AU"             // ✅ Real country (not edge server location)
  }
}
```

### **Check 2: Is middleware running?**
Look for logs in Vercel Functions:
```
[Middleware] STARTING - URL: https://your-domain.com/
[Middleware] Vercel geolocation: AU (Sydney)  
[Middleware] Final result: AU -> AU
```

### **Check 3: Are cookies being set?**
Check browser dev tools → Application → Cookies:
```
region: AU  // ✅ Should show real region, not US/REST_OF_WORLD
```

## **🚨 Common Issues & Fixes**

| **Problem** | **Cause** | **Fix** |
|-------------|-----------|---------|
| **Still seeing US/Seattle** | Akamai not sending True-Client-IP header | Configure Akamai Property Manager |
| **Middleware not running** | Matcher only on "/" path | Use broader matcher pattern |
| **Works on Vercel URL, not custom domain** | Domain-specific routing issue | Check middleware matcher + Akamai config |
| **Region stuck as REST_OF_WORLD** | Cookies not being set/cleared | Clear cookies + check middleware logs |

## **📋 Quick Checklist for Future Deployments**

**Akamai Side:**
- [ ] True-Client-IP header enabled
- [ ] Origin IP ACL feature enabled  
- [ ] SNI enabled for TLS connections
- [ ] Test `/api/debug/headers` shows real IP

**Next.js Side:**
- [ ] Middleware matcher covers all necessary routes
- [ ] Using `geolocation(req)` from `@vercel/functions`
- [ ] Middleware logs show correct country detection
- [ ] Cookies being set with correct region

**Testing:**
- [ ] Works on both Vercel URL and custom domain
- [ ] Real user location detected (not CDN edge location)
- [ ] Region-specific content displays correctly

## **💡 Key Insight**

**Vercel's Verified Proxy automatically works with Akamai** when configured correctly. You don't need custom IP geolocation services - Vercel's native `geolocation()` function will use the True-Client-IP header to provide accurate location data.

The main gotchas are:
1. **Akamai configuration** (sending the right headers)
2. **Middleware scope** (running on the right routes)
3. **Cookie domain/path** (ensuring cookies work across your domain setup)

## **📚 References**

- [Vercel Verified Proxy Documentation](https://vercel.com/guides/how-to-setup-verified-proxy#supported-providers-verified-proxy-lite)
- [Akamai Client IP Documentation](https://techdocs.akamai.com/property-mgr/docs/client-ip)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## **🔧 Debug Endpoints**

This project includes a debug endpoint at `/api/debug/headers` that shows:
- All incoming headers from Akamai
- Vercel geolocation data
- IP addresses from various sources
- Current middleware configuration status

Use this endpoint to verify your Akamai configuration is working correctly.
