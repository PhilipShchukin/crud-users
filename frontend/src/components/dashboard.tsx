import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TooltipProvider,
} from "@/components/ui";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/store/slices/usersSlice";
import { AppDispatch } from "@/store/store";
import { UserService } from "@/services/user.service";
import { PaginationGroup, TableGroup } from "./shared";
import { UserForm } from "./shared/user/user-form";

export function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const [countPage, setCountPage] = useState<number>(1);

  useEffect(() => {
    const fetchUserCount = async () => {
      const data = await UserService.getCountUsers();
      setCountPage(data.data);
    };
    fetchUserCount();
  }, []);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <UserForm />
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Users</CardTitle>
                  </CardHeader>
                  <CardContent className=" h-[450px]">
                    <TableGroup />
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      <PaginationGroup
                        countPage={countPage}
                        page={page}
                        setPage={setPage}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
