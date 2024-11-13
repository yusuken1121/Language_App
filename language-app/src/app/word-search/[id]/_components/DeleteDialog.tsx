import { Copy, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useParams } from "next/dist/client/components/navigation";

export function DeleteDialog() {
  const params = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`/api/words/${params.id}`, { method: "DELETE" });
      toast.success("単語を削除しました。", { position: "top-center" });
      router.push("/word-search");
    } catch (error) {
      console.error(error);
      toast.error("単語を削除しませんでした。", { position: "top-center" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-secondary text-accent-foreground hover:bg-secondary/80"
          aria-label="Delete word"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-accent">
        <DialogHeader>
          <DialogTitle className="text-background">単語を削除</DialogTitle>
          <DialogDescription className="text-background">
            この単語を削除してもよろしいですか？
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex items-center justify-center space-x-2">
              <Button
                type="button"
                size="lg"
                className="w-[150px] bg-primary text-background"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleDelete}
                size="lg"
                className="w-[150px] bg-secondary text-background hover:bg-secondary/80"
              >
                削除
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}