"use client"

import { Scout } from "@prisma/client"
import QRCode from "qrcode";

import { formatString } from "@/lib/utils"
import { PDFViewer, Document, Page, View, Text, Image } from "@react-pdf/renderer"
import { useEffect, useState } from "react";

interface Props {
    scout: Scout
}

export const ScoutCardPdf = ({ scout }: Props) => {
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const generateQrCode = async () => {
            const qrCode = await QRCode.toDataURL(`https://apbnscouts.org/search?apsId=${scout.id}`);
            setQrImageUrl(qrCode);
        }
        generateQrCode();
    }, [scout.apsId]);

    return (
        <div>
            <PDFViewer style={{ width: "1000px", height: "1000px" }}>
                <Document>
                    <Page size="A4" dpi={72} style={{ padding: "20px 20px 20px 40px", border: "1px solid black" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", gap: "20px" }}>
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
                                            style={{ width: "80px", height: "80px", }}
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
                                                <Text style={{ fontSize: "10px" }}>APS NO</Text>
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
            </PDFViewer>
        </div>
    )
}