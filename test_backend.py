#!/usr/bin/env python3
"""
LUIT v3 - Backend Health Check Script
Tests if the Railway backend is accessible
"""

import requests
import sys

BACKEND_URL = "https://luitv3-production-1d1f.up.railway.app"

def check_health():
    """Check if backend /health endpoint is accessible"""
    try:
        print(f"🔍 Testing backend: {BACKEND_URL}/health")
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        
        if response.status_code == 200:
            print("✅ Backend is HEALTHY!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ CONNECTION ERROR: Cannot reach backend")
        print("Possible causes:")
        print("  1. DNS not propagated yet (wait 2-5 minutes)")
        print("  2. Railway service is down")
        print("  3. Firewall blocking connection")
        return False
        
    except requests.exceptions.Timeout:
        print("❌ TIMEOUT: Backend took too long to respond")
        return False
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def check_env_endpoint():
    """Check /env endpoint"""
    try:
        print(f"\n🔍 Testing: {BACKEND_URL}/env")
        response = requests.get(f"{BACKEND_URL}/env", timeout=10)
        
        if response.status_code == 200:
            print("✅ /env endpoint works!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("LUIT v3 - Backend Health Check")
    print("=" * 60)
    
    health_ok = check_health()
    env_ok = check_env_endpoint()
    
    print("\n" + "=" * 60)
    if health_ok and env_ok:
        print("✅ BACKEND IS FULLY OPERATIONAL!")
        print(f"\nYou can now use: {BACKEND_URL}")
        sys.exit(0)
    else:
        print("❌ BACKEND IS NOT ACCESSIBLE")
        print("\nTroubleshooting:")
        print("1. Wait 5 minutes for DNS propagation")
        print("2. Check Railway deployment logs")
        print("3. Verify Railway service is 'Active'")
        print("4. Try regenerating the domain again")
        sys.exit(1)
