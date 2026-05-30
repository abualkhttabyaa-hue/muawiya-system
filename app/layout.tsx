import "./globals.css";

export const metadata = {
  title: "مركز معاوية لتحفيظ القرآن الكريم وعلومه",
  description: "نظام الإدارة الذكي",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Tajawal', sans-serif" }} className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
