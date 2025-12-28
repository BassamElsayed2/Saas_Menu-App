import { TemplateInfo } from "./types";
import DefaultTemplate from "./DefaultTemplate";
import Template2 from "./Template2";
import Template3 from "./Template3";

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
    name: "Default",
    nameAr: "الافتراضي",
    component: DefaultTemplate,
    description: "Classic grid layout with 3 columns",
    descriptionAr: "تصميم كلاسيكي بشبكة من 3 أعمدة",
  },
  {
    id: "template2",
    name: "Template 2",
    nameAr: "القالب الثاني",
    component: Template2,
    description: "Hero header with large 2-column grid",
    descriptionAr: "رأس بطولي مع شبكة كبيرة من عمودين",
  },
  {
    id: "template3",
    name: "Template 3",
    nameAr: "القالب الثالث",
    component: Template3,
    description: "Vertical list with alternating image positions",
    descriptionAr: "قائمة عمودية مع صور متناوبة",
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
