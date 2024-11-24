"use client"

import { Scout, Unit } from '@prisma/client';
import { Page, Text, View, Document, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { DownloadIcon, File } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent, CardTitle, Card } from '@/components/ui/card';

import { formattedStr } from '@/lib/utils';

interface ScoutWithUnit extends Scout {
    unit: Unit | null;
}

interface Props {
    scout: ScoutWithUnit
}

export const ScoutFormPdf = ({ scout }: Props) => {
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (isDownloading) {
            const timer = setTimeout(() => {
                window.close();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isDownloading]);

    const handleDownloadClick = () => {
        setIsDownloading(true);
    };
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Card className="w-full max-w-md">
                <CardContent className="grid gap-6 p-6">
                    <div className="flex items-center gap-4">
                        <File className='w-14 h-14' />
                        <div className="space-y-1">
                            <CardTitle>Application Form</CardTitle>
                            <p className="text-muted-foreground">Download and preserve this application form for further purpose.</p>
                        </div>
                    </div>
                    <PDFDownloadLink document={<ScoutPdf scout={scout} />} fileName={`${scout.name} Form`}>
                        {({ loading }) => (
                            <Button onClick={handleDownloadClick} disabled={loading}>
                                <DownloadIcon className="mr-2 h-5 w-5" />
                                {loading ? 'Preparing document...' : 'Download'}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </CardContent>
            </Card >
        </div>
    )
}



const ScoutPdf = ({ scout }: Props) => {
    return (
        <Document>
            <Page size="A4" dpi={72} style={{ padding: "20px 20px 20px 40px", border: "1px solid black" }}>
                <View style={{ flexDirection: "row", gap: "20px", alignItems: "center" }}>
                    <Image
                        src="https://utfs.io/f/ff400641-d733-459f-80ac-93619aa5ad4a-1zbfv.png"
                        style={{ width: "70px", height: "70px", objectFit: "contain" }}
                    />
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text>Armed Police Battalion Scout Group</Text>
                        <View style={{ backgroundColor: "black", color: "white", padding: "5px 3px", width: "150px", margin: "5px auto", fontSize: "16px" }}>
                            <Text style={{ textAlign: 'center' }}>Admission Form</Text>
                        </View>
                        <Text style={{ fontSize: "14px", }}>A.P.S: {scout.apsId ? scout.apsId : "N/A"}</Text>
                    </View>
                    <View style={{ border: "1px dotted black", padding: "5px" }}>
                        <Image
                            src={scout.imageUrl}
                            style={{ width: "70px", height: "90px", objectFit: "contain" }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ textAlign: "center", margin: "15px 0", borderBottom: "1px solid black" }}>Personal Information</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>01. Name:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>02. Father Name:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.fatherName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>03. Mother Name:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.motherName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>04. Address:</Text>
                        <Text style={{ fontSize: "14px" }}>{`${scout.villageHouse}, ${scout.roadBlockSector}, ${scout.thana}, ${scout.district}, ${scout.division}`}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>05. Date of Birth:</Text>
                        <Text style={{ fontSize: "14px" }}>{format(scout.dob, "dd MMM yyyy")}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>06. Religion:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.religion}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>07. Institute Name:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.institute}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>08. Mobile No:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.phone}</Text>
                    </View>
                </View>

                <View style={{ marginTop: "10px" }}>
                    <Text style={{ textAlign: "center", margin: "15px 0", borderBottom: "1px solid black" }}>Scout Information</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>01. Section:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.section}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>02. Unit:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout?.unit?.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>03. Role:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.role.map(item => formattedStr(item))}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>04. District:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.scoutDistrict}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <Text style={{ fontSize: "14px", width: "150px" }}>05. Region:</Text>
                        <Text style={{ fontSize: "14px" }}>{scout.scoutRegion}</Text>
                    </View>
                </View>

                <View style={{ marginTop: "30px", flexDirection: "row", gap: "5px", alignItems: "center" }}>
                    <Image
                        src="/check.jpg"
                        style={{ width: "25px", height: "25px" }}
                    />
                    <Text style={{ fontSize: "14px" }}>I am agree with the terms and conditions of APBn Scouts Group.</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "150px" }}>
                    <Text style={{ fontSize: "14px", borderTop: "1px dotted black" }}>Scout Signature</Text>
                    <Text style={{ fontSize: "14px", borderTop: "1px dotted black" }}>Author Signature</Text>
                </View>
            </Page>
        </Document>
    )
}