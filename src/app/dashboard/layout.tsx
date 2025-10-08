import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Providing the messages to the client-side provider is required for the
    // shared Header component to work on dashboard pages.
    const messages = useMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <SidebarProvider>
                    <Sidebar>
                        <SidebarHeader>
                            <SidebarTrigger />
                        </SidebarHeader>
                        <SidebarContent>
                            {/* Sidebar content goes here in the future */}
                        </SidebarContent>
                    </Sidebar>
                    <SidebarInset>
                        <main className="flex-grow p-4 sm:p-6 lg:p-8">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </NextIntlClientProvider>
    );
}
