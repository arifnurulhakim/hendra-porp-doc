# 🎯 Sprint Task Assignments - Hendra Property Management

## 📋 Team Color Legend
- 🔵 **Kang Arif** - Backend Developer (Laravel Filament)
- 🟣 **Hakim** - Backend Developer (Laravel Filament)
- 🟠 **Faris** - Frontend Developer (Customer-side pages)
- 🟡 **Sela** - UI/UX Designer

---

## ✅ Sprint 1: Authentication & Organization (Week 2-3) - **COMPLETE**
**Duration:** 11-24 November 2025

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-AUTH-001 | Login Admin Master | 🔵 Kang Arif | ✅ Done |
| US-AUTH-002 | Login Admin Kantor | 🔵 Kang Arif | ✅ Done |
| US-AUTH-003 | Login Agen | 🔵 Kang Arif | ✅ Done |
| US-OFFICE-001 | Create Kantor | 🟣 Hakim | ✅ Done |
| US-OFFICE-002 | Edit & Delete Kantor | 🟣 Hakim | ✅ Done |
| US-AGENT-001 | Create Agen | 🟣 Hakim | ✅ Done |

### Technical Tasks
- [x] Setup Laravel Breeze/Fortify authentication - **🔵 Kang Arif**
- [x] Create User, Office, Agent models & migrations - **🔵 Kang Arif**
- [x] Implement role-based access control (Gates & Policies) - **🔵 Kang Arif**
- [x] Create Filament resources for Office & Agent - **🟣 Hakim**
- [x] Setup email (SMTP for password reset) - **🔵 Kang Arif**
- [x] Write unit tests for auth & CRUD - **🟣 Hakim**

---

## ✅ Sprint 2: Property Management (Week 4-5) - **COMPLETE**
**Duration:** 25 Nov - 8 Desember 2025

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-AUTH-004 | Forgot Password | 🔵 Kang Arif | ✅ Done |
| US-AGENT-002 | Edit Profile Agen | 🟣 Hakim | ✅ Done |
| US-PROP-001 | Create Listing | 🟣 Hakim | ✅ Done |
| US-PROP-002 | Edit Listing | 🔵 Kang Arif | ✅ Done |
| US-PROP-004 | Upload Foto | 🔵 Kang Arif | ✅ Done |

### Technical Tasks
- [x] Create Property & PropertyPhoto models - **🔵 Kang Arif**
- [x] Implement image upload dengan validation - **🔵 Kang Arif**
- [x] Image optimization (resize, compress) - **🔵 Kang Arif**
- [x] Slug generation untuk SEO - **🟣 Hakim**
- [x] Filament resource untuk Property management - **🟣 Hakim**
- [x] Drag & drop foto reorder - **🔵 Kang Arif**
- [x] Form wizard untuk create property (step by step) - **🟣 Hakim**

---

## 🚀 Sprint 3: Public Listing Website (Week 6-7) - **IN PROGRESS**
**Duration:** 9-22 Desember 2025

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-PROP-003 | Delete Listing | 🟣 Hakim | ✅ Done |
| US-PUBLIC-001 | Browse Listing | 🟠 Faris | 🚀 In Progress |
| US-PUBLIC-002 | Search & Filter | 🟠 Faris + 🔵 Kang Arif (API) | 🚀 In Progress |
| US-PUBLIC-003 | View Detail | 🟠 Faris | ⏳ Pending |
| US-PUBLIC-004 | Kontak Agen WA | 🟠 Faris | ⏳ Pending |

### Technical Tasks
- [x] Create public-facing layout (Blade + Tailwind) - **🟠 Faris + 🟡 Sela (Design)**
- [ ] Property listing page dengan pagination - **🟠 Faris**
- [ ] Search & filter implementation - **🟠 Faris (FE) + 🔵 Kang Arif (API)**
- [ ] Property detail page dengan gallery - **🟠 Faris**
- [ ] WhatsApp deep link integration - **🟠 Faris**
- [ ] Google Maps integration (optional) - **🟠 Faris**
- [x] SEO optimization (meta tags, sitemap) - **🔵 Kang Arif**
- [x] Mobile responsive design - **🟠 Faris + 🟡 Sela (Design)**

### 🎯 Current Sprint Focus
**🟠 Faris:**
- Property listing page with pagination
- Property detail page with image gallery
- WhatsApp contact button integration

**🔵 Kang Arif:**
- Search & filter API endpoints
- Performance optimization for public pages

**🟡 Sela:**
- UI/UX refinement for listing and detail pages
- Mobile responsive design improvements

---

## ⏳ Sprint 4: Transaction & Commission (Week 8-9) - **PLANNED**
**Duration:** 23 Des - 5 Januari 2026

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-TRANS-001 | Input Transaksi | 🟣 Hakim | ⏳ Planned |
| US-TRANS-002 | View List Transaksi | 🔵 Kang Arif | ⏳ Planned |
| US-TRANS-003 | View Detail Transaksi | 🟠 Faris | ⏳ Planned |
| US-COMM-001 | Auto-Calculate Komisi | 🔵 Kang Arif | ⏳ Planned |

### Technical Tasks
- [ ] Create Transaction & Commission models - **🔵 Kang Arif**
- [ ] Commission calculation service/logic - **🔵 Kang Arif**
- [ ] Filament resource untuk Transaction - **🟣 Hakim**
- [ ] Auto-update property status saat transaksi - **🔵 Kang Arif**
- [ ] Transaction detail view dengan komisi breakdown - **🟠 Faris**
- [ ] Unit tests untuk commission calculation - **🟣 Hakim**

### Commission Logic
```
Scenario 1: Hanya agen owner
- Agen owner: 70% dari total komisi
- Kantor: 30% dari total komisi

Scenario 2: Agen owner + agen buyer
- Agen owner: 35% dari total komisi
- Agen buyer: 35% dari total komisi
- Kantor: 30% dari total komisi
```

---

## ⏳ Sprint 5: Commission Management & Dashboard (Week 10-11) - **PLANNED**
**Duration:** 6-19 Januari 2026

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-COMM-002 | Mark Komisi Paid | 🔵 Kang Arif | ⏳ Planned |
| US-COMM-003 | View Komisi Pending/Paid | 🟣 Hakim | ⏳ Planned |
| US-DASH-001 | Dashboard Personal Agen | 🟣 Hakim + 🟠 Faris (UI) | ⏳ Planned |

### Technical Tasks
- [ ] Komisi status management (pending → paid) - **🔵 Kang Arif**
- [ ] Dashboard widgets untuk agen - **🟣 Hakim**
- [ ] Chart implementation (Chart.js / ApexCharts) - **🟠 Faris**
- [ ] Commission list dengan filter & export - **🟣 Hakim**
- [ ] Email notification saat komisi paid - **🔵 Kang Arif**
- [ ] Performance query optimization - **🔵 Kang Arif**

### Dashboard Widgets (Agen)
- Total Listing Active
- Total Omzet
- Total Komisi
- Komisi Pending
- Komisi Paid
- Chart: Omzet per bulan

---

## ⏳ Sprint 6: Dashboard Kantor & Master + Polish (Week 12-13) - **PLANNED**
**Duration:** 20 Jan - 2 Februari 2026

### User Stories
| ID | Story | Assignee | Status |
|---|---|---|---|
| US-DASH-002 | Dashboard Kantor | 🔵 Kang Arif + 🟣 Hakim | ⏳ Planned |
| US-DASH-003 | Dashboard Master | 🟣 Hakim + 🔵 Kang Arif | ⏳ Planned |
| - | Bug Fixing & Polish | 🔵 Arif + 🟣 Hakim + 🟠 Faris + 🟡 Sela | ⏳ Planned |

### Technical Tasks
- [ ] Dashboard kantor (aggregate agen) - **🔵 Kang Arif**
- [ ] Dashboard master (aggregate kantor) - **🟣 Hakim**
- [ ] Performance optimization - **🔵 Kang Arif**
- [ ] Code refactoring - **🔵 Arif + 🟣 Hakim**
- [ ] UI/UX polish - **🟠 Faris + 🟡 Sela**
- [ ] Bug fixing dari sprint sebelumnya - **All Team**

### Dashboard Widgets (Admin Kantor)
- Total Agen Active
- Total Listing
- Total Omzet Kantor
- Komisi Kantor
- Table: Performance per agen

### Dashboard Widgets (Admin Master)
- Total Kantor
- Total Agen
- Total Listing
- Total Omzet Global
- Table: Performance per kantor

---

## 📊 Team Workload Overview

### 🔵 Kang Arif (Backend Lead)
**Primary Focus:**
- Authentication & authorization systems
- Commission calculation logic
- API endpoints for public pages
- Performance optimization
- Database query optimization
- Email notifications

**Sprint Breakdown:**
- Sprint 1-2: ✅ Complete (Auth & Property core)
- Sprint 3: 🚀 API support for public pages
- Sprint 4-6: Transaction & commission system + dashboards

---

### 🟣 Hakim (Backend Developer)
**Primary Focus:**
- Filament resources & admin panel
- CRUD operations
- Testing & quality assurance
- Transaction management
- Dashboard development

**Sprint Breakdown:**
- Sprint 1-2: ✅ Complete (Office/Agent/Property resources)
- Sprint 3: ✅ Property deletion
- Sprint 4-6: Transaction resources + dashboards + testing

---

### 🟠 Faris (Frontend Developer)
**Primary Focus:**
- Customer-facing pages
- Property listing & detail pages
- Search & filter UI
- Mobile responsive design
- WhatsApp integration
- Charts & data visualization

**Sprint Breakdown:**
- Sprint 1-2: Not applicable (backend sprint)
- Sprint 3: 🚀 **ACTIVE** - Public listing pages
- Sprint 4: Transaction detail views
- Sprint 5-6: Dashboard UI & polish

---

### 🟡 Sela (UI/UX Designer)
**Primary Focus:**
- UI design for public pages
- Mobile responsive design
- User experience improvements
- Visual polish & consistency
- Design system maintenance

**Sprint Breakdown:**
- Sprint 1-2: Foundation design system
- Sprint 3: 🚀 **ACTIVE** - Public listing design
- Sprint 4-5: Transaction & dashboard design
- Sprint 6: Final polish & refinement

---

## 🎯 Next Actions

### For 🟠 Faris (Frontend - **IMMEDIATE**)
1. Complete property listing page with pagination
2. Implement search & filter UI (coordinate with 🔵 Kang Arif for API)
3. Build property detail page with image gallery
4. Add WhatsApp contact button integration
5. Ensure mobile responsive design

### For 🔵 Kang Arif (Backend - **SUPPORT SPRINT 3**)
1. Create search & filter API endpoints
2. Optimize public page queries
3. Support 🟠 Faris with API integration

### For 🟣 Hakim (Backend - **PREPARE SPRINT 4**)
1. Review Sprint 3 completion
2. Prepare for transaction resource development
3. Plan commission testing scenarios

### For 🟡 Sela (Design - **REFINE SPRINT 3**)
1. Review public listing design with 🟠 Faris
2. Provide mobile responsive design improvements
3. Prepare dashboard design concepts for Sprint 5

---

## 📝 Communication Guidelines

### Daily Standup Format
Each team member should share:
1. **Yesterday:** What did you complete?
2. **Today:** What are you working on?
3. **Blockers:** Any obstacles or dependencies?

### Sprint Review
- **Demo:** Show completed features
- **Retrospective:** What went well? What to improve?
- **Planning:** Review next sprint assignments

### Collaboration Points
- **🟠 Faris ↔️ 🔵 Kang Arif:** API integration for public pages
- **🟠 Faris ↔️ 🟡 Sela:** Design implementation & feedback
- **🔵 Arif ↔️ 🟣 Hakim:** Code review & backend coordination
- **All Team:** Bug fixing & polish phase

---

## 📌 Important Notes

1. **Current Sprint (Sprint 3)** is the highest priority for 🟠 Faris and 🟡 Sela
2. All backend work for Sprint 1-2 is **complete** ✅
3. Sprint 4+ are **planned** but not started
4. **Optional Features** marked for later phase:
   - Push notifications
   - Advanced analytics
   - Marketplace features

---

**Last Updated:** November 3, 2025  
**Status:** Sprint 3 In Progress 🚀

