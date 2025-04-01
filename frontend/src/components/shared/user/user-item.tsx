import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Badge,
  Button,
  TableCell,
  TableRow,
} from "@/components/ui";

import { useDispatch } from "react-redux";
import { removeUserById } from "@/store/slices/usersSlice";
import { UserService } from "@/services/user.service";
import { UserItemProps } from "@/services/user.interface";
import { UserForm } from "./user-form";

const MotionTableRow = motion(TableRow);

export function UserItem({ item }: UserItemProps) {
  const dispatch = useDispatch();

  const deleteUser = (id: number) => {
    dispatch(removeUserById({ id }));
    UserService.delete(id);
  };

  if (!item) return null;

  return (
    <>
      <MotionTableRow
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border-b transition-colors hover:bg-muted"
      >
        <TableCell className="hidden sm:table-cell ">
          <Link href={`/user/${item.id}`}>
            {item.avatarPath && (
              <img
                src={`http://localhost:4200/${item.avatarPath}`}
                alt={"avatar"}
              />
            )}
          </Link>
        </TableCell>
        <TableCell className="font-medium  ">
          <Link href={`/user/${item.id}`} className=" hover:shadow-md">
            {item.name + " " + item.surname} / {item.gender}
          </Link>
        </TableCell>

        <TableCell>
          <Badge variant="outline">{item.placeOfResidence}</Badge>
        </TableCell>

        <TableCell className="hidden md:table-cell">{item.height}</TableCell>
        <TableCell className="hidden md:table-cell">{item.weight}</TableCell>
        <TableCell className="hidden md:table-cell">
          {typeof item.createdAt === "string"
            ? item.createdAt.slice(0, 10) + " / " + item.createdAt.slice(11, 19)
            : "Invalid date"}
        </TableCell>

        <TableCell>
          <UserForm item={item} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="destructive">
                <X className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => deleteUser(item.id)}
                className="hover:cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </MotionTableRow>
    </>
  );
}
