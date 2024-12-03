"use client"

import { Scout } from "@prisma/client"
import QRCode from "qrcode";

import { formatString } from "@/lib/utils"
import { Document, Page, View, Text, Image, PDFDownloadLink } from "@react-pdf/renderer"
import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon, File } from "lucide-react"

interface Props {
    scout: Scout
}

export const ScoutCardPdf = ({ scout }: Props) => {
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const generateQrCode = async () => {
            const qrCode = await QRCode.toDataURL(`https://apbnscouts.org/search?apsId=${scout.id}`);
            setQrImageUrl(qrCode);
        }
        generateQrCode();
    }, [scout.apsId]);

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
                            <CardTitle>Scout Card</CardTitle>
                            <p className="text-muted-foreground">Download and preserve this card for further purpose.</p>
                        </div>
                    </div>
                    <PDFDownloadLink document={<ScoutCardPdfCom scout={scout} qrImageUrl={qrImageUrl} />} fileName={`${scout.name} Card`}>
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

interface ScoutCardPdfComProps {
    scout: Scout
    qrImageUrl: string | null
}

const ScoutCardPdfCom = ({ scout, qrImageUrl }: ScoutCardPdfComProps) => {
    return (
        <Document>
            <Page size="A4" dpi={72} style={{ padding: "20px 20px 20px 40px", border: "1px solid black" }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: "20px", position: "relative" }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ border: "1px solid black", width: "170px", height: "260px" }}>
                            <View style={{ backgroundColor: "#211e6f", color: "white", padding: "10px 2px" }}>
                                <Text style={{ fontSize: "8px", fontWeight: "bold" }}>ARMED POLICE BATTALION SCOUT GROUP</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0 3px", marginTop: "-8px" }}>
                                <Image
                                    src={"https://www.apbnscouts.org/logo.png"}
                                    style={{ width: "30px", height: "30px", objectFit: "contain" }}
                                />
                                <Text style={{ fontSize: "12px", color: "green" }}>Bangladesh Scout</Text>
                                <Image
                                    src={"https://utfs.io/f/IzOFxTunA1CzDqROmul3BXcyUlRGpm1Q6MxvKei8WrdFzwks"}
                                    style={{ width: "30px", height: "50px", objectFit: "contain" }}
                                />
                            </View>

                            <View style={{ border: "1px solid black", width: "80px", height: "80px", margin: "-12px auto" }}>
                                <Image
                                    src={scout?.imageUrl}
                                    style={{ width: "80px", height: "100px", }}
                                />
                            </View>

                            <View style={{ padding: "0 3px", marginTop: "17px" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: "55px", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: "9px" }}>Name</Text>
                                        <Text style={{ fontSize: "9px" }}>:</Text>
                                    </View>
                                    <Text style={{ fontSize: scout?.name.length > 20 ? "8px" : "9px", textTransform: "capitalize", paddingLeft: "3px" }}>{scout?.name}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: "55px", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: "9px" }}>Designation</Text>
                                        <Text style={{ fontSize: "9px" }}>:</Text>
                                    </View>
                                    <Text style={{ fontSize: "9px", textTransform: "capitalize", paddingLeft: "3px" }}>{formatString(scout?.role[0] || "")}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: "55px", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: "10px" }}>Aps No</Text>
                                        <Text style={{ fontSize: "9px" }}>:</Text>
                                    </View>
                                    <Text style={{ fontSize: "9px", textTransform: "capitalize", paddingLeft: "3px" }}>{scout?.apsId}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: "55px", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: "9px" }}>Mobile</Text>
                                        <Text style={{ fontSize: "9px" }}>:</Text>
                                    </View>
                                    <Text style={{ fontSize: "9px", textTransform: "capitalize", paddingLeft: "3px" }}>{scout?.phone}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ width: "55px", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: "9px" }}>Blood Group</Text>
                                        <Text style={{ fontSize: "9px" }}>:</Text>
                                    </View>
                                    <Text style={{ fontSize: "9px", textTransform: "capitalize", paddingLeft: "3px" }}>{scout?.phone}</Text>
                                </View>
                            </View>

                            <View style={{ position: "absolute", bottom: "30px", left: "0", width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                                <Image
                                    src={scout?.cardSignatureUrl || ""}
                                    style={{ width: "100%", height: "20px", objectFit: "contain" }}
                                />
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute", bottom: "0", left: "0", width: "100%" }}>
                                <View style={{ backgroundColor: "#211e6f", width: "100%", height: "25px" }}>
                                </View>
                                <View style={{ backgroundColor: "#028340", width: "100%", height: "25px" }}>
                                </View>
                                <View style={{ backgroundColor: "#ee4423", width: "100%", height: "25px" }}>
                                </View>
                                <View style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "20px" }}>
                                    <Text style={{ fontSize: "10px", color: "white", textAlign: "center" }}>{scout?.cardSignatureAuthor}</Text>
                                    <Text style={{ fontSize: "10px", color: "white", textAlign: "center" }}>APBn Scout Group</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ border: "1px solid black", width: "170px", height: "260px", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                            <View style={{ borderBottom: "2px solid black", padding: "0 3px", margin: "0 auto", width: "73%" }}>
                                <Text style={{ fontSize: "10px", fontWeight: "bold" }}>If Found Please Return To</Text>
                            </View>
                            <View style={{ padding: "0 3px", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "3px" }}>
                                <Text style={{ fontSize: "7px", fontWeight: "bold" }}>ARMED POLICE BATTALION SCOUT GROUP</Text>
                                <Text style={{ fontSize: "7px", fontWeight: "bold" }}>ARMED POLICE BATTALION HEAD QUATER</Text>
                                <Text style={{ fontSize: "8px", textAlign: "center" }}>Sector-2, Uttara, Dhaka-1230</Text>
                                <Text style={{ fontSize: "8px", textAlign: "center" }}>Mobile: 01759481477</Text>
                            </View>
                            {qrImageUrl && (
                                <Image
                                    src={qrImageUrl}
                                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}