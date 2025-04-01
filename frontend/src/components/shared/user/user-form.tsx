import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Label,
  DialogDescription,
  Slider,
  Checkbox,
} from "@/components/ui";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PlusCircle, UserRoundPen } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/slices/usersSlice";
import { UserService } from "@/services/user.service";
import type { IUser, UserItemProps } from "@/services/user.interface";
import { useImageUpload } from "@/hooks/use-image-upload";

export function UserForm({ item }: UserItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    imageUrl,
    inputFileRef,
    handleChangeFile,
    onClickRemoveImage,
    onButtonClick,
    setImageUrl,
  } = useImageUpload(item);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    data.avatarPath = imageUrl;

    if (!item) {
      UserService.create(data);
    } else {
      UserService.update(item?.id || "", data);
    }

    setTimeout(() => {
      dispatch(fetchUsers(1));
      setImageUrl("");
    }, 1000);
    reset();
  };

  return (
    <Dialog>
      {item ? (
        <DialogTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="default">
            <UserRoundPen className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? "Update user" : "Create user"}</DialogTitle>
          <DialogDescription>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
            {imageUrl && (
              <>
                <Avatar className="size-36 ml-32">
                  <AvatarImage src={`http://localhost:4200/${imageUrl}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={item?.name || ""}
              className="col-span-3"
              type="text"
              placeholder="Name"
              {...register("name", { required: true, max: 0, min: 3 })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="surname" className="text-right">
              Surname
            </Label>
            <Input
              id="surname"
              defaultValue={item?.surname || ""}
              className="col-span-3"
              type="text"
              placeholder="Surname"
              {...register("surname", { required: true, max: 5, min: 3 })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>

            <Controller
              name="gender"
              control={control}
              defaultValue={item?.gender || ""}
              render={({ field }) => (
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "man"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "man" : "")
                      }
                    />
                    <span>man</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "woman"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "woman" : "")
                      }
                    />
                    <span>woman</span>
                  </label>
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height
            </Label>

            <Controller
              name="height"
              control={control}
              defaultValue={item?.height || undefined}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex w-72 gap-4">
                  <Slider
                    defaultValue={item ? [Number(item?.height)] : undefined}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={100}
                    max={200}
                    step={1}
                    className="w-52"
                  />
                  <div>{field?.value || "0"} см.</div>
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>

            <Controller
              name="weight"
              control={control}
              defaultValue={item?.weight || undefined}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex w-72 gap-4">
                  <Slider
                    defaultValue={item ? [Number(item.weight)] : undefined}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={40}
                    max={200}
                    step={1}
                    className="w-52"
                  />
                  <div>{field?.value || "0"} кг.</div>
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placeOfResidence" className="text-right">
              Place Of Residence
            </Label>
            <Input
              id="placeOfResidence"
              defaultValue={item?.placeOfResidence || ""}
              className="col-span-3"
              type="text"
              placeholder="Place Of Residence"
              {...register("placeOfResidence", { required: true })}
            />
          </div>

          <DialogFooter>
            {imageUrl == "" ? (
              <Button type="button" onClick={() => onButtonClick()}>
                Загрузить фото
              </Button>
            ) : (
              <Button
                type="button"
                variant={"destructive"}
                onClick={onClickRemoveImage}
              >
                Удалить
              </Button>
            )}

            <DialogTrigger asChild>
              <Button type="submit" disabled={!isValid}>
                Save user
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
