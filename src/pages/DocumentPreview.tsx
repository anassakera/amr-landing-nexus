import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Edit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/DocumentPreview.css';

const DocumentPreview = () => {
  const location = useLocation();
  const documentData = location.state;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const documentRef = useRef(null);

  // Format date to Gregorian format in Arabic
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Format as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handler for printing - Fixed to ensure proper printing
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: 'محضر_تحديد_الحاجيات',
    onBeforePrint: () => {
      // Add any setup needed before printing
      toast({
        title: "جاري إعداد الطباعة",
        description: "يرجى الانتظار"
      });
    },
    onPrintError: () => {
      toast({
        variant: "destructive",
        title: "خطأ في الطباعة",
        description: "يرجى المحاولة مرة أخرى"
      });
    },
    onAfterPrint: () => {
      toast({
        title: "تمت الطباعة بنجاح",
        description: "تم إرسال المحضر إلى الطابعة"
      });
    },
    removeAfterPrint: true
  });

  // Handler for downloading PDF
  const handleDownloadPDF = async () => {
    toast({
      title: "جاري تحضير الملف...",
      description: "يرجى الانتظار"
    });
  
    const alertElement = documentRef.current.querySelector('.document-alert');
    if (alertElement) alertElement.style.display = 'none'; // إخفاء التنبيه مؤقتًا
  
    try {
      const input = documentRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
  
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('محضر_تحديد_الحاجيات.pdf');
  
      toast({
        title: "تم تنزيل الملف بنجاح",
        description: "تم حفظ المحضر بتنسيق PDF"
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل في إنشاء ملف PDF"
      });
    } finally {
      if (alertElement) alertElement.style.display = ''; // إظهار التنبيه مجددًا
    }
  };
  

  // Handler for editing the document
  const handleEdit = () => {
    navigate('/needs-document', { state: documentData });
  };

  return (
    <div className="document-preview-container">
      <Header />
      
      <div className="preview-content">
        <h1 className="preview-title">معاينة محضر تحديد الحاجيات</h1>
        
        {/* Document Preview */}
        <div className="document-wrapper">
          <div className="document-preview" ref={documentRef}>
            {/* Alert / Disclaimer */}
            <div className="document-alert">
              <span className="alert-icon">!</span>
              <p>تنبيه: هذا محضر نموذجي وقد يتطلب مراجعة قانونية مختصة قبل استخدامه.</p>
            </div>
            
            {/* Document Content */}
            <div className="document-paper">
              <h2 className="document-header">محضر تحديد الحاجيات</h2>
              
              <div className="document-info">
                <div className="info-row">
                  <span className="info-label">المؤسسة:</span>
                  <span className="info-value">{documentData?.organizationName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">العنوان:</span>
                  <span className="info-value">{documentData?.address}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">الهاتف:</span>
                  <span className="info-value">{documentData?.phone}</span>
                </div>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">تفاصيل الاجتماع</h3>
                <div className="info-row">
                  <span className="info-label">التاريخ:</span>
                  <span className="info-value">{formatDate(documentData?.documentDate)}</span>
                </div>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">الغرض:</h3>
                <p className="purpose-text">تحديد الحاجيات الضرورية لتنفيذ المشاريع المسطرة من طرف الجمعية. وفقاً للأهداف المسطرة في برنامج العمل السنوي.</p>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">الحاضرون</h3>
                <div className="attendees-list">
                  {documentData?.attendees?.map((attendee, index) => (
                    <div key={attendee.id} className="attendee-item">
                      <span className="attendee-number">{index + 1}. </span>
                      <span className="attendee-name">السيد(ة) {attendee.name} - {attendee.position}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">الحاجيات المحددة</h3>
                <table className="needs-table">
                  <thead>
                    <tr>
                      <th>الرقم الترتيبي</th>
                      <th>الوصف</th>
                      <th>الكمية المطلوبة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentData?.needs?.map((need, index) => (
                      <tr key={need.id}>
                        <td>{index + 1}</td>
                        <td>{need.name} {need.specifications ? `- ${need.specifications}` : ''}</td>
                        <td>{need.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">التوصيات والقرارات</h3>
                <ul className="recommendations-list">
                  <li>رفع هذا المحضر إلى الجهات المختصة في الجمعية قصد اتخاذ الإجراءات اللازمة لاقتناء الحاجيات.</li>
                  <li>تحديد ميزانية تقريبية لكل بند من الحاجيات.</li>
                  <li>البحث عن ممولين أو شركاء للمساهمة في تلبية هذه المتطلبات.</li>
                  <li>التنسيق مع المؤسسة التعليمية لضمان التنفيذ وفق الأولويات.</li>
                  {documentData?.notes && <li>{documentData.notes}</li>}
                </ul>
              </div>
              
              <div className="document-section">
                <h3 className="section-header">توقيعات الأعضاء الحاضرين</h3>
                <table className="signatures-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الصفة</th>
                      <th>التوقيع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentData?.attendees?.map((attendee) => (
                      <tr key={attendee.id}>
                        <td>{attendee.name}</td>
                        <td>{attendee.position}</td>
                        <td className="signature-cell"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="document-footer">
                <p>حرر في {documentData?.city} بتاريخ {formatDate(documentData?.documentDate)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - تمت إزالة زر تنزيل كصورة */}
        <div className="document-actions">
  <button className="action-btn edit-btn" onClick={handleEdit}>
    <Edit size={20} />
    <span>تعديل</span>
  </button>
  <button className="action-btn download-btn" onClick={handleDownloadPDF}>
    <Download size={20} />
    <span>حفظ PDF</span>
  </button>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default DocumentPreview;