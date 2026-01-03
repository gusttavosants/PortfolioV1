import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfData: string;
  title: string;
}

const PdfViewer = ({ isOpen, onClose, pdfData, title }: PdfViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6 pt-0">
          <iframe
            src={pdfData}
            className="w-full h-[70vh] border rounded"
            title={`Visualizar PDF - ${title}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
