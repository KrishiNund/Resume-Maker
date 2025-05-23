import { PDFViewer } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { ResumePreviewProps } from '../types/resume';

export default function ResumeViewer(props: ResumePreviewProps) {
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <ResumePDF {...props} />
      </PDFViewer>
    </div>
  );
}