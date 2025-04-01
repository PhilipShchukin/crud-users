import { useState, useRef } from "react";
import axios from "axios";
import { IUser } from "@/services/user.interface";

export const useImageUpload = (item: IUser | undefined) => {
  const [imageUrl, setImageUrl] = useState<string>(item?.avatarPath || "");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];

      if (!file) return;

      formData.append("image", file);

      const { data } = await axios.post(
        "http://localhost:4200/api/users/upload",
        formData
      );

      setImageUrl(data.data.filename);
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке изображения");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return {
    imageUrl,
    inputFileRef,
    handleChangeFile,
    onClickRemoveImage,
    onButtonClick,
    setImageUrl,
  };
};