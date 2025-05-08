import { FaClipboardList, FaMoneyBillWave, FaFileContract, FaUsers, FaFileInvoice, FaClipboardCheck, FaTools } from 'react-icons/fa';
import '../styles/DocumentsPlatform.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const DocumentsPlatform = () => {
  const documentTypes = [
    {
      title: "محضر تحديد الحاجيات",
      icon: <FaClipboardList className="icon" />,
      link: "/needs-document",
      disabled: false
    },
    {
      title: "طلب عرض الأثمان",
      icon: <FaMoneyBillWave className="icon" />,
      disabled: true
    },
    {
      title: "طلب العروض",
      icon: <FaFileContract className="icon" />,
      disabled: true
    },
    {
      title: "محضر الإجتماع",
      icon: <FaUsers className="icon" />,
      disabled: true
    },
    {
      title: "Bon de Commande",
      icon: <FaFileInvoice className="icon" />,
      disabled: true
    },
    {
      title: "محضر إنهاء الأشغال",
      icon: <FaClipboardCheck className="icon" />,
      disabled: true
    },
    {
      title: "محضر تسليم المعدات",
      icon: <FaTools className="icon" />,
      disabled: true
    }
  ];

  return (
    <>
      <Header />
    <div className="container">
      <section className="selection-screen active">

        <header>
          <h1>منصة إنشاء محاضر تحديد الحاجيات</h1>
          <p>اختر نوع المحضر الذي ترغب في إنشائه:</p>
        </header>

        <div className="contract-types">
          {documentTypes.map((doc, index) => (
            doc.disabled ? (
              <button 
                key={index}
                className="contract-type-btn"
                disabled
              >
                {doc.icon}
                <span>{doc.title}</span>
                <small>قريبا..</small>
              </button>
            ) : (
<Link
  key={index}
  to={doc.link}
  className="contract-type-btn"
>
                {doc.icon}
                <span>{doc.title}</span>
              </Link>
            )
          ))}
        </div>

        <footer>
          <p>المعلومات المقدمة تستخدم فقط لإنشاء المحضر.</p>
        </footer>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default DocumentsPlatform;