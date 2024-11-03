"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];

export default function page() {
  const router = useRouter();
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Selamat Datang 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex"></div>
        </div>
        <h1>
          Untuk menambahkan data kuliner, silahkan klik tombol di bawah ini
        </h1>
        <Button onClick={() => router.push("/dashboard/kuliner")}>
          Kuliner
        </Button>
      </div>
    </PageContainer>
  );
}
