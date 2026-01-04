import { TemplateInfo } from "./types";
import DefaultTemplate from "./DefaultTemplate";
import Template2 from "./Template2";

/**
 * Template Registry
 *
 * To add a new template:
 * 1. Create TemplateX.tsx in this folder
 * 2. Import it above
 * 3. Add it to the templates array below
 */
export const templates: TemplateInfo[] = [
  {
    id: "default",
    name: "Default Template",
    nameAr: "القالب الافتراضي",
    component: DefaultTemplate,
    description:
      "Modern bilingual menu with hero section and smooth animations",
    descriptionAr: "قائمة عصرية ثنائية اللغة مع قسم بطولي ورسوم متحركة سلسة",
  },
  {
    id: "warm",
    name: "Warm Light Template",
    nameAr: "القالب الدافئ الفاتح",
    component: Template2,
    description:
      "A beautiful warm-colored template with orange accents and light background",
    descriptionAr: "قالب جميل بألوان دافئة مع لمسات برتقالية وخلفية فاتحة",
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): TemplateInfo | undefined {
  return templates.find((template) => template.id === id);
}

/**
 * Get default template
 */
export function getDefaultTemplate(): TemplateInfo {
  return templates[0]; // First template is default
}

/**
 * Get all template IDs
 */
export function getAllTemplateIds(): string[] {
  return templates.map((template) => template.id);
}

/**
 * Check if template exists
 */
export function templateExists(id: string): boolean {
  return templates.some((template) => template.id === id);
}
