  export const BLOODGROUP = [
    {
      label: "A+",
      value: "a+",
    },
    {
      label: "A-",
      value: "a-",
    },
    {
      label: "B+",
      value: "b+",
    },
    {
      label: "B-",
      value: "b-",
    },
    {
      label: "AB+",
      value: "ab+",
    },
    {
      label: "AB-",
      value: "ab-",
    },
    {
      label: "O-",
      value: "o-",
    },
    {
      label: "O+",
      value: "o+",
    },
  ] as const;
  
  export const MEMBERTYPE = [
    {
      label: "Scout",
      value: "scout",
    },
    {
      label: "Adult Leader",
      value: "adultLeader",
    },
  ] as const;
  
  export const SCOUT_SECTION_TYPE = [
    {
      label: "Cub",
      value: "Cub",
    },
    {
      label: "Scout",
      value: "Scout",
    },
    {
      label: "Rover",
      value: "Rover",
    },
  ] as const;
  
  export const BADGES_CUB = [
    {
      label: "নবাগত",
      value: "newbie",
    },
    {
      label: "সদস্য ব্যাজ",
      value: "memberBadge",
    },
    {
      label: "তারা ব্যাজ",
      value: "starBadge",
    },
    {
      label: "চাঁদ ব্যাজ",
      value: "moonBadge",
    },
    {
      label: "চাঁদতারা ব্যাজ",
      value: "moonStarBadge",
    },
  ] as const;
  
  export const BADGES_SCOUT = [
    {
      label: "নবাগত",
      value: "newbie",
    },
    {
      label: "সদস্য ব্যাজ",
      value: "memberBadge",
    },
    {
      label: "স্ট্যান্ডার্ড ব্যাজ",
      value: "standardBadge",
    },
    {
      label: "প্রোগ্রেস ব্যাজ",
      value: "progressBadge",
    },
    {
      label: "সার্ভিস ব্যাজ",
      value: "serviceBadge",
    },
    {
      label: "প্রেসিডেন্ট স্কাউট অ্যাওয়ার্ড",
      value: "presidentScoutAward",
    },
  ] as const;
  
  export const BADGES_ROVER = [
    {
      label: "সহচর স্তর",
      value: "sohocorStage",
    },
    {
      label: "সদস্য স্তর",
      value: "memberStage",
    },
    {
      label: "প্রশিক্ষণ স্তর",
      value: "trainingStage",
    },
    {
      label: "সেবা স্তর",
      value: "serviceStage",
    },
    {
      label: "প্রেসিডেন্ট রোভার স্কাউট অ্যাওয়ার্ড",
      value: "presidentRoverScoutAward",
    },
  ] as const;
  
  export const BADGES_ADULT_CUB = [
    {
      label: "বেসিক কোর্স সম্পন্ন",
      value: "basicCourseCompleted",
    },
    {
      label: "অ্যাডভান্স কোর্স সম্পন্ন",
      value: "advanceCourseCompleted",
    },
    {
      label: "স্কিল কোর্স সম্পন্ন",
      value: "skillCourseCompleted",
    },
    {
      label: "উডব্যাজার",
      value: "woodbadger",
    },
    {
      label: "সিএএলটি সম্পন্ন",
      value: "cltCompleted",
    },
    {
      label: "সহকারী লিডার ট্রেইনার",
      value: "assistantLeaderTrainer",
    },
    {
      label: "সিএলটি সম্পন্ন",
      value: "cltCompleted",
    },
    {
      label: "লিডার ট্রেইনার",
      value: "leaderTrainer",
    },
  ] as const;
  
  export const ROLES_CUB_ROLE = [
    {
      label: "নবাগত কাব স্কাউট",
      value: "newbiCubScout",
    },
    {
      label: "কাব স্কাউট সদস্য",
      value: "cubScoutMember",
    },
    {
      label: "সহকারী ষষ্ঠক নেতা",
      value: "assistantSixerLeader",
    },
    {
      label: "ষষ্ঠক নেতা",
      value: "sixerLeader",
    },
    {
      label: "সিনিয়র ষষ্ঠক নেতা",
      value: "seniorSixerLeader",
    },
  ] as const;
  
  export const ROLES_SCOUT_ROLE = [
    {
      label: "নবাগত কাব স্কাউট",
      value: "newbiCubScout",
    },
    {
      label: "স্কাউট সদস্য",
      value: "scoutMember",
    },
    {
      label: "সহকারী উপদল নেতা",
      value: "assistantPetroLeader",
    },
    {
      label: "উপদল নেতা",
      value: "petroLeader",
    },
    {
      label: "সিনিয়র উপদল নেতা",
      value: "seniorPetroLeader",
    },
  ] as const;
  
  export const ROLES_ROVER_ROLE = [
    {
      label: "রোভার স্কাউট সহচর",
      value: "roverScoutSohocor",
    },
    {
      label: "রোভার স্কাউট সদস্য",
      value: "roverScoutMember",
    },
    {
      label: "সহকারী রোভার মেট",
      value: "assistantRoverMate",
    },
    {
      label: "রোভার মেট",
      value: "roverMate",
    },
    {
      label: "সিনিয়র রোভার মেট",
      value: "seniorRoverMate",
    },
  ] as const;
  
  
  export const ROLES_ADULT_CUB_ROLE = [
    {
      label: "গ্রুপ স্কাউট লিডার",
      value: "roverScoutLeader",
    },
    {
      label: "কাব স্কাউট লিডার",
      value: "roverScoutMember",
    },
    {
      label: "সহকারী কাব স্কাউট লিডার",
      value: "assistantRoverMate",
    },
  ] as const;
  
  export const ROLES_ADULT_ROVER_ROLE = [
    {
      label: "গ্রুপ স্কাউট লিডার",
      value: "roverScoutSohocor",
    },
    {
      label: "রোভার স্কাউট লিডার",
      value: "roverScoutLeader",
    },
    {
      label: "সহকারী রোভার স্কাউট লিডার",
      value: "assistantRoverScoutLeader",
    },
  ] as const;