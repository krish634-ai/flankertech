# Project Submission & Approval Workflow

## Overview
Students can now submit completed projects for admin/developer review. Points are only earned after approval. This creates a complete workflow: Start → Work → Submit → Review → Approve/Reject → Earn Points.

## Project Status Flow

```
pending → working → submitted → approved (✓ Points Earned)
                              → rejected (⚠ Needs Resubmission)
```

### Status Definitions:
- **pending**: Project selected but not started
- **working**: Student is actively working on the project
- **submitted**: Student submitted ZIP files and screenshots, waiting for admin review
- **approved**: Admin approved submission - student earns points and completes project
- **rejected**: Admin rejected submission - student receives notification with error details and must resubmit

---

## Student Workflow

### 1. Browse & Select Projects
- Students go to `/dashboard/projects`
- Browse available projects and confirm to start them
- Projects move to "Pending" status in My Projects

### 2. Start Working
- Click "Start" button on pending projects
- Project moves to "Working" status
- Work on the project locally

### 3. Submit Project
- Once finished, click "Submit Now" button on working projects
- Redirected to `/dashboard/my-projects/submit?projectId={id}`
- Upload:
  - **ZIP File**: Complete project source code
  - **Screenshots**: Image of every page/section of the project
  - **Description**: Project overview and key features
- Submit for review

### 4. Track Submission Status
- Project moves to "Submitted" status (yellow)
- Shows in "Pending Approval" section
- Students see:
  - Real-time status indicator
  - Notifications for approval/rejection
  - Rejection reasons if applicable

### 5. If Approved ✓
- Notification: "Your project submission has been approved! You earned points."
- Project moves to "Approved" (green)
- Points added to student profile
- Level/rank updated based on total points

### 6. If Rejected ✗
- Notification: "Your submission was rejected. Error: {reason}. Please resubmit with corrections."
- Project moves to "Rejected" (red) 
- Error details shown in red box
- "Resubmit" button available to try again
- No points earned yet

---

## Admin/Developer Workflow

### 1. Access Admin Panel
- Navigate to `/dashboard/admin`
- Must have "admin" or "developer" role
- View quick action cards

### 2. Review Submissions
- Click "Review Now" button or go to `/dashboard/submissions`
- See pending submissions count
- View submissions by status:
  - **Pending Review** (yellow): Awaiting action
  - **Approved** (green): Successfully approved
  - **Rejected** (red): Rejected submissions

### 3. Review Each Submission
- Click "Review" button on pending submission
- See:
  - Student's project description
  - All uploaded screenshots (clickable, opens in new tab)
  - Downloadable ZIP file
  - Submission date and time

### 4. Approve or Reject
- **To Approve**: Click "Approve" button
  - Student receives approval notification
  - Points immediately credited
  - Project marked as "Completed"
  
- **To Reject**: 
  - Enter rejection reason explaining errors/issues
  - Click "Reject" button
  - Student receives rejection notification with reason
  - Must resubmit with corrections

### 5. Track Processed Submissions
- View approved/rejected submissions history
- See rejection reasons for reference

---

## Database Schema Updates

### New Types
```typescript
type ProjectStatus = "pending" | "working" | "submitted" | "approved" | "rejected"
type SubmissionStatus = "pending_review" | "approved" | "rejected"
```

### Submission Object
```typescript
interface Submission {
  id: string
  projectId: string
  studentId: string
  zipUrl: string
  screenshots: string[]
  description: string
  submissionDate: string
  status: SubmissionStatus
  reviewedBy?: string
  reviewedAt?: string
  rejectionReason?: string
}
```

### StudentProject Updates
```typescript
interface StudentProject extends Project {
  status: ProjectStatus
  submission?: Submission
  notifications: Array<{
    id: string
    type: "approved" | "rejected"
    message: string
    read: boolean
    createdAt: string
  }>
}
```

---

## Store Methods

### For Students
- `submitProject(projectId, zipUrl, screenshots, description)` - Submit project for review
- `markNotificationAsRead(projectId, notificationId)` - Mark notifications as read

### For Admins
- `approveSubmission(submissionId, reviewedBy)` - Approve and credit points
- `rejectSubmission(submissionId, reason, reviewedBy)` - Reject with reason
- `getAllSubmissions()` - Get all submissions for review

---

## Key Features

✅ **File Uploads**: Students upload ZIP files and multiple screenshots
✅ **Approval System**: Admins review submissions with detailed feedback
✅ **Notifications**: Real-time notifications for approval/rejection
✅ **Error Tracking**: Clear error messages help students understand what needs fixing
✅ **Points System**: Points only awarded after approval
✅ **Resubmission**: Easy resubmission process for rejected projects
✅ **Status Tracking**: Clear visual indicators for all project statuses
✅ **Admin Dashboard**: Complete overview of submissions pending review

---

## Files Updated/Created

### New Components
- `/components/submission-form.tsx` - Student submission form
- `/components/submission-review.tsx` - Admin submission review panel

### Updated Pages
- `/app/dashboard/my-projects/page.tsx` - Enhanced with new status states
- `/app/dashboard/my-projects/submit/page.tsx` - New submission interface
- `/app/dashboard/admin/page.tsx` - Added submissions quick action
- `/app/dashboard/submissions/page.tsx` - NEW admin submissions review

### Updated Store
- `/lib/store.ts` - Complete submission workflow logic

---

## Points & Levels

- Points awarded only after admin approval
- Level calculated as: `Math.floor(totalPoints / 500) + 1`
- Example: 
  - 0-499 points = Level 1
  - 500-999 points = Level 2
  - 1000+ points = Level 3+

---

## Testing the Workflow

1. **As Student**:
   - Register as student
   - Browse and select projects
   - Click "Start" on a project
   - Go to My Projects
   - Click "Submit Now"
   - Upload files and submit

2. **As Admin**:
   - Register as admin/developer
   - Go to Admin Dashboard
   - Click "Review Now"
   - Review pending submissions
   - Approve or Reject with reason

3. **Check Results**:
   - Student sees notification
   - If approved: points added, status shows "Approved"
   - If rejected: can resubmit
