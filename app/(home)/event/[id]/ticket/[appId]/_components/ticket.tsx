"use client"

import { Button } from "@/components/ui/button";
import { CampApplication, CampMember } from "@prisma/client"
import Image from "next/image";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ApplicationWithMember extends CampApplication {
    members: CampMember[]
}

interface TicketProps {
    app: ApplicationWithMember;
}

export const Ticket = ({ app }: TicketProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleDownloadPDF = async () => {
        if (elementRef.current === null) return;
        setIsLoading(true);

        try {
            const image = await toPng(elementRef.current, {
                quality: 1,
                pixelRatio: 2,
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [794, 1123],
            });

            pdf.addImage(image, "PNG", 0, 0, 794, 1123);
            pdf.save("invoice.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            // You might want to add some error handling UI here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 flex flex-col items-center">
            <Button onClick={handleDownloadPDF} disabled={isLoading}>Download</Button>

            <div className="w-[790px] h-[1120px] border px-5 min-h-screen" ref={elementRef}>
                <div className="flex items-center justify-between py-8">
                    <Image src="/camp.jpg" width={200} height={200} alt="Camp logo" className="object-contain w-[100px] h-[100px] rounded-full" />
                    <div className="flex flex-col gap-y-2 items-center">
                        <h1 className="text-xl font-bold">আর্মড পুলিশ ব্যাটালিয়ন স্কাউট গ্রুপ</h1>
                        <h1 className="text-base font-semibold text-center">চড়ুইভাতি</h1>
                    </div>
                    <Image src="/logo.png" width={200} height={200} alt="Logo" className="object-contain w-[100px] h-[100px]" />
                </div>

                <h1 className="text-center text-2xl font-bold text-muted-foreground underline">Ticket Info</h1>

                <div className="space-y-2 mt-10">
                    <p className="font-semibold">Unit Name: <span className="font-normal ml-20">{app.unitName}</span></p>
                    <p className="font-semibold">Unit Leader: <span className="font-normal ml-[70px]">{app.unitLeaderName}</span></p>
                    <p className="font-semibold">Unit Leader Mobile: <span className="font-normal ml-3">{app.unitPhone}</span></p>
                </div>

                <h1 className="text-center text-2xl font-bold text-muted-foreground underline mt-6">Members</h1>

                <Table className="border mt-10">
                    <TableHeader>
                        <TableRow className="bg-accent/80">
                            <TableHead>SL</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead>Class</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            app.members.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.phone}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.section}</TableCell>
                                    <TableCell>{member.class}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
