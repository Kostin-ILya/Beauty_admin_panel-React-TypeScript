export const hasRequiredFields = (
  obj: Record<string, any>,
  requiredFields: string[]
): boolean => requiredFields.every((field) => Object.hasOwn(obj, field))
