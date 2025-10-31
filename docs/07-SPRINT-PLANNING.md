# 🚀 Sprint Planning - Hendra Prop

**Dokumen Sprint Planning & Timeline**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0  
**Target Launch:** Maret 2026

---

## 1. Project Timeline Overview

```
Nov 2025        Dec 2025        Jan 2026        Feb 2026        Mar 2026
┌────────────┬────────────┬────────────┬────────────┬────────────┐
│ Setup      │ Sprint 1-2 │ Sprint 3-4 │ Sprint 5-6 │ Testing &  │
│ & Planning │ Foundation │ Public Web │ Dashboard  │ Launch     │
│ (1 week)   │ (4 weeks)  │ (4 weeks)  │ (4 weeks)  │ (3 weeks)  │
└────────────┴────────────┴────────────┴────────────┴────────────┘
```

**Breakdown:**
- Week 1: Setup & Planning (4-10 Nov)
- Week 2-3: Sprint 1 (11-24 Nov)
- Week 4-5: Sprint 2 (25 Nov - 8 Des)
- Week 6-7: Sprint 3 (9-22 Des)
- Week 8-9: Sprint 4 (23 Des - 5 Jan)
- Week 10-11: Sprint 5 (6-19 Jan)
- Week 12-13: Sprint 6 (20 Jan - 2 Feb)
- Week 14-15: Testing & QA (3-16 Feb)
- Week 16: Bug Fixing & Polish (17-23 Feb)
- Week 17: Soft Launch Preparation (24 Feb - 2 Mar)
- **Launch:** 3 Maret 2026

---

## 2. Sprint 0: Setup & Planning (Week 1)
**Duration:** 4-10 November 2025  
**Goal:** Project kickoff, setup environment, finalize requirements

### Tasks
- [x] ✅ Review & approval dokumen analisis
- [ ] Setup Git repository (GitHub/GitLab)
- [ ] Setup development environment
  - [ ] Install Laravel 11 + Filament 3
  - [ ] Setup database (MySQL)
  - [ ] Configure Caddy web server
- [ ] Setup staging server (VPS)
- [ ] Finalize UI/UX mockup (optional)
- [ ] Team onboarding & training

### Deliverables
- ✅ Approved documentation
- Git repo dengan initial commit
- Development environment ready
- Staging server ready
- Project board setup (Trello/Jira)

---

## 3. Sprint 1: Authentication & Organization (Week 2-3)
**Duration:** 11-24 November 2025  
**Goal:** Multi-role authentication & CRUD Kantor/Agen

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-AUTH-001 | Login Admin Master | 3 | Backend Dev |
| US-AUTH-002 | Login Admin Kantor | 2 | Backend Dev |
| US-AUTH-003 | Login Agen | 2 | Backend Dev |
| US-OFFICE-001 | Create Kantor | 3 | Backend Dev |
| US-OFFICE-002 | Edit & Delete Kantor | 2 | Backend Dev |
| US-AGENT-001 | Create Agen | 5 | Backend Dev |

**Total Points:** 17

### Technical Tasks
- [ ] Setup Laravel Breeze/Fortify authentication
- [ ] Create User, Office, Agent models & migrations
- [ ] Implement role-based access control (Gates & Policies)
- [ ] Create Filament resources for Office & Agent
- [ ] Setup email (SMTP for password reset)
- [ ] Write unit tests for auth & CRUD

### Daily Standup Topics
- Authentication flow implementation
- Database migration execution
- Permission testing per role
- Email setup (local & staging)

### Sprint Review
- **Demo:** Login multi-role & CRUD kantor/agen
- **Retrospective:** What went well? What to improve?

### Definition of Done
- ✅ All user stories completed & tested
- ✅ Code reviewed & merged to develop
- ✅ Unit tests passing
- ✅ Deployed to staging
- ✅ Demo approved by stakeholder

---

## 4. Sprint 2: Property Management (Week 4-5)
**Duration:** 25 Nov - 8 Desember 2025  
**Goal:** CRUD Properti dengan upload multiple foto

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-AUTH-004 | Forgot Password | 5 | Backend Dev |
| US-AGENT-002 | Edit Profile Agen | 3 | Full Stack Dev |
| US-PROP-001 | Create Listing | 8 | Full Stack Dev |
| US-PROP-002 | Edit Listing | 5 | Backend Dev |
| US-PROP-004 | Upload Foto | 5 | Backend Dev |

**Total Points:** 26

### Technical Tasks
- [ ] Create Property & PropertyPhoto models
- [ ] Implement image upload dengan validation
- [ ] Image optimization (resize, compress)
- [ ] Slug generation untuk SEO
- [ ] Filament resource untuk Property management
- [ ] Drag & drop foto reorder
- [ ] Form wizard untuk create property (step by step)

### Challenges
- **Challenge 1:** Upload multiple foto sekaligus
  - **Solution:** Use Livewire file upload atau Filepond.js
- **Challenge 2:** Image optimization
  - **Solution:** Intervention/Image library

### Testing Focus
- Upload foto (max 10, max 5MB, JPG/PNG only)
- Image resize & compress quality
- Slug uniqueness
- Permission: Agen hanya edit properti miliknya

### Definition of Done
- ✅ Create & edit property working
- ✅ Upload foto berhasil (max 10)
- ✅ Foto ter-resize & compress
- ✅ Agen tidak bisa edit properti agen lain
- ✅ Unit & feature tests passing

---

## 5. Sprint 3: Public Listing Website (Week 6-7)
**Duration:** 9-22 Desember 2025  
**Goal:** Public website untuk buyer browse & search properti

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-PROP-003 | Delete Listing | 3 | Backend Dev |
| US-PUBLIC-001 | Browse Listing | 5 | Frontend Dev |
| US-PUBLIC-002 | Search & Filter | 8 | Full Stack Dev |
| US-PUBLIC-003 | View Detail | 8 | Frontend Dev |
| US-PUBLIC-004 | Kontak Agen WA | 3 | Frontend Dev |

**Total Points:** 27

### Technical Tasks
- [ ] Create public-facing layout (Blade + Tailwind)
- [ ] Property listing page dengan pagination
- [ ] Search & filter implementation
- [ ] Property detail page dengan gallery
- [ ] WhatsApp deep link integration
- [ ] Google Maps integration (optional)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Mobile responsive design

### Design Requirements
- **Homepage:** Hero section + featured listings
- **Listing Page:** Grid view, search bar, filter sidebar
- **Detail Page:** Photo gallery, info, map, agent contact

### Performance Targets
- Page load time < 2 detik
- Mobile responsive (100%)
- SEO score > 80 (PageSpeed Insights)

### Definition of Done
- ✅ Public listing accessible tanpa login
- ✅ Search & filter working
- ✅ Mobile responsive
- ✅ WhatsApp button buka WA app
- ✅ SEO meta tags set

---

## 6. Sprint 4: Transaction & Commission (Week 8-9)
**Duration:** 23 Des - 5 Januari 2026  
**Goal:** Input transaksi & auto-calculate komisi

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-TRANS-001 | Input Transaksi | 8 | Backend Dev |
| US-TRANS-002 | View List Transaksi | 5 | Full Stack Dev |
| US-TRANS-003 | View Detail Transaksi | 3 | Frontend Dev |
| US-COMM-001 | Auto-Calculate Komisi | 8 | Backend Dev |

**Total Points:** 24

### Technical Tasks
- [ ] Create Transaction & Commission models
- [ ] Commission calculation service/logic
- [ ] Filament resource untuk Transaction
- [ ] Auto-update property status saat transaksi
- [ ] Transaction detail view dengan komisi breakdown
- [ ] Unit tests untuk commission calculation

### Commission Logic
```php
// Scenario 1: Hanya agen owner
- Agen owner: 70% dari total komisi
- Kantor: 30% dari total komisi

// Scenario 2: Agen owner + agen buyer
- Agen owner: 35% dari total komisi
- Agen buyer: 35% dari total komisi
- Kantor: 30% dari total komisi
```

### Testing Scenarios
1. Transaction dengan 1 agen → komisi 70/30
2. Transaction dengan 2 agen → komisi 35/35/30
3. Override komisi % manual
4. Property status auto-change ke sold/rented
5. Tidak bisa delete transaction yang sudah ada komisi

### Definition of Done
- ✅ Input transaksi working
- ✅ Komisi auto-calculate dengan benar
- ✅ Support 1 atau 2 agen
- ✅ Property status auto-update
- ✅ Unit tests untuk logic komisi passing

---

## 7. Sprint 5: Commission Management & Dashboard (Week 10-11)
**Duration:** 6-19 Januari 2026  
**Goal:** Mark komisi paid & dashboard personal agen

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-COMM-002 | Mark Komisi Paid | 5 | Backend Dev |
| US-COMM-003 | View Komisi Pending/Paid | 5 | Full Stack Dev |
| US-DASH-001 | Dashboard Personal Agen | 8 | Full Stack Dev |

**Total Points:** 18

### Technical Tasks
- [ ] Komisi status management (pending → paid)
- [ ] Dashboard widgets untuk agen
- [ ] Chart implementation (Chart.js / ApexCharts)
- [ ] Commission list dengan filter & export
- [ ] Email notification saat komisi paid
- [ ] Performance query optimization

### Dashboard Widgets (Agen)
- Total Listing Active
- Total Omzet
- Total Komisi
- Komisi Pending
- Komisi Paid
- Chart: Omzet per bulan

### Performance Optimization
- Cache dashboard metrics (TTL: 1 jam)
- Eager loading untuk avoid N+1
- Database indexing

### Definition of Done
- ✅ Mark komisi paid working
- ✅ Dashboard show real-time data
- ✅ Chart rendering correctly
- ✅ Export komisi ke Excel
- ✅ Email notification sent

---

## 8. Sprint 6: Dashboard Kantor & Master + Polish (Week 12-13)
**Duration:** 20 Jan - 2 Februari 2026  
**Goal:** Dashboard agregat & final polish

### User Stories
| ID | Story | Points | Assignee |
|----|-------|--------|----------|
| US-DASH-002 | Dashboard Kantor | 8 | Full Stack Dev |
| US-DASH-003 | Dashboard Master | 8 | Full Stack Dev |
| - | Bug Fixing & Polish | 10 | All Team |

**Total Points:** 26

### Technical Tasks
- [ ] Dashboard kantor (aggregate agen)
- [ ] Dashboard master (aggregate kantor)
- [ ] Performance optimization
- [ ] Code refactoring
- [ ] UI/UX polish
- [ ] Bug fixing dari sprint sebelumnya

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

### Code Quality Checklist
- [ ] Laravel Pint (code style)
- [ ] PHPStan level 5
- [ ] No N+1 queries
- [ ] Security audit (SQL injection, XSS, CSRF)
- [ ] Remove debug code

### Definition of Done
- ✅ Dashboard kantor & master working
- ✅ All critical bugs fixed
- ✅ Code quality check passed
- ✅ Performance optimized
- ✅ Ready for testing phase

---

## 9. Testing & QA Phase (Week 14-15)
**Duration:** 3-16 Februari 2026  
**Goal:** Comprehensive testing & QA

### Testing Activities
- [ ] **Unit Testing:** All critical functions
- [ ] **Feature Testing:** End-to-end user flows
- [ ] **Browser Testing:** Chrome, Firefox, Safari, Edge
- [ ] **Mobile Testing:** iOS Safari, Android Chrome
- [ ] **Performance Testing:** Load testing dengan K6
- [ ] **Security Testing:** OWASP top 10
- [ ] **User Acceptance Testing (UAT):** Stakeholder testing

### Test Scenarios (UAT)
1. **End-to-End Listing Flow**
   - Agen create listing → Public view → Buyer kontak
2. **End-to-End Transaction Flow**
   - Admin input transaksi → Komisi auto-calculate → Mark paid
3. **Permission Testing**
   - Agen tidak bisa akses data agen lain
   - Admin Kantor tidak bisa akses kantor lain
4. **Multi-Agen Transaction**
   - Transaksi dengan 2 agen → Komisi split 35/35/30

### Bug Severity Classification
- **P0 - Critical:** System crash, data loss, security breach → Fix immediately
- **P1 - High:** Major feature broken → Fix within 24 hours
- **P2 - Medium:** Minor feature broken → Fix within 1 week
- **P3 - Low:** Cosmetic issues → Fix if time allows

### QA Checklist
- [ ] All features working as expected
- [ ] No critical or high bugs
- [ ] Performance < 2 sec page load
- [ ] Mobile responsive 100%
- [ ] SEO optimization done
- [ ] Security audit passed

---

## 10. Bug Fixing & Polish (Week 16)
**Duration:** 17-23 Februari 2026  
**Goal:** Fix all bugs from testing phase

### Activities
- [ ] Fix all P0 & P1 bugs
- [ ] Fix selected P2 bugs
- [ ] UI/UX refinement
- [ ] Content preparation (copy, images)
- [ ] Documentation update

### Launch Preparation
- [ ] Production server setup
- [ ] SSL certificate installation
- [ ] Database migration to production
- [ ] Backup strategy implementation
- [ ] Monitoring setup (UptimeRobot, Sentry)

---

## 11. Soft Launch Preparation (Week 17)
**Duration:** 24 Feb - 2 Maret 2026  
**Goal:** Prepare for production launch

### Pre-Launch Checklist
- [ ] Production environment tested
- [ ] Database seeded dengan sample data
- [ ] Admin accounts created
- [ ] User training completed
- [ ] Documentation finalized
- [ ] Backup verified
- [ ] Rollback plan ready
- [ ] Support process defined

### Launch Day Activities
- [ ] Final smoke test
- [ ] Deploy to production
- [ ] DNS switch (if needed)
- [ ] Monitor errors & performance
- [ ] Stakeholder notification

---

## 12. Post-Launch (Week 18+)
**Duration:** 3 Maret 2026 onwards  
**Goal:** Monitor, support, and iterate

### Week 1 Post-Launch
- [ ] Daily monitoring
- [ ] Collect user feedback
- [ ] Fix critical bugs ASAP
- [ ] Performance tuning

### Week 2-4 Post-Launch
- [ ] Analyze usage data
- [ ] Plan Phase 2 features
- [ ] Refine based on feedback

### Phase 2 Features (Optional)
- Moderasi properti
- Link sharing terbatas
- Reward system
- Email notification automation
- Advanced analytics
- Mobile app (React Native / Flutter)

---

## 13. Team & Resources

### Team Structure
- **Backend Developer:** 1-2 orang
- **Frontend Developer:** 1 orang
- **Full Stack Developer:** 1 orang (optional)
- **UI/UX Designer:** 1 orang (part-time)
- **QA Tester:** 1 orang
- **Project Manager:** 1 orang

### Tools & Services
- **Version Control:** Git + GitHub/GitLab
- **Project Management:** Trello / Jira / Linear
- **Communication:** Slack / Discord
- **Code Quality:** Laravel Pint, PHPStan
- **Testing:** PHPUnit, Pest, Laravel Dusk
- **Monitoring:** Sentry, UptimeRobot
- **Deployment:** GitHub Actions / GitLab CI
- **Hosting:** VPS (DigitalOcean / AWS / Vultr)

---

## 14. Risk Mitigation

### Risk 1: Scope Creep
**Mitigation:** Strict MVP scope, reject non-essential features

### Risk 2: Timeline Delay
**Mitigation:** 2-week buffer built into timeline

### Risk 3: Technical Challenges
**Mitigation:** POC (Proof of Concept) untuk fitur complex

### Risk 4: Team Availability
**Mitigation:** Cross-training, documentation

---

## 15. Success Metrics

### Launch Success Criteria
- ✅ Zero critical bugs
- ✅ All MVP features working
- ✅ Performance < 2 sec page load
- ✅ Mobile responsive
- ✅ User training completed

### Post-Launch KPIs (1 Month)
- User adoption > 80%
- System uptime > 99%
- Avg response time < 1 sec
- Zero data loss incidents

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0  
**Next Review:** Weekly sprint reviews

