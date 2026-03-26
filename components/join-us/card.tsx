"use client";
import React, {useState} from "react";
import {CheckIcon, PencilIcon, PhotoIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useStorage} from "@/hooks/useStorage";
import {useRouter} from "next/navigation";
import { DialogSuccess } from "../dialog-success";

interface CardProps {
    id?: number;
    title: string;
    profile: string;
    tools: string;
    characteristics: string;
    icon: string;
    isEdit?: boolean;
    isSubmitted?: boolean;
    onSubmitted?: (value: boolean) => void;
    token?: string | null;
    onShow?: (value: boolean) => void;
}

export default function Card(props: CardProps) {
    const {
        id,
        title,
        profile,
        tools,
        characteristics,
        icon,
        isEdit = false,
        isSubmitted,
        onSubmitted,
        token,
        onShow
    } = props;

    const {removeItem} = useStorage();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(isEdit);
    const [editedTitle, setEditedTitle] = useState<string>(title);
    const [editedProfile, setEditedProfile] = useState<string>(profile);
    const [editedTools, setEditedTools] = useState<string>(tools);
    const [editedCharacteristics, setEditedCharacteristics] = useState<string>(characteristics);
    const [selectedImage, setSelectedImage] = useState(icon);

    const [dialog, setDialog] = useState({
        open: false,
        title: "¿Estás seguro de que quieres eliminar esta vacante?", 
        subTitle: "Esta acción no se puede deshacer.", 
        type: "warning"
    });

    const isAuthenticated = token !== null && token !== "";

    const handleSaveToApi = async () => {
        try {
            let method: string = "PATCH";
            let body: Partial<CardProps> = {
                id,
                title: editedTitle,
                profile: editedProfile,
                tools: editedTools,
                characteristics: editedCharacteristics,
                icon: selectedImage,
            };
            let url: string = "update";

            if (id === 0) {
                method = "POST";
                const bodyPost: Partial<CardProps> = {...body};
                delete bodyPost.id;
                body = bodyPost;
                url = "create";
            }

            const response = await fetch(`${process.env.NEXT_API_URL}/vacancies/${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });

            if (response.status === 401) {
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
                removeItem("token");
                document.cookie = "token=; path=/; max-age=0;";
                router.push("/");
                return;
            }

            if (response.ok) {
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
            }
        } catch (error) {
            console.error("Error al guardar en la API:", error);
            if (onSubmitted) onSubmitted(!isSubmitted);
            if (onShow) onShow(false);
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            await handleSaveToApi();
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setIsEditing(!isEditing);
        if (onShow) onShow(false);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_API_URL}/vacancies/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log("Tarjeta eliminada con éxito");
                setDialog((prev) => ({...prev, open: false}))
                if (onSubmitted) onSubmitted(!isSubmitted);
                if (onShow) onShow(false);
            }
        } catch (error) {
            console.error("Error al eliminar la tarjeta", error);
            if (onSubmitted) onSubmitted(!isSubmitted);
            if (onShow) onShow(false);
        }
    };

    const handleDialogDelete = () => {
        setDialog((prev) => ({...prev, open: true}));
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setSelectedImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div
            className="relative flex flex-col py-6 pl-6 pr-5 rounded-[14px] w-[284px] h-[360px] bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.16)] text-[#808080]
                        md:rounded-[25px] md:w-[400px] md:h-[550px] md:pl-9 md:pr-8 xl:rounded-[31px] xl:w-[552px] xl:h-[785px] xl:pl-12 xl:pr-11 xl:mt-8"
        >
            <DialogSuccess 
                dialog={dialog} 
                closeDialog={() => setDialog((prev) => ({...prev, open: false})) }
                handleAction={handleDelete}
            />

            {isAuthenticated && (
                <div className="absolute top-2 right-2 flex gap-2 md:top-4 md:right-4 md:gap-4">
                    <button onClick={handleEdit} className="img-shadow p-2 bg-white rounded-full hover:bg-gray-300">
                        {isEditing ? (
                            <CheckIcon className="w-5 h-5 text-green-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <PencilIcon className="w-5 h-5 text-gray-700 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                    <button
                        className="img-shadow p-2 bg-white rounded-full hover:bg-red-300"
                        onClick={isEditing ? handleCancel : handleDialogDelete}
                    >
                        {isEditing ? (
                            <XMarkIcon className="w-5 h-5 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        ) : (
                            <TrashIcon className="w-5 h-5 text-red-600 md:w-6 md:h-6 xl:w-8 xl:h-8"/>
                        )}
                    </button>
                </div>
            )}

            <div className="relative">
                {selectedImage === "" ? (
                    <PhotoIcon
                        className="absolute rounded-full p-2 bg-white img-shadow top-[-50px] left-1/2 -translate-x-1/2 w-[48px] md:w-[70px] md:top-[-60px] xl:p-4 xl:w-[125px] xl:top-[-85px]"
                    />
                ) : (
                    <img
                        src={selectedImage}
                        alt={title}
                        className="absolute img-shadow top-[-60px] left-1/2 -translate-x-1/2 w-[75px] md:w-[80px] md:top-[-65px] xl:w-[150px] xl:top-[-95px]"
                    />
                )}

                {isEditing && (
                    <>
                        <label
                            htmlFor="imageUpload"
                            className="absolute img-shadow top-[-60px] right-[75px] cursor-pointer bg-white p-2 rounded-full shadow-md hover:bg-gray-300 md:right-[115px] xl:top-[-80px] xl:right-[160px]"
                        >
                            <PencilIcon className="w-4 h-4 text-gray-700 md:w-4 md:h-4 xl:w-6 xl:h-6"/>
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </>
                )}
            </div>

            <div className="flex flex-col mt-[36px] xl:mt-[86px]">
                {isEditing ? (
                    <input
                        className="text-[12px] text-[#00178F] font-bold w-full border border-gray-300 rounded p-1 md:text-[18px] xl:text-[28px]"
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <span
                        className="text-[12px] text-[#00178F] font-bold md:text-[18px] xl:text-[28px]">{editedTitle}</span>
                )}
                <div>
                    <div className="flex flex-col h-[245px] md:h-[400px] xl:h-[550px] overflow-y-auto">
                        <span className="text-[12px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Perfil:</span>
                        <div className="text-[12px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                            {isEditing ? (
                                <textarea
                                    className="text-[12px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                    value={editedProfile}
                                    onChange={(e) => setEditedProfile(e.target.value)}
                                    rows={5}
                                />
                            ) : (
                                    <p className="text-[12px] md:text-[15px] xl:text-[20px] whitespace-pre-line">
                                        {profile}
                                    </p>
                                )}
                        </div>
                        <span
                            className="text-[12px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Herramientas:</span>
                        <div className="text-[12px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                            {isEditing ? (
                                <textarea
                                    className="text-[12px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                    value={editedTools}
                                    onChange={(e) => setEditedTools(e.target.value)}
                                    rows={5}
                                />
                            ) : (
                                    <p className="text-[12px] md:text-[15px] xl:text-[20px] whitespace-pre-line">
                                        {tools}
                                    </p>
                            )}
                        </div>
                        <span
                            className="text-[12px] font-black mt-2 md:text-[15px] xl:text-[20px] xl:mt-4">Características:</span>
                        <div className="text-[12px] font-medium flex flex-col leading-tight md:text-[15px] xl:text-[20px]">
                            {isEditing ? (
                                <textarea
                                    className="text-[12px] font-medium w-full border border-gray-300 rounded p-1 md:text-[15px] xl:text-[20px]"
                                    value={editedCharacteristics}
                                    onChange={(e) => setEditedCharacteristics(e.target.value)}
                                    rows={5}
                                />
                            ) : (
                                    <p className="text-[12px] md:text-[15px] xl:text-[20px] whitespace-pre-line" >
                                        {characteristics}
                                    </p>
                            )}
                        </div>
                    </div>
                    <div className="lg:mt-2">
                        <span className="text-[#00178F] text-[10px] font-black md:text-[16px] xl:text-[22px]">
                            Envia tu CV a: {" "}
                            <a
                                className='hover:underline hover:duration-500'
                                href="mailto:rh@tibs.com.mx">
                                rh@tibs.com.mx
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};
