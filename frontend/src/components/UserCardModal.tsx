import { User } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: User | undefined;
};

export default function UserCardModal({
  open,
  setOpen,
  selectedUser,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedUser?.name}</DialogTitle>
          <DialogDescription>
            <h2>{selectedUser?.username}</h2>
            <h3>{selectedUser?.email}</h3>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <p>
            {selectedUser?.address.city} - {selectedUser?.address.street}
          </p>
          <p>{selectedUser?.phone}</p>

          <h3>{selectedUser?.company.name}</h3>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
