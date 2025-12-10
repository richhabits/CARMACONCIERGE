# @carmaconcierge/shared

Shared TypeScript types, Zod validation schemas, and utilities for the CARMACONCIERGE monorepo.

## Contents

- **types/** - TypeScript interfaces and enums for all domain models
- **schemas/** - Zod validation schemas for API requests
- **utils/** - Shared utility functions

## Usage

```typescript
import { User, UserRole, userSchema, formatCurrency } from '@carmaconcierge/shared';
```

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```
