const propertiesKeys = {
  all: ["properties"] as const,
  list: () => [...propertiesKeys.all, "list"] as const,
  detail: (propertyId: string) =>
    [...propertiesKeys.all, "detail", propertyId] as const,
};

const savedKeys = {
  all: ["saved"] as const,
  list: () => [...savedKeys.all, "list"] as const,
};

const listingsKeys = {
  all: ["listings"] as const,
  list: () => [...listingsKeys.all, "list"] as const,
};

export const queryKeys = {
  properties: propertiesKeys,
  saved: savedKeys,
  listings: listingsKeys,
} as const;