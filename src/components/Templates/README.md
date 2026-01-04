# Menu Templates System

نظام ديناميكي لإدارة قوالب المنيو. يمكنك إضافة قوالب جديدة بسهولة.

## القوالب المتاحة

- **DefaultTemplate** - قالب افتراضي عصري مع تأثيرات متحركة
- **Template2** - قالب دافئ بألوان برتقالية
- **Template3** - قالب سينمائي داكن

## إضافة قالب جديد

### 1. إنشاء مجلد القالب

أنشئ مجلد جديد باسم القالب (مثلاً `Template4/`) مع الهيكل التالي:

```
Template4/
├── index.tsx          # المكون الرئيسي
├── styles.css         # الستايلات
├── translations.ts    # الترجمات
├── components/        # المكونات الفرعية
│   ├── index.ts
│   ├── Header.tsx
│   └── ...
└── context/          # السياق (LanguageProvider)
    ├── index.ts
    └── LanguageContext.tsx
```

### 2. إضافة القالب إلى الـ Registry

افتح ملف `registry.ts` وأضف القالب:

```typescript
import Template4 from "./Template4";

export const templates: TemplateInfo[] = [
  // ... القوالب الموجودة
  {
    id: "template4",
    name: "Template 4",
    nameAr: "القالب الرابع",
    component: Template4,
    description: "Template description",
    descriptionAr: "وصف القالب",
  },
];
```

## Interface

كل قالب يجب أن يتبع `TemplateProps`:

```typescript
interface TemplateProps {
  menuData: MenuData;
  slug: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onShowRatingModal: () => void;
}
```

## Helper Functions

- `getTemplateById(id)` - الحصول على قالب معين
- `getDefaultTemplate()` - الحصول على القالب الافتراضي
- `getAllTemplateIds()` - الحصول على جميع معرفات القوالب
- `templateExists(id)` - التحقق من وجود قالب
