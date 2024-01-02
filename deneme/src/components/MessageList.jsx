import React, { useState, useEffect, useRef } from "react";
import "./MessageList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import SentMessages from "./SentMessages";

const firstMessages = [
    {
        id: 1,
        category: "Hava Arayüzü Mesajları",
        title: "Mesaj 1",
        description: "Bu bir test mesajıdır.",
        requiredParams: ["param1", "param2"],
        data: "",
    },
    {
        id: 2,
        category: "Hava Arayüzü Mesajları",
        title: "Mesaj 2",
        description: "Bu bir başka test mesajıdır.",
        requiredParams: ["param3"],
        data: "",
    },
    {
        id: 3,
        category: "Hava Arayüzü Mesajları",
        title: "Mesaj 3",
        description: "Bu da bir test mesajıdır.",
        requiredParams: ["param4", "param5"],
        data: "",
    },
    {
        id: 4,
        category: "Hava Arayüzü Mesajları",
        title: "Mesaj 4",
        description: "Yeni bir test mesajıdır.",
        requiredParams: ["param6"],
        data: "",
    },
    {
        id: 5,
        category: "Hava Arayüzü Mesajları",
        title: "Mesaj 5",
        description: "Son bir test mesajıdır.",
        requiredParams: ["param7"],
        data: "",
    },
    {
        id: 6,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 6",
        description: "Cihaz mesajıdır.",
        requiredParams: ["param8", "param9"],
        data: "",
    },
    {
        id: 7,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 7",
        description: "Çağrı mesajıdır.",
        requiredParams: [],
        data: "",
    },
    {
        id: 8,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 8",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param10", "param11", "param12", "param13"],
        data: "",
    },
    {
        id: 9,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 9",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param14", "param15", "param16", "param17"],
        data: "",
    },
    {
        id: 10,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 10",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param18", "param19", "param20", "param21"],
        data: "",
    },
    {
        id: 11,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 11",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param22", "param23", "param24", "param25"],
        data: "",
    },
    {
        id: 12,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 12",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param26", "param27", "param29", "param30"],
        data: "",
    },
    {
        id: 13,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 13",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param31", "param32", "param33", "param34"],
        data: "",
    },
    {
        id: 14,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 14",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param35"],
        data: "",
    },
    {
        id: 15,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 15",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param36", "param37"],
        data: "",
    },
    {
        id: 16,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 16",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param38",],
        data: "",
    },
    {
        id: 17,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 17",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param39", "param40", "param41", "param42"],
        data: "",
    },
    {
        id: 18,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 18",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param43"],
        data: "",
    },
    {
        id: 19,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 19",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: [],
        data: "",
    },
    {
        id: 20,
        category: "Cihaz ve Rehber Çağrı Mesajları",
        title: "Mesaj 20",
        description: "Başka bir çağrı mesajıdır.",
        requiredParams: ["param44"],
        data: "",
    },
];

const MessageList = () => {
    const [messages, setMessages] = useState(firstMessages);
    const [selectedMessageIds, setSelectedMessageIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const [sentMessages, setSentMessages] = useState([]);
    const [sentFormData, setSentFormData] = useState({});
    const [sections, setSections] = useState({
        havaArayuzu: false,
        cihazVeRehber: false,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMessageIds]);

    const handleSelectMessage = (message) => {
        setSelectedMessageIds((prevSelectedMessageIds) => {
            if (prevSelectedMessageIds.includes(message.id)) {
                return prevSelectedMessageIds.filter((id) => id !== message.id);
            } else {
                return [...prevSelectedMessageIds, message.id];
            }
        });
    };

    const handleToggle = (section) => {
        setSections((prevSections) => ({
            ...prevSections,
            [section]: !prevSections[section],
        }));
    };

    const getIcon = (section) => {
        return sections[section] ? <ExpandLess /> : <ExpandMore />;
    };

    const handleSelectAllMessages = () => {
        setSelectedMessageIds(messages.map((message) => message.id));
    };
    const handleRemoveSelectAllMessages = () => {
        setSelectedMessageIds("");
    }

    const selectedMessages = messages.filter((message) =>
        selectedMessageIds.includes(message.id)
    );

    const handleSearch = () => {
        const filtered = firstMessages.filter(
            (message) =>
                message.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setMessages(filtered);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setMessages(firstMessages);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleChange = (e, messageId) => {
        const { name, value } = e.target;
        setSentFormData((prevSentFormData) => ({
            ...prevSentFormData,
            [messageId]: {
                ...prevSentFormData[messageId],
                [name]: value,
            },
        }));
    };

    const handleDeleteMessage = (messageId) => {
        setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== messageId)
        );
        setSelectedMessageIds((prevSelectedMessageIds) =>
            prevSelectedMessageIds.filter((id) => id !== messageId)
        );
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleSubmit = (e, messageId) => {
        e.preventDefault();
        const selectedMessage = messages.find((message) => message.id === messageId);

        if (selectedMessage) {
            console.log("Gönderilen Bilgiler:");
            console.log("Açıklama Başlığı:", selectedMessage.title);
            console.log("Açıklama:", selectedMessage.description);
            console.log("Girilen Bilgiler:", sentFormData[messageId]);
            setSentMessages((prevSentMessages) => [
                ...prevSentMessages,
                { ...selectedMessage, formData: sentFormData[messageId] || {} },
            ]);

            setSelectedMessageIds((prevSelectedMessageIds) =>
                prevSelectedMessageIds.filter((id) => id !== messageId)
            );

            setSentFormData((prevSentFormData) => ({
                ...prevSentFormData,
                [messageId]: {},
            }));
        }
    };

    const handleSendSelectedMessages = () => {
        selectedMessages.forEach((message) => {
            setSentMessages((prevSentMessages) => [
                ...prevSentMessages,
                { ...message, formData: sentFormData[message.id] || {} },
            ]);

            setSentFormData((prevSentFormData) => ({
                ...prevSentFormData,
                [message.id]: {},
            }));
        });

        setSelectedMessageIds([]);
    };

    const handleClearSentMessages = () => {
        setSentMessages([]);
    };

    return (
        <div className="message-list-container">
            <div className="message-list">
                <Typography variant="h4">Mesaj Listesi</Typography>
                <div>
                    <input
                        type="text"
                        placeholder="Mesaj Ara..."
                        value={searchTerm}
                        onChange={handleSearchTerm}
                    />
                    <Button
                        className="search-button"
                        variant="contained"
                        onClick={handleSearch}
                    >
                        Ara
                    </Button>
                    <Button
                        className="search-button"
                        variant="contained"
                        onClick={handleClearSearch}
                    >
                        Aramayı Temizle
                    </Button>
                    <TableCell>
                        <input
                            type="checkbox"
                            checked={selectedMessageIds.length === messages.length}
                            onChange={handleSelectAllMessages}
                        />
                        <strong>Tümünü Seç</strong>
                    </TableCell>
                    <TableCell>
                        <input
                            type="checkbox"
                            checked={selectedMessageIds.length === messages.length}
                            onChange={handleRemoveSelectAllMessages}
                        />
                        <strong>Seçilmiş Mesajları Kaldır</strong>
                    </TableCell>
                </div>
                <Card className="card">
                    <CardContent>
                        <Button
                            sx={{ width: "100%", marginBottom: "0.5rem" }}
                            variant="contained"
                            onClick={() => handleToggle("havaArayuzu")}
                            endIcon={getIcon("havaArayuzu")}
                            size="small"
                        >
                            Örnek Mesaj 1
                        </Button>
                        <Collapse in={sections.havaArayuzu}>
                            <div
                                style={{
                                    maxHeight: "200px",
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography
                                                    sx={{ position: "relative", left: "90px" }}
                                                    variant="h6"
                                                >
                                                    Başlık
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{ position: "relative", left: "110px" }}
                                                    variant="h6"
                                                >
                                                    Açıklama
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages
                                            .filter(
                                                (message) => message.category === "Hava Arayüzü Mesajları"
                                            )
                                            .map((message) => (
                                                <TableRow key={message.id}>
                                                    <TableCell>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedMessageIds.includes(message.id)}
                                                            onChange={() => handleSelectMessage(message)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{message.title}</TableCell>
                                                    <TableCell>{message.description}</TableCell>
                                                    <TableCell>
                                                        {/* <Button
                                                            size="small"
                                                            color="error"
                                                            startIcon={<DeleteOutlineIcon />}
                                                            variant="outlined"
                                                            onClick={() => handleDeleteMessage(message.id)}
                                                        >
                                                            Sil
                                                        </Button> */}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Collapse>
                        <Button
                            sx={{ width: "100%", marginBottom: "0.5rem" }}
                            variant="contained"
                            onClick={() => handleToggle("cihazVeRehber")}
                            endIcon={getIcon("cihazVeRehber")}
                            size="small"
                        >
                            Örnek Mesaj 2
                        </Button>
                        <Collapse in={sections.cihazVeRehber}>
                            <div
                                style={{
                                    maxHeight: "200px",
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography
                                                    sx={{ position: "relative", left: "90px" }}
                                                    variant="h6"
                                                >
                                                    Başlık
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{ position: "relative", left: "110px" }}
                                                    variant="h6"
                                                >
                                                    Açıklama
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages
                                            .filter(
                                                (message) =>
                                                    message.category === "Cihaz ve Rehber Çağrı Mesajları"
                                            )
                                            .map((message) => (
                                                <TableRow key={message.id}>
                                                    <TableCell>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedMessageIds.includes(message.id)}
                                                            onChange={() => handleSelectMessage(message)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{message.title}</TableCell>
                                                    <TableCell>{message.description}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="small"
                                                            color="error"
                                                            startIcon={<DeleteOutlineIcon />}
                                                            variant="outlined"
                                                            onClick={() => handleDeleteMessage(message.id)}
                                                        >
                                                            Sil
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Collapse>
                    </CardContent>
                </Card>
            </div>
            <div className="selected-messages" ref={containerRef} onScroll={handleScroll}>
                <Typography variant="h4">
                    Seçilen Mesajlar
                </Typography>
                {selectedMessages.length > 0 && (
                    <div>
                        {selectedMessages.map((selectedMessage) => (
                            <div key={selectedMessage.id} className="message-details">
                                <Typography variant="h6">{selectedMessage.title}</Typography>
                                <Typography>{selectedMessage.description}</Typography>
                                <form onSubmit={(e) => handleSubmit(e, selectedMessage.id)} className="message-form">
                                    {selectedMessage.requiredParams.map((param) => (
                                        <div key={param} className="message-body">
                                            <label>{param}</label>
                                            <input
                                                type="text"
                                                name={param}
                                                value={sentFormData[selectedMessage.id]?.[param] || ""}
                                                onChange={(e) => handleChange(e, selectedMessage.id)}
                                            />
                                        </div>
                                    ))}
                                    <CardActions>
                                        <Button size="small" className="mui-button" type="submit" variant="outlined" startIcon={<SendOutlinedIcon />}>
                                            Gönder
                                        </Button>
                                    </CardActions>
                                </form>
                            </div>
                        ))}
                        <Button variant="contained" onClick={handleSendSelectedMessages}>
                            Seçilen Mesajları Gönder
                        </Button>
                    </div>
                )}
            </div>
            <SentMessages sentMessages={sentMessages} clearSentMessages={handleClearSentMessages} />
        </div>
    );
};

export default MessageList;
