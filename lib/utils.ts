import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formattedStr(str: string) {
  // Convert the camelCase to space-separated words
  const spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Capitalize the first letter of each word
  const formattedStr = spacedStr.replace(/\b\w/g, function(match) {
    return match.toUpperCase();
  });

  return formattedStr;
}


export function formatString(input:string) {
  return input.replace(/([A-Z])/g, ' $1').trim();
}

export const extractFileIdFromUrl = (url:string) => {
  const segments = url.split("/");
  return segments[segments.length - 1]
};