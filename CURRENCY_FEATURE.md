# ميزة اختيار العملة | Currency Selection Feature

## نظرة عامة | Overview

تم إضافة ميزة شاملة تسمح لأصحاب المطاعم باختيار العملة التي سيتم عرض الأسعار بها في قوائمهم. تدعم الميزة جميع العملات العربية والعملات الدولية الشائعة.

A comprehensive currency selection feature has been added that allows restaurant owners to choose the currency in which prices will be displayed in their menus. The feature supports all Arab currencies and common international currencies.

---

## المميزات | Features

### 1. العملات المدعومة | Supported Currencies

#### العملات العربية | Arab Currencies
- 🇸🇦 الريال السعودي (SAR) - Saudi Riyal
- 🇦🇪 الدرهم الإماراتي (AED) - UAE Dirham  
- 🇪🇬 الجنيه المصري (EGP) - Egyptian Pound
- 🇰🇼 الدينار الكويتي (KWD) - Kuwaiti Dinar
- 🇧🇭 الدينار البحريني (BHD) - Bahraini Dinar
- 🇴🇲 الريال العماني (OMR) - Omani Rial
- 🇶🇦 الريال القطري (QAR) - Qatari Riyal
- 🇯🇴 الدينار الأردني (JOD) - Jordanian Dinar
- 🇱🇧 الليرة اللبنانية (LBP) - Lebanese Pound
- 🇮🇶 الدينار العراقي (IQD) - Iraqi Dinar
- 🇸🇾 الليرة السورية (SYP) - Syrian Pound
- 🇾🇪 الريال اليمني (YER) - Yemeni Rial
- 🇱🇾 الدينار الليبي (LYD) - Libyan Dinar
- 🇹🇳 الدينار التونسي (TND) - Tunisian Dinar
- 🇩🇿 الدينار الجزائري (DZD) - Algerian Dinar
- 🇲🇦 الدرهم المغربي (MAD) - Moroccan Dirham
- 🇲🇷 الأوقية الموريتانية (MRU) - Mauritanian Ouguiya
- 🇸🇩 الجنيه السوداني (SDG) - Sudanese Pound
- 🇸🇴 الشلن الصومالي (SOS) - Somali Shilling
- 🇩🇯 الفرنك الجيبوتي (DJF) - Djiboutian Franc
- 🇰🇲 الفرنك القمري (KMF) - Comorian Franc

#### العملات الدولية | International Currencies
- 🇺🇸 الدولار الأمريكي (USD) - US Dollar
- 🇪🇺 اليورو (EUR) - Euro
- 🇬🇧 الجنيه الإسترليني (GBP) - British Pound
- 🇹🇷 الليرة التركية (TRY) - Turkish Lira

---

## كيفية الاستخدام | How to Use

### للمستخدمين | For Users

1. **انتقل إلى إعدادات القائمة**  
   Go to Menu Settings
   ```
   Dashboard → My Menus → [اختر قائمة] → Settings
   ```

2. **ابقَ في تبويب "الإعدادات العامة"**  
   Stay in the "General Settings" tab

3. **ابحث عن قسم "العملة"**  
   Find the "Currency" section
   - موجود في الإعدادات العامة بعد معلومات القائمة الأساسية
   - Located in general settings after basic menu information

4. **اختر العملة المطلوبة**  
   Select your desired currency
   - استخدم البحث للعثور على العملة بسرعة
   - Use search to find your currency quickly
   - يمكنك البحث بالكود أو الاسم أو البلد
   - You can search by code, name, or country

5. **احفظ التغييرات**  
   Save changes
   - ستظهر العملة الجديدة في جميع المنتجات
   - The new currency will appear in all products

---

## للمطورين | For Developers

### الملفات الأساسية | Core Files

#### 1. `front-app/src/constants/currencies.ts`
يحتوي على:
- قائمة جميع العملات (`arabCurrencies`, `internationalCurrencies`, `allCurrencies`)
- واجهة `Currency` للتعامل مع بيانات العملة
- دالة `getCurrencyByCode()` للحصول على معلومات العملة
- دالة `formatPrice()` لتنسيق الأسعار

```typescript
import { getCurrencyByCode, formatPrice } from "@/constants/currencies";

// الحصول على معلومات العملة
const currency = getCurrencyByCode("SAR");
console.log(currency?.symbol); // "ر.س"

// تنسيق السعر
const formatted = formatPrice(100, "SAR", "ar");
console.log(formatted); // "100.00 ر.س"
```

#### 2. `front-app/src/components/CurrencySelector.tsx`
مكون React لاختيار العملة:
- واجهة بحث متقدمة
- تصنيف العملات (عربية / دولية)
- دعم اللغتين العربية والإنجليزية
- تصميم responsive

```typescript
import CurrencySelector from "@/components/CurrencySelector";

<CurrencySelector
  value={currency}
  onChange={(code) => setCurrency(code)}
  label="اختر العملة"
  hint="سيتم عرض هذه العملة في جميع الأسعار"
  showArabOnly={false} // false = كل العملات، true = عربية فقط
/>
```

### التكامل مع الصفحات | Integration with Pages

#### في صفحة الإعدادات | In Settings Page
```typescript
// front-app/src/app/[locale]/dashboard/menus/[id]/settings/page.tsx

const [formData, setFormData] = useState({
  // ... حقول أخرى
  currency: "SAR", // القيمة الافتراضية
});

// في واجهة المستخدم
<CurrencySelector
  value={formData.currency}
  onChange={(currency) => setFormData({ ...formData, currency })}
  label={t("fields.currency")}
  hint={t("fields.currencyHint")}
/>
```

#### في صفحة المنتجات | In Products Page
```typescript
// front-app/src/app/[locale]/dashboard/menus/[id]/products/page.tsx

// جلب العملة من بيانات القائمة
const [menuCurrency, setMenuCurrency] = useState<string>("SAR");

// عرض السعر مع العملة
{product.price?.toFixed(2)} {getCurrencyByCode(menuCurrency)?.symbol}
```

---

## الترجمات | Translations

### إضافة الترجمات في `messages/ar.json` و `messages/en.json`

```json
{
  "MenuSettings": {
    "sections": {
      "currency": "العملة" // AR | "Currency" // EN
    },
    "fields": {
      "currency": "العملة" // AR | "Currency" // EN,
      "currencyHint": "اختر العملة..." // AR | "Select currency..." // EN
    }
  },
  "Products": {
    "currency": "ريال" // AR | "SAR" // EN
  }
}
```

---

## قاعدة البيانات | Database

### إضافة حقل العملة إلى جدول القوائم

```sql
ALTER TABLE menus 
ADD COLUMN currency VARCHAR(3) DEFAULT 'SAR';
```

---

## الأمثلة | Examples

### مثال 1: عرض السعر في القائمة العامة
```typescript
import { formatPrice } from "@/constants/currencies";

const ProductCard = ({ product, menuCurrency }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price, menuCurrency, locale)}</p>
    </div>
  );
};
```

### مثال 2: إضافة عملة جديدة
```typescript
// في front-app/src/constants/currencies.ts

export const arabCurrencies: Currency[] = [
  // ... العملات الموجودة
  {
    code: "XXX",
    nameAr: "اسم العملة بالعربي",
    nameEn: "Currency Name in English",
    symbol: "رمز",
    country: "الدولة",
  },
];
```

---

## الملاحظات الهامة | Important Notes

1. **العملة الافتراضية**: الريال السعودي (SAR)  
   Default currency: Saudi Riyal (SAR)

2. **التخزين**: يتم حفظ العملة في جدول `menus` في قاعدة البيانات  
   Storage: Currency is saved in the `menus` table in the database

3. **التحديث التلقائي**: عند تغيير العملة، تتحدث جميع الأسعار تلقائيًا  
   Auto-update: When changing currency, all prices update automatically

4. **دعم RTL/LTR**: المكون يدعم الاتجاهين  
   RTL/LTR support: Component supports both directions

---

## الدعم | Support

للمساعدة أو الإبلاغ عن مشكلة:  
For help or to report an issue:

- فتح Issue في GitHub
- Open an Issue on GitHub

---

## الترخيص | License

هذه الميزة جزء من مشروع SaaS Menu وتتبع نفس الترخيص  
This feature is part of the SaaS Menu project and follows the same license.

