# Showcases Components

This directory contains all UI components for the Designer Showcases feature.

## Components Overview

### ShowcaseCard
Display component for a single showcase with DiceBear preview, metadata, and actions.

**Props:**
- `showcase: Showcase` - The showcase data
- `currentUserId?: string | null` - Current user ID for permission checks
- `onEdit?: (showcase) => void` - Callback when edit button clicked
- `onViewChangelog?: (showcase) => void` - Callback when changelog button clicked

**Features:**
- DiceBear shapes avatar as visual preview
- Shows title, description, author
- Links to deployed URL and/or GitHub
- "Edit" button (owner only)
- "Changelog" button

### ShowcaseGallery
Grid layout container for multiple showcase cards.

**Props:**
- `showcases: Showcase[]` - Array of showcases to display
- `currentUserId?: string | null` - Current user ID
- `isLoading?: boolean` - Show loading skeleton
- `onEdit?: (showcase) => void` - Edit callback
- `onViewChangelog?: (showcase) => void` - Changelog callback

**Features:**
- Responsive grid (1 col mobile, 2 tablet, 3 desktop)
- Loading skeleton states
- Empty state message

### SubmitShowcaseForm
Modal form for creating a new showcase.

**Props:**
- `onClose: () => void` - Close modal callback
- `onSuccess: () => void` - Success callback (after creation)

**Features:**
- Title and description fields
- Optional deployed URL
- Optional GitHub URL
- "Built locally only" checkbox (disables URL requirements)
- Optional base prototype selection
- Auto-creates v1.0 iteration
- Form validation

### EditShowcaseForm
Modal form for updating an existing showcase.

**Props:**
- `showcase: Showcase` - The showcase to edit
- `onClose: () => void` - Close modal callback
- `onSuccess: () => void` - Success callback (after update)

**Features:**
- Pre-filled with existing data
- Update title, description, URLs
- Change base prototype
- Form validation
- Owner-only access (enforced by parent)

### ChangelogModal
Modal displaying version history timeline for a showcase.

**Props:**
- `showcaseId: string` - ID of showcase to display
- `currentUserId?: string | null` - Current user ID
- `onClose: () => void` - Close modal callback

**Features:**
- Fetches showcase with iterations on mount
- Timeline visualization
- "Add Update" button (owner only)
- Inline AddIterationForm
- Chronological ordering (newest first)
- Loading states

### AddIterationForm
Inline form for adding a new version/iteration.

**Props:**
- `showcaseId: string` - ID of showcase to add iteration to
- `onSuccess: () => void` - Success callback
- `onCancel: () => void` - Cancel callback

**Features:**
- Version number input
- Summary textarea
- Validation (version uniqueness checked by API)
- Updates showcase timestamp on success

## Usage Example

```tsx
import { ShowcaseGallery } from '@/components/showcases/showcase-gallery';
import { SubmitShowcaseForm } from '@/components/showcases/submit-showcase-form';

function MyPage() {
  const [showcases, setShowcases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { userId } = useAuth();

  return (
    <>
      <button onClick={() => setShowForm(true)}>Share Work</button>
      
      <ShowcaseGallery 
        showcases={showcases}
        currentUserId={userId}
        onEdit={(s) => console.log('Edit', s)}
        onViewChangelog={(s) => console.log('Changelog', s)}
      />
      
      {showForm && (
        <SubmitShowcaseForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            fetchShowcases();
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}
```

## Design Patterns

All components follow the existing design system:
- Neutral color palette
- `rounded-xl` borders
- `border-neutral-200` borders
- `text-neutral-900` headings
- `text-neutral-600` body text
- Consistent spacing with Tailwind scale

## Dependencies

- `@/components/ui/button` - Button component
- `@/lib/showcases` - Types and utilities
- `@/lib/prototypes` - For base prototype dropdown
- `lucide-react` - Icons
- `@clerk/nextjs` - Authentication (in page, not components)

## API Integration

Components use these API endpoints:
- `GET /api/showcases` - List all
- `POST /api/showcases` - Create
- `GET /api/showcases/[id]` - Get single
- `PATCH /api/showcases/[id]` - Update
- `POST /api/showcases/[id]/iterations` - Add iteration

See `src/app/api/showcases/` for API implementation.

