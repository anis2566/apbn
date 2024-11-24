import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function saltAndHashPassword(password: any) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}


export function formattedStr(str: string) {
  const spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  
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