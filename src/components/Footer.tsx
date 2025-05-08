import  { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="main-footer" dir="rtl">
        <div className="container-wide">
          <div className="footer-sections">
            <div className="footer-col">
              <h4>منصة المحاضر</h4>
              <p>
                منصة متخصصة لإنشاء محاضر تحديد الحاجيات احترافية
                بسهولة وسرعة وفقاً للقوانين المغربية.
              </p>
            </div>

            <div className="footer-col">
              <h4>روابط مهمة</h4>
              <ul>
                <li><a href="#">الشروط والأحكام</a></li>
                <li><a href="#">سياسة الخصوصية</a></li>
                <li><a href="#">الأسئلة الشائعة</a></li>
                <li><a href="#">اتصل بنا</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>تواصل معنا</h4>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/hajar-chakloul-62b24a262?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B15OvTQSxS2SlGO%2Bxg%2B3kyw%3D%3D"><FaLinkedinIn /></a>
                <a href="https://www.linkedin.com/in/hajar-chakloul-62b24a262?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B15OvTQSxS2SlGO%2Bxg%2B3kyw%3D%3D"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/hajar-chakloul-62b24a262?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B15OvTQSxS2SlGO%2Bxg%2B3kyw%3D%3D"><FaTwitter /></a>
                <a href="https://www.linkedin.com/in/hajar-chakloul-62b24a262?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B15OvTQSxS2SlGO%2Bxg%2B3kyw%3D%3D"><FaFacebookF /></a>
              </div>
            </div>
          </div>

          <div className="copyright">
            <p>© {currentYear} منصة المحاضر. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/212707817549" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
        <FaWhatsapp />
      </a>
    </>
  );
};

export default Footer;