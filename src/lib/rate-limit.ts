export class RateLimiter {
  private cache = new Map<string, number[]>();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  public check(ip: string): boolean {
    const now = Date.now();
    const timestamps = this.cache.get(ip) || [];
    
    // Filter out timestamps older than the window
    const validTimestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (validTimestamps.length >= this.maxRequests) {
      // Limit exceeded
      this.cache.set(ip, validTimestamps);
      return false;
    }
    
    validTimestamps.push(now);
    this.cache.set(ip, validTimestamps);
    return true;
  }
}

// Global instance for 5 requests per minute
export const aiRateLimiter = new RateLimiter(5, 60 * 1000);
