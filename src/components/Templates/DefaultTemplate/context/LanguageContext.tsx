"use client";

import { createTemplateLanguage } from "../../shared";
import { translations } from "../translations";

export const { LanguageProvider, useLanguage } = createTemplateLanguage(translations);
