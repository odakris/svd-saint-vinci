// /app/dashboard/import/components/FeedbackDialog.tsx
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{message}</DialogTitle>
        <DialogDescription>Your student data has been processed.</DialogDescription>
        <DialogFooter>
          <Button onClick={() => onClose()}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
