## Admin Submission Review Guide

### Where to Access the Admin Panel

**URL:** `/dashboard/submissions`

Navigate to this page by:
1. Going to your Dashboard
2. Clicking "Admin Dashboard" (if you have admin/developer role)
3. Clicking "Review Submissions" button
4. Or directly visiting: `http://localhost:3000/dashboard/submissions`

---

## What You'll See

### Dashboard Overview
- **Total Submissions Count** - All submissions received
- **Pending Submissions** - Projects waiting for your review
- **Approved Count** - Successfully approved projects
- **Rejected Count** - Projects sent back for changes

### Pending Submissions Section

Each pending submission shows:
- **Project Title** - Name of the project being submitted
- **Submission Date** - When the student submitted
- **"Review" Button** - Click to expand and see full details

---

## How to Review a Submission

### Step 1: Click "Review" Button
Expands the submission to show:

### Step 2: View Project Details
- **Project Description** - What the student built
- **Screenshots** - Visual proof of the working application
  - Click any screenshot to view full size
  - Multiple screenshots can be uploaded
- **ZIP File** - Complete project source code
  - Download button to check code quality

### Step 3: Make a Decision

#### To APPROVE:
1. Click the green **"Approve"** button
2. Submission status changes to "Approved"
3. Student receives notification: "Your project submission has been approved! You earned points."
4. Student's points are added to their profile
5. Project status changes to "Completed"

#### To REJECT:
1. Fill in **"Rejection Reason"** field with specific errors/issues
2. Example reasons:
   - "Code not following best practices, missing comments"
   - "Missing required features from project requirements"
   - "Screenshots don't show all functionality"
   - "README documentation is incomplete"
3. Click the red **"Reject"** button
4. Submission status changes to "Rejected"
5. Student receives notification: "Your submission was rejected. Error: [your reason]. Please resubmit with corrections."
6. Project status goes back to "In Progress"
7. Student can resubmit after fixing issues

---

## What Happens After Your Decision

### When You APPROVE:
- ✅ Student's project marked as "Completed"
- ✅ Points automatically added to their account
- ✅ Skill levels updated based on project skills
- ✅ Student notification sent immediately
- ✅ Submission moves to "Processed" section

### When You REJECT:
- ❌ Student's project returns to "In Progress" status
- ❌ Student can resubmit from "My Projects" page
- ❌ Rejection reason clearly visible to student
- ❌ No points awarded yet
- ❌ Submission moves to "Processed" section

---

## Processed Submissions Section

Shows all submissions that have been reviewed (approved or rejected):
- Color-coded by status (green for approved, red for rejected)
- Shows rejection reason if applicable
- Shows review date
- Displays reviewer name

---

## Quick Checklist When Reviewing

Before approving, check:
- [ ] All project files are present in ZIP
- [ ] Code follows quality standards
- [ ] Screenshots show working application
- [ ] Project meets all stated requirements
- [ ] README/documentation is clear
- [ ] No major bugs visible in screenshots

If anything is missing or incorrect → **REJECT** with detailed reason

---

## Navigation

- **Back to Admin Dashboard** - Click admin dashboard link
- **View My Projects** - See all your published projects
- **Back to Main Dashboard** - Return to student dashboard view
