# Bottoms Up! Interactive Journey Webapp

## 🌟 Overview

An innovative, gamified single-page webapp that presents all Bottoms Up! documentation content through an engaging, interactive experience. The webapp **dynamically loads markdown files** from `/content/docs/`, ensuring that any changes to the documentation are immediately reflected without needing to rebuild the webapp.

## 📍 Location

**File:** `/static/journey.html`
**Access:** Open directly in a browser or serve via Hugo

## ✨ Key Features

### 1. **Dynamic Content Loading**
- ✅ Fetches markdown files directly from `/content/docs/`
- ✅ Parses YAML frontmatter automatically
- ✅ Renders markdown to HTML using marked.js
- ✅ **Edit any `.md` file and refresh → changes appear immediately!**

### 2. **Comprehensive Gamification System**

#### XP & Leveling
- **50 XP per page read**
- **100 XP required per level** (scales with level)
- **Bonus XP** for streaks and combos
- Visual XP bar with smooth animations
- Confetti celebration on level up! 🎉

#### 20+ Achievements
| Icon | Achievement | Requirement | Bonus XP |
|------|-------------|-------------|----------|
| 📖 | First Steps | Read 1 page | +25 XP |
| 🧭 | Explorer | Read 5 pages | +50 XP |
| 🎓 | Scholar | Read 15 pages | +100 XP |
| 💯 | Completionist | Read all pages | +500 XP |
| 💭 | Philosopher | Complete Concept section | +150 XP |
| 🎒 | Prepared | Complete Practical section | +150 XP |
| 💚 | Cared For | Complete Wellbeing section | +150 XP |
| ⭐ | Rising Star | Reach level 5 | +100 XP |
| 🌟 | Shining Bright | Reach level 10 | +200 XP |
| 🔍 | Searcher | Use search feature | +25 XP |
| ⚡ | Speed Reader | Read 3 pages in one session | +75 XP |
| 🦉 | Night Owl | Read after 10 PM | +50 XP |
| 🌅 | Early Bird | Read before 8 AM | +50 XP |
| 🔥 | On Fire | 3-day streak | +75 XP |
| 🔥🔥 | Burning Bright | 7-day streak | +150 XP |
| 🔥🔥🔥 | Unstoppable | 30-day streak | +500 XP |
| 🎯 | Well-Rounded | Read from all 3 sections | +100 XP |
| 🤔 | Curious Mind | Read 50% of content | +200 XP |
| 💪 | Dedicated Learner | Read 75% of content | +300 XP |
| 🌙 | Dark Side | Enable dark mode | +10 XP |

#### Daily Streaks
- **+25 XP bonus** for visiting on consecutive days
- Streak counter with 🔥 flame icon
- Streaks reset if you miss a day
- Achievements unlock at 3, 7, and 30 day streaks

#### Combo System
- **+10 XP bonus** for reading 3 pages within 5 minutes
- Encourages focused reading sessions

### 3. **Progress Tracking**

#### Overall Stats
- **Total pages read** vs total pages
- **Overall progress percentage**
- **Current level and XP**
- **Daily streak counter**

#### Section Progress
Each of the 3 sections (Concept, Practical, Wellbeing) tracks:
- Individual completion percentage
- Visual progress bars
- Color-coded indicators

#### Reading History
- Tracks every page read with timestamp
- Session-based tracking
- Estimated reading time per page
- Total time spent reading

### 4. **Stats Dashboard** 📊

Access via the "📊 Stats" button (bottom left):

**Overview Section:**
- Overall progress percentage
- Pages read / total pages
- Current level
- Total XP earned
- Current streak

**Reading Stats:**
- Estimated time spent reading
- Achievements unlocked

**Section Progress:**
- Detailed breakdown by section

**Progress Chart:**
- Beautiful doughnut chart visualization
- Powered by Chart.js
- Shows read vs unread pages

### 5. **Smart Navigation**

#### Journey Path Selector
Four guided paths through content:
1. **🗺️ Complete Journey** - All content
2. **💭 The Philosophy** - Concept pages only
3. **🎫 Practical Info** - Logistics and planning
4. **💚 Care & Support** - Wellbeing resources

Each shows:
- Completion percentage
- Visual progress bar
- Color-coded theme

#### Content Cards
- Color-coded by section
- Show XP value (+50 XP)
- Display reading time (📖 X min)
- Visual checkmark when completed
- Smooth fade-in animations

#### Modal Navigation
- **Previous/Next buttons** within each section
- **Recommended next pages** based on your progress
- Beautiful full-screen reading experience
- Close with × button or Esc key

### 6. **Search System** 🔍

- **Real-time search** across all content
- Searches titles, descriptions, AND body text
- Live filtering of cards
- Unlocks "Searcher" achievement on first use

### 7. **Dark Mode** 🌙

- Toggle with 🌙/☀️ button in header
- **Persistent preference** saved to localStorage
- Keyboard shortcut: **Ctrl+D**
- Fully styled dark theme for all components
- Unlocks "Dark Side" achievement

### 8. **Social Sharing** 📤

Share your progress with others!

**Features:**
- Beautiful gradient stats card
- Shows level, pages read, achievements
- **Copy to clipboard** button
- Formatted text ready to share:
  ```
  🪢 My Bottoms Up! Journey Progress:

  Level: 5
  Pages Read: 15/23
  Achievements: 8/20
  Streak: 3 days 🔥

  Join me at Bottoms Up!
  ```

### 9. **Onboarding Experience** 🚀

First-time visitors see:
- Welcome modal with journey explanation
- Feature highlights
- Interactive "Start Your Journey" button
- Only shown once (tracked in localStorage)

### 10. **Advanced Features**

#### Reading Time Estimates
- Calculated at 200 words per minute
- Displayed on each content card
- Totaled in stats dashboard

#### Persistent State
- **localStorage** saves all progress
- Returns show your exact state
- Auto-saves every 30 seconds
- Tracks:
  - Pages read
  - XP and level
  - Achievements unlocked
  - Daily streak
  - Last visit timestamp
  - Reading history

#### Achievements Notifications
- Animated toast notifications
- Slide in from right
- Auto-dismiss after 4 seconds
- Shows icon, title, and description
- Stacks gracefully

#### Confetti Effects
- Triggered on level up
- 50 colorful particles
- Randomized fall patterns
- Brand color palette

#### Keyboard Shortcuts
- **Esc** - Close modals, panels, and overlays
- **Ctrl+D** - Toggle dark mode

### 11. **Responsive Design** 📱

Fully responsive across all devices:
- **Desktop** - Full experience with side panels
- **Tablet** - Optimized layout and spacing
- **Mobile** - Single column layout, touch-friendly buttons
- Adaptive header that wraps gracefully
- Mobile-optimized button positioning

## 🎮 How to Use

### For End Users

1. **Open the webapp:**
   - Direct: Open `/static/journey.html` in your browser
   - Via Hugo: Navigate to `/journey.html` on your site

2. **Start exploring:**
   - First-time visitors see onboarding
   - Click "Start Your Journey" to begin
   - Choose a path or view all content

3. **Read content:**
   - Click any card to open in modal
   - Earn 50 XP instantly
   - Navigate with Prev/Next buttons
   - Close with × or Esc

4. **Track progress:**
   - View stats in header
   - Open 🏆 Achievements panel to see all achievements
   - Open 📊 Stats dashboard for detailed analytics
   - Check section progress on journey cards

5. **Build streaks:**
   - Visit daily to build streak
   - Earn +25 XP bonus each day
   - Unlock streak achievements

6. **Share progress:**
   - Click 📤 Share button in header
   - Copy text to clipboard
   - Share on social media or with friends

### For Content Editors

**The magic: Content updates automatically!**

1. **Edit any markdown file:**
   ```bash
   # Edit any page
   vim /content/docs/practical/schedule.md
   ```

2. **Save your changes**

3. **Refresh the webapp:**
   - Changes appear immediately
   - No rebuild needed
   - No cache clearing required

4. **The webapp fetches:**
   - `/content/docs/concept/*.md`
   - `/content/docs/practical/*.md`
   - `/content/docs/wellbeing/*.md`

**Frontmatter is parsed automatically:**
```yaml
---
title: Your Page Title
description: Short description
lead: Optional longer description
---
```

## 🏗️ Technical Architecture

### Dependencies (CDN)
- **marked.js** v11.1.1 - Markdown parsing
- **js-yaml** v4.1.0 - YAML frontmatter parsing
- **Chart.js** v4.4.1 - Progress charts

### State Management
All state is managed in a single `state` object:
```javascript
{
  pages: [],              // All loaded pages
  readPages: Set(),       // Paths of read pages
  xp: 0,                  // Current XP (resets each level)
  level: 1,               // Current level
  achievements: Set(),    // Unlocked achievement IDs
  currentPath: 'all',     // Current filter
  searchTerm: '',         // Search query
  streak: 0,              // Days in a row
  lastVisit: null,        // ISO timestamp
  readingHistory: [],     // Array of read events
  currentPageIndex: -1,   // For navigation
  totalReadingTime: 0,    // Minutes
  sessionStart: Date.now() // Session ID
}
```

### Data Flow

1. **Initialization:**
   ```
   Load state from localStorage
   → Fetch all markdown files
   → Parse frontmatter + body
   → Render cards
   → Update UI
   ```

2. **Reading a page:**
   ```
   Click card
   → Open modal with content
   → Mark as read (if new)
   → Award XP + bonuses
   → Check achievements
   → Update UI
   → Save state
   ```

3. **Streak calculation:**
   ```
   Load last visit timestamp
   → Calculate days difference
   → If 1 day: increment streak, bonus XP
   → If >1 day: reset streak
   → Save new timestamp
   ```

### Storage Schema

**LocalStorage keys:**
- `bottomsUpState` - Main state object (JSON)
- `darkMode` - Dark mode preference (boolean)
- `hasVisited` - Onboarding completion flag

### Color System

```css
--champagne-pink: #F4DED4   /* Background gradient */
--cherry-blossom: #FFB7C5   /* Concept section, primary accent */
--ash-gray: #B4BEC9         /* Practical section */
--wellbeing-color: #A8D5BA  /* Wellbeing section */
--gold: #FFD700             /* XP, achievements */
--outer-space: #444B53      /* Text */
```

## 🎨 Customization

### Adding New Achievements

Edit the `achievements` array in the script section:

```javascript
{
  id: 'my_achievement',
  icon: '🎯',
  title: 'My Achievement',
  desc: 'Description of achievement',
  xp: 100,
  condition: () => /* your condition */
}
```

### Adjusting XP Values

Edit constants at the top of the script:

```javascript
const XP_PER_PAGE = 50;      // XP per page read
const LEVEL_UP_XP = 100;     // XP per level
const BONUS_XP_STREAK = 25;  // Daily streak bonus
const COMBO_BONUS = 10;      // Combo reading bonus
```

### Adding New Sections

Update the `discoverPages()` function:

```javascript
const sections = [
  { path: 'concept/', pages: [...] },
  { path: 'practical/', pages: [...] },
  { path: 'wellbeing/', pages: [...] },
  { path: 'newsection/', pages: ['page1.md', 'page2.md'] }
];
```

Add corresponding CSS color:

```css
.newsection {
  border-left-color: #YOUR_COLOR;
}
```

### Changing Reading Time Algorithm

Modify the `estimateReadingTime()` function:

```javascript
function estimateReadingTime(text) {
  const wordsPerMinute = 250; // Increase for faster readers
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

## 🐛 Troubleshooting

### Pages not loading

**Issue:** Content grid stays empty
**Solution:**
1. Check browser console for fetch errors
2. Verify markdown files exist at `/content/docs/`
3. Ensure CORS allows fetching (use a local server, not `file://`)
4. Check file paths in `discoverPages()`

### Changes not reflecting

**Issue:** Edited markdown doesn't update
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check if you edited the correct file path

### State not persisting

**Issue:** Progress resets on refresh
**Solution:**
1. Check if browser allows localStorage
2. Verify not in private/incognito mode
3. Check browser console for storage errors

### Achievements not unlocking

**Issue:** Completed requirement but no achievement
**Solution:**
1. Check achievement conditions in code
2. Some achievements check `state.pages.length > 0`
3. Refresh after reading to trigger check
4. Open browser console to debug conditions

## 📊 Analytics & Insights

The stats dashboard provides:

- **Completion rate** - See overall progress
- **Reading velocity** - Pages per session
- **Engagement patterns** - Time-based achievements show when you read
- **Learning paths** - Section completion shows interests
- **Persistence** - Streak data shows commitment

## 🔒 Privacy & Data

- **All data stored locally** in browser localStorage
- **No external tracking** or analytics
- **No server communication** except fetching markdown
- **User owns their data** - can clear localStorage anytime
- **No cookies** used

## 🚀 Performance

- **Lazy loading** - Content fetched only once
- **Minimal dependencies** - Only 3 CDN scripts
- **No build step** - Pure HTML/CSS/JS
- **Efficient rendering** - Only active components update
- **Auto-save throttled** - Every 30 seconds max

## ⌨️ Accessibility

- **Keyboard navigation** - Tab, Enter, Esc
- **Semantic HTML** - Proper heading hierarchy
- **Color contrast** - WCAG AA compliant
- **Screen reader friendly** - ARIA labels
- **Focus management** - Visible focus indicators
- **Dark mode** - Reduces eye strain

## 📝 Future Enhancement Ideas

Potential additions:
- **Export progress as JSON**
- **Import/export between devices**
- **Achievement badges as images**
- **Reading goals (e.g., "Read 3 pages today")**
- **Time-of-day reading heatmap**
- **Page difficulty ratings**
- **Bookmarking favorite pages**
- **Notes/annotations system**
- **Multi-user leaderboard**
- **Weekly challenges**

## 🤝 Contributing

To enhance the webapp:

1. **Edit `/static/journey.html`**
2. **Test thoroughly** across browsers
3. **Maintain backward compatibility** with existing localStorage
4. **Document new features** in this README
5. **Keep dependencies minimal**
6. **Preserve the brand aesthetic**

## 📜 License

Part of the Bottoms Up! documentation project.

---

**Built with ❤️ for the Bottoms Up! community**

*Making documentation exploration fun, engaging, and rewarding!* 🎉
