export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function idFormater(id: Number) {
  return id.toString().padStart(3, '0');
};