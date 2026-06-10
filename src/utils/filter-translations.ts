import type {
  SearchFilterOption,
  SearchFiltersConfig,
  SearchFilterSection,
  SearchFilterSelectField,
} from "@/data/search-filters";

type TranslateFunction = (scope: string, options?: Record<string, unknown>) => string;

/**
 * Creates a label mapping for search filter translations
 * @param t - Translation function from useI18n hook
 * @returns Record mapping English labels to translated labels
 */
export function createFilterLabelMap(t: TranslateFunction): Record<string, string> {
  return {
    // Titles and subtitles
    "Advanced Filters": t("home.filters.title"),
    "Project Filters": t("home.filters.title"),
    "Refine home searches by listing type, location, and property details": t(
      "home.filters.subtitle",
    ),
    "Refine property listings and sort by what matters most": t(
      "property.filters.subtitle",
    ),
    "Filter by city, project status, and verified developers": t(
      "home.filters.subtitle",
    ),

    // Common fields
    City: t("home.filters.city"),
    "Property Type": t("home.filters.propertyType"),
    Developer: "Developer",
    Status: "Status",

    // Cities
    "All Cities": t("home.filters.allCities"),
    "Addis Ababa": t("home.filters.addisAbaba"),
    Adama: t("home.filters.adama"),
    Hawassa: t("home.filters.hawassa"),
    "Bahir Dar": t("home.filters.bahirDar"),

    // Property types
    "All Types": t("home.filters.allTypes"),
    Apartment: t("home.filters.apartment"),
    House: t("home.filters.house"),
    Villa: t("home.filters.villa"),
    Land: t("home.filters.land"),

    // Price range
    "Price Range (ETB)": t("home.filters.priceRangeEtb"),
    "Min 0": t("home.filters.min0"),
    "Max Any": t("home.filters.maxAny"),
    "< 1M": t("home.filters.lt1m"),
    "1M-3M": t("home.filters.oneToThreeM"),
    "3M-8M": t("home.filters.threeToEightM"),
    "8M+": t("home.filters.eightMPlus"),
    "< 20K/mo": t("home.filters.lt20kMonth"),

    // Bedrooms and bathrooms
    Bedrooms: t("home.filters.bedrooms"),
    Bathrooms: t("home.filters.bathrooms"),
    Any: t("home.filters.any"),
    Studio: t("home.filters.studio"),
    "5+": t("home.filters.fivePlus"),
    "4+": t("home.filters.fourPlus"),

    // Property age
    "Property Age": t("home.filters.propertyAge"),
    "Any Age": t("home.filters.anyAge"),
    "New (0–2 yrs)": t("home.filters.new0To2"),
    "Recent (3–5 yrs)": t("home.filters.recent3To5"),
    "5–10 yrs": t("home.filters.fiveToTen"),
    "10–20 yrs": t("home.filters.tenToTwenty"),
    "20+ yrs": t("home.filters.twentyPlus"),

    // Amenities
    Amenities: t("home.filters.amenities"),
    Parking: t("home.filters.parking"),
    Generator: t("home.filters.generator"),
    Elevator: t("home.filters.elevator"),
    "24/7 Security": t("home.filters.security24"),
    "Water Tank": t("home.filters.waterTank"),
    Furnished: t("home.filters.furnished"),
    Balcony: t("home.filters.balcony"),
    "Garden / Compound": t("home.filters.gardenCompound"),
    CCTV: t("home.filters.cctv"),
    "WiFi / Fibre": t("home.filters.wifiFibre"),
    Gym: t("home.filters.gym"),
    "Swimming Pool": t("home.filters.swimmingPool"),

    // Developer options (project filters)
    "All Developers": "All Developers",
    "Capital Real Estate": "Capital Real Estate",
    "Sunshine Developers PLC": "Sunshine Developers PLC",
    "Modern Developments Ltd": "Modern Developments Ltd",
    "Blue Horizon Homes": "Blue Horizon Homes",

    // Project status
    All: "All",
    "Off-plan": "Off-plan",
    "U/C": "U/C",
    Ready: "Ready",

    // Verification toggles
    "Verified Developers Only": "Verified Developers Only",
    "Show only developers verified by TeleProperty":
      "Show only developers verified by TeleProperty",
    "Verified Listings Only": t("property.filters.verifiedListingsOnly"),
    "Show only TeleProperty verified properties": t(
      "property.filters.verifiedListingsDescription",
    ),

    // Sort options
    "Sort By": t("property.filters.sortBy"),
    Newest: t("property.filters.newest"),
    "Price: Low-High": t("property.filters.priceLowHigh"),
    "Price: High-Low": t("property.filters.priceHighLow"),
    "Most Popular": t("property.filters.mostPopular"),
  };
}

/**
 * Translates a single option
 */
function translateOption(
  option: SearchFilterOption,
  translate: (value: string) => string,
): SearchFilterOption {
  return {
    ...option,
    label: translate(option.label),
  };
}

/**
 * Translates a select field
 */
function translateSelectField(
  field: SearchFilterSelectField,
  translate: (value: string) => string,
): SearchFilterSelectField {
  return {
    ...field,
    label: translate(field.label),
    value: translate(field.value),
    options: field.options.map((option) => translateOption(option, translate)),
  };
}

/**
 * Translates a filter section
 */
function translateSection(
  section: SearchFilterSection,
  translate: (value: string) => string,
): SearchFilterSection {
  if (section.kind === "segmented") {
    return {
      ...section,
      label: translate(section.label),
      options: section.options.map((option) => translateOption(option, translate)),
    };
  }

  if (section.kind === "dual-select") {
    return {
      ...section,
      fields: [
        translateSelectField(section.fields[0], translate),
        translateSelectField(section.fields[1], translate),
      ],
    };
  }

  if (section.kind === "range") {
    return {
      ...section,
      label: translate(section.label),
      minLabel: translate(section.minLabel),
      maxLabel: translate(section.maxLabel),
      quickOptions: section.quickOptions.map((option) => translateOption(option, translate)),
    };
  }

  if (section.kind === "chips") {
    return {
      ...section,
      label: translate(section.label),
      options: section.options.map((option) => translateOption(option, translate)),
    };
  }

  // toggle kind
  return {
    ...section,
    label: translate(section.label),
    description: translate(section.description),
  };
}

/**
 * Translates filter configuration using provided label map
 */
export function translateFilterConfig(
  config: SearchFiltersConfig,
  labelMap: Record<string, string>,
): SearchFiltersConfig {
  const translate = (value: string) => labelMap[value] ?? value;

  return {
    ...config,
    title: translate(config.title),
    subtitle: config.subtitle ? translate(config.subtitle) : undefined,
    sections: config.sections.map((section) => translateSection(section, translate)),
  };
}
