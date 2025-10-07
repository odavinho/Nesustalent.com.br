"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    data: any;
}

export function CodeBlock({ title, description, icon, data }: CodeBlockProps) {
    const { toast } = useToast();
    const [hasCopied, setHasCopied] = useState(false);

    const dataString = JSON.stringify(data, null, 2);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dataString);
        setHasCopied(true);
        toast({ title: "Copiado!", description: `Os dados de "${title}" foram copiados para a área de transferência.` });
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            {icon}
                            {title}
                        </CardTitle>
                        <CardDescription className="mt-2">{description}</CardDescription>
                    </div>
                     <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                        {hasCopied ? <Check className="text-green-500" /> : <Clipboard />}
                        <span className="sr-only">Copiar código</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto max-h-[400px]">
                    <code>
                        {dataString}
                    </code>
                </pre>
            </CardContent>
        </Card>
    );
}
