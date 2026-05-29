import { redirect } from "next/navigation";

export default function Home() {
  // هذه الوظيفة تقوم بتحويل أي شخص يفتح الموقع مباشرة إلى صفحة تسجيل الدخول
  redirect("/login");
}
