// src/data/stations.ts
export type Station = {
  code: string;
  name: {
    th: string;
    en: string;
  };
};

export const stations: Station[] = [
  { code: "A8", name: { th: "พญาไท", en: "Phaya Thai" } },
  { code: "A7", name: { th: "ราชปรารภ", en: "Ratchaprarop" } },
  { code: "A6", name: { th: "มักกะสัน", en: "Makkasan" } },
  { code: "A5", name: { th: "รามคำแหง", en: "Ramkhamhaeng" } },
  { code: "A4", name: { th: "หัวหมาก", en: "Hua Mak" } },
  { code: "A3", name: { th: "บ้านทับช้าง", en: "Ban Thap Chang" } },
  { code: "A2", name: { th: "ลาดกระบัง", en: "Lat Krabang" } },
  { code: "A1", name: { th: "สุวรรณภูมิ", en: "Suvarnabhumi" } },
];
