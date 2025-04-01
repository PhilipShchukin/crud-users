import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { useAppSelector } from "@/store/store";
import { UserItem } from "./user";

export const TableGroup: React.FC = () => {
  const { items } = useAppSelector((state) => state.user);

  return (
    <>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name / Gender</TableHead>
            <TableHead>Place Of Residence</TableHead>
            <TableHead className="hidden md:table-cell">Height</TableHead>
            <TableHead className="hidden md:table-cell">Weight</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <UserItem item={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};
