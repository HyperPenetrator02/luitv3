# Platform Detection - Quick Reference

## ✅ Implementation Status

### Pages with Platform Detection
| Page | Status | Badge Location |
|------|--------|----------------|
| MainPage | ✅ Complete | Below logo |
| LoginRegister | ✅ Complete | Inline with logo |
| UserDashboard | ✅ Complete | Below logo |
| NgoDashboard | ✅ Complete | Below logo |
| AdminDashboard | ✅ Complete | Below logo |
| ReportingPage | ✅ Complete | Below logo |
| CleaningPage | ✅ Complete | Below logo |
| CleanerPage | ✅ Complete | Below logo |
| LeaderboardPage | ✅ Complete | Below logo |
| AnalyticsPage | ✅ Complete | Below logo |

**Total: 10/10 pages** 🎉

---

## 🎯 Quick Implementation Guide

### Add to any new page:

```javascript
// 1. Import getEnv
import { ..., getEnv } from '../api'

// 2. Add state
const [platform, setPlatform] = useState({ is_desktop: false, platform_detected: "Cloud" })
const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024)

// 3. Add fetch function
const fetchEnvironment = async () => {
  try {
    const response = await getEnv()
    setPlatform(response.data)
  } catch (error) {
    console.error('Failed to fetch environment:', error)
  }
}

// 4. Add useEffect
useEffect(() => {
  fetchEnvironment()
  const handleResize = () => setIsMobileView(window.innerWidth < 1024)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// 5. Add badge to header
{platform.is_desktop && (
  <span className="text-[10px] bg-cyan-100 text-cyan-700 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider block">
    {isMobileView ? 'Mobile View' : 'Desktop Version'}
  </span>
)}
```

---

## 📊 Detection Logic

```
┌─────────────────────────────────────────────────────────────┐
│                    Platform Detection                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  GET /env API    │
                    │  is_desktop?     │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
         ┌──────────┐              ┌──────────────┐
         │  FALSE   │              │     TRUE     │
         │ (Cloud)  │              │  (Desktop)   │
         └──────────┘              └──────────────┘
                │                           │
                ▼                           ▼
         No Badge Shown          Check Window Width
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                              ▼                           ▼
                       ┌────────────┐            ┌──────────────┐
                       │  < 1024px  │            │  ≥ 1024px    │
                       │  (Mobile)  │            │  (Desktop)   │
                       └────────────┘            └──────────────┘
                              │                           │
                              ▼                           ▼
                    "Mobile View" Badge      "Desktop Version" Badge
```

---

## 🎨 Badge Styles

### Standard Badge (Most Pages)
```jsx
<span className="text-[10px] bg-cyan-100 text-cyan-700 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider block">
  {isMobileView ? 'Mobile View' : 'Desktop Version'}
</span>
```

### Inline Badge (LoginRegister)
```jsx
<span className="text-[10px] bg-cyan-100 text-cyan-700 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
  {isMobileView ? 'Mobile' : 'Desktop'}
</span>
```

---

## 🔧 Troubleshooting

### Badge not showing?
1. Check if `is_desktop` is `true` in backend response
2. Verify `/env` endpoint is working
3. Check browser console for errors

### Badge showing wrong text?
1. Verify window width (< 1024px = Mobile, ≥ 1024px = Desktop)
2. Check if resize listener is attached
3. Resize window to trigger update

### Badge position incorrect?
1. Check if using `block` class (most pages) or inline (LoginRegister)
2. Verify parent container structure
3. Check for conflicting CSS

---

## 📝 Notes

- **Breakpoint**: 1024px (Tailwind `lg`)
- **API Endpoint**: `/env`
- **Response Field**: `is_desktop` (boolean)
- **Badge Color**: Cyan (#0891b2)
- **Font Size**: 10px
- **Update Trigger**: Window resize event

---

**Last Updated**: 2026-02-01  
**Status**: ✅ All pages implemented
