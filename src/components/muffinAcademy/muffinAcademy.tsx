import { useEffect, useState } from "react";
import axios from "axios";
import academyHeader from "@/assets/academy-header.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoxIcon, Grid2x2, List } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Post {
  authorized: boolean;
  ip_address: string;
  post_id: string;
  post_uuid: string;
  post_title: string;
  post_text: string;
  post_language: string;
}

const MuffinAcademy = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("landing_uuid", "583CB433-1EFA-470A-9DD5-17EC63EBADF7");
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://muffinapi.azurewebsites.net/landing_posts.php",
          formData
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute flex justify-center items-center text-white flex-col">
          <h1 className="text-6xl font-semibold">Muffin Academy</h1>
          <p className="mt-4">
            <span className="font-light">Home</span> / Muffin Academy
          </p>
        </div>
        <img src={academyHeader} alt="academy-header" />
      </div>
      <div className="w-full h-full px-36 py-12">
        <div className="flex justify-between p-8 rounded-lg bg-[#F5F5F5]">
          <div className="flex items-center space-x-2 text-[#1B2950]">
            <Button
              variant={"ghost"}
              className="font-semibold w-min p-0"
              onClick={() => setView("grid")}
            >
              <Grid2x2 className="mr-2" />
              Grid
            </Button>
            <div className="w-[1px] h-full bg-[#CACACA]/50" />
            <Button
              variant={"ghost"}
              className="font-semibold w-min p-0"
              onClick={() => setView("list")}
            >
              <List className="mr-2" />
              List
            </Button>
            <div className="w-[1px] h-full bg-[#CACACA]/50" />
            <Button variant={"ghost"} className="font-semibold w-min p-0">
              <BoxIcon className="mr-2" />
              Categories
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[180px] rounded-full text-[#1B2950] border-[#1B2950]">
              <SelectValue placeholder="Default sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={`grid ${view === "grid" ? "grid-cols-3 gap-4" : "grid-cols-1"} mt-8`}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-lg gap-2 bg-white">
                <Skeleton className="w-96 h-52 rounded-2xl object-cover" />
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <a
                href="/"
                key={post.post_id}
                className={cn(
                  "text-[#1B2950] p-4 rounded-lg bg-white",
                  view == "list" ? "flex justify-start items-center" : "block"
                )}
              >
                <img
                  src={`https://muffin0.blob.core.windows.net/posts/${post.post_id}.png`}
                  alt={post.post_title}
                  className="w-96 h-52 rounded-2xl object-cover"
                />
                <div
                  className={cn(
                    "text-[#1B2950] p-4 rounded-lg bg-white",
                    view == "list" ? "mr-8" : ""
                  )}
                >
                  <p className="font-light mt-2 text-sm">11 Jan 2024</p>
                  <h3 className="text-xl font-bold">{post.post_title}</h3>
                </div>
              </a>
            ))
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button disabled={isLoading} className="rounded-full">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MuffinAcademy
