import React, { useState } from "react";
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SentMessages = ({ sentMessages, clearSentMessages }) => {
    return (
        <div className="sent-messages">
            <Typography variant="h4">Gönderilmiş Mesajlar</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Başlık</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Açıklama</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Parametreler</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sentMessages.map((message) => (
                        <TableRow key={message.id}>
                            <TableCell>{message.title}</TableCell>
                            <TableCell>{message.description}</TableCell>
                            <TableCell>
                                <ul>
                                    {Object.entries(message.formData).map(([param, value]) => (
                                        <li key={param}>
                                            <strong>{param}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" onClick={clearSentMessages}>
                Gönderilmiş Mesajları Temizle
            </Button>
        </div>
    );
};

export default SentMessages;
