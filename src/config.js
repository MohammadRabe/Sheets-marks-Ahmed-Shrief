export const STAGES = {
  primary: {
    name: "ابتدائي",
    levels: ["الرابع", "الخامس", "السادس"],
    apiUrl: "https://script.google.com/macros/s/AKfycbwEDbayeEbfvdDrSpXooC7kB1fl0OM0SQ3qC3VajtNmjKorp4NTZ_uQGvvfVwi4y58rGQ/exec",
  },
  preparatory: {
    name: "إعدادي",
    levels: ["أولى إعدادي", "تانية إعدادي", "تالتة إعدادي"],
    apiUrl: "https://script.google.com/macros/s/AKfycbwyxnNPt653lxhakpG38NI5m3UuPrILST5n_fVOeHASG2NZZXz4JpMmiQ-LNB4UFgCm/exec",
  },
  secondary: {
    name: "ثانوي",
    levels: ["أولى ثانوي", "تانية ثانوي", "تالتة ثانوي"],
    apiUrl: "https://script.google.com/macros/s/AKfycbwqTf45fphc02O5e-RYFuTArpVOgxyaJZKLkAPfPPZeIvfR5C-Fv6kCu_ruVJ4OcuGa/exec",
  },
};

export const SCHEDULES_API_URL = import.meta.env.VITE_SCHEDULES_API_URL || "https://script.google.com/macros/s/AKfycbwp0SVOzO36RpL2s4Bd3Z3M3_9JHLRCyMKVEw5IRLudLVzA_gQ3WjdalWWCynVTxn_ekw/exec";

export const GRADE_LABELS = {
  Code: "كود الطالب",
  Name: "اسم الطالب",
  "Total Percentage": "النسبة الإجمالية",
};
