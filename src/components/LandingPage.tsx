import React, { useState } from 'react';
import { 
  FaLaptopCode, FaUserGraduate, FaChartLine, FaTools, FaRegLightbulb, 
  FaUserTie, FaBriefcase, FaBolt, FaClipboardCheck, FaGraduationCap, 
  FaDesktop, FaBuilding, FaBroom, FaGlobe, FaHardHat
} from 'react-icons/fa';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add logic to handle the newsletter subscription
    console.log('Subscribing with email:', email);
    setEmail('');
    // Show success notification
    alert('تم الاشتراك بنجاح في النشرة الإخبارية!');
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add logic to handle the contact form submission
    console.log('Contact form submitted:', contactForm);
    setContactForm({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success notification
    alert('تم إرسال رسالتك بنجاح!');
  };

  return (
    <main className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">شريكك للنجاح والتميز</h1>
          <h2 className="hero-subtitle">شركة حلول أعمال متكاملة</h2>
          <p className="hero-description">
            نقدم حلولاً متكاملة في مجالات متعددة تشمل التكنولوجيا والتدريب المهني والاستشارات الإدارية والإنشاءات
            والخدمات الكهربائية والنظافة، ودعم رواد الأعمال والأنشطة المجتمعية.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">اكتشف خدماتنا</a>
            <a href="#contact" className="btn-secondary">تواصل معنا</a>
          </div>
        </div>
        <div className="hero-image">
        <img src="/images/image.png" alt="Business Solutions" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="section-header">
          <h2 className="section-title">خدماتنا الرئيسية</h2>
          <p className="section-description">
            نقدم مجموعة من الحلول التكنولوجية والإدارية لدعم نمو الأعمال في مختلف القطاعات
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaLaptopCode />
            </div>
            <h3>تكنولوجيا المعلومات</h3>
            <p>بيع وصيانة أجهزة الكمبيوتر، تطوير البرمجيات، خدمات السحابة</p>
            <a href="#" className="service-link">المزيد</a>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaUserGraduate />
            </div>
            <h3>التدريب المهني</h3>
            <p>تدريب في مجالات تكنولوجيا المعلومات، الإدارة، الإنشاءات، والسلامة المهنية</p>
            <a href="#" className="service-link">المزيد</a>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaChartLine />
            </div>
            <h3>الاستشارات والإدارة</h3>
            <p>استشارات إدارية، دراسات جدوى، إدارة مشاريع، خدمات الموارد البشرية</p>
            <a href="#" className="service-link">المزيد</a>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaTools />
            </div>
            <h3>الإنشاءات والكهرباء</h3>
            <p>أعمال الإنشاءات، التركيبات الكهربائية، أنظمة المراقبة</p>
            <a href="#" className="service-link">المزيد</a>
          </div>
        </div>

        <div className="services-action">
          <a href="#" className="btn-primary">تعرف على المزيد</a>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="section-header">
            <h2 className="section-title">الخبرة والحلول المتكاملة</h2>
            <p className="section-description">
              نقدم حلولاً متكاملة من خلال فريق محترف يمتلك خبرة واسعة في مختلف المجالات. هدفنا تمكين الأفراد والشركات من خلال تقديم خدمات عالية الجودة تعتمد على أحدث التقنيات والمعايير العالمية.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaRegLightbulb />
              </div>
              <h3>خدمات تكنولوجية وإدارية شاملة</h3>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUserTie />
              </div>
              <h3>برامج تدريب مهني معتمدة</h3>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaBriefcase />
              </div>
              <h3>حلول إنشائية وكهربائية متكاملة</h3>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaBolt />
              </div>
              <h3>خدمات نظافة احترافية</h3>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <FaClipboardCheck />
              </div>
              <h3>دعم رواد الأعمال والمبادرات المجتمعية</h3>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="About Us" />
        </div>
      </section>

      {/* Specialized Areas Section */}
      <section className="areas-section" id="areas">
        <div className="section-header">
          <h2 className="section-title">مجالات خدماتنا المتخصصة</h2>
          <p className="section-description">
            نقدم مجموعة شاملة من الحلول لدعم نمو الأعمال في مختلف القطاعات
          </p>
        </div>

        <div className="specialized-areas-grid">
          <div className="specialized-area-card">
            <div className="area-icon">
              <FaDesktop />
            </div>
            <h3>تكنولوجيا المعلومات والخدمات الرقمية</h3>
            <ul className="area-features">
              <li>بيع وصيانة وإصلاح معدات الحاسوب</li>
              <li>تطوير وتسويق البرمجيات</li>
              <li>استضافة وتصميم مواقع الويب وخدمات السحابة</li>
              <li>تركيب وإدارة شبكات الكمبيوتر</li>
              <li>توفير مستلزمات ومعدات المكاتب والمدارس</li>
            </ul>
          </div>

          <div className="specialized-area-card">
            <div className="area-icon">
              <FaGraduationCap />
            </div>
            <h3>التدريب المهني</h3>
            <ul className="area-features">
              <li>تدريب مهني في تكنولوجيا المعلومات</li>
              <li>تدريب مهني في الإدارة والتجارة</li>
              <li>تدريب تقني لمهن البناء والكهرباء</li>
              <li>تدريب في مجال السلامة والصحة المهنية</li>
            </ul>
          </div>

          <div className="specialized-area-card">
            <div className="area-icon">
              <FaChartLine />
            </div>
            <h3>الاستشارات والإدارة</h3>
            <ul className="area-features">
              <li>استشارات في إدارة وتنظيم الشركات</li>
              <li>دراسات الجدوى وخطط العمل</li>
              <li>إدارة المشاريع والموارد البشرية</li>
            </ul>
          </div>

          <div className="specialized-area-card">
            <div className="area-icon">
              <FaHardHat />
            </div>
            <h3>أعمال البناء والكهرباء</h3>
            <ul className="area-features">
              <li>أعمال البناء المتنوعة</li>
              <li>أعمال الكهرباء</li>
              <li>كاميرات المراقبة وأنظمة الأمان</li>
            </ul>
          </div>

          <div className="specialized-area-card">
            <div className="area-icon">
              <FaBroom />
            </div>
            <h3>خدمات ومعدات التنظيف</h3>
            <ul className="area-features">
              <li>بيع معدات ومنتجات التنظيف</li>
              <li>توزيع آلات التنظيف المهنية</li>
              <li>خدمات التنظيف للشركات والأفراد</li>
            </ul>
          </div>

          <div className="specialized-area-card">
            <div className="area-icon">
              <FaGlobe />
            </div>
            <h3>خدمات أخرى</h3>
            <ul className="area-features">
              <li>الاستيراد والتصدير</li>
              <li>دعم ريادة الأعمال</li>
              <li>الأنشطة المجتمعية والتضامنية</li>
              <li>مرافقة ودعم الخريجين الجدد</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header">
          <h2 className="section-title">شهادات عملائنا</h2>
          <p className="section-description">
            آراء عملائنا الكرام في خدماتنا المتنوعة
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"تعاملنا مع الشركة كان تجربة ممتازة، حيث قدموا لنا حلولاً تكنولوجية متكاملة ساهمت في تطوير أعمالنا بشكل كبير."</p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="محمد أحمد" />
              <div className="author-info">
                <h4>محمد أحمد</h4>
                <p>مدير شركة تكنولوجيا</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"البرامج التدريبية التي قدمتها الشركة كانت على مستوى عالٍ من الاحترافية، وساعدت فريقنا على تطوير مهاراته بشكل كبير."</p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="سارة محمود" />
              <div className="author-info">
                <h4>سارة محمود</h4>
                <p>مديرة الموارد البشرية</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"أعمال الإنشاءات والتركيبات الكهربائية التي قامت بها الشركة كانت على مستوى عالٍ من الجودة والاحترافية، ونحن سعداء بالنتائج."</p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="أحمد خالد" />
              <div className="author-info">
                <h4>أحمد خالد</h4>
                <p>مدير مشاريع</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>اشترك في نشرتنا الإخبارية</h2>
          <p>احصل على آخر الأخبار والعروض من شركتنا مباشرة إلى بريدك الإلكتروني</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button type="submit" className="btn-primary">اشترك الآن</button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-header">
          <h2 className="section-title">اتصل بنا</h2>
          <p className="section-description">
            نحن هنا للإجابة على استفساراتك وتقديم المساعدة
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <h3>العنوان</h3>
              <p>شارع الكنوز , تيط مليل , الدارالبضاء</p>
            </div>
            <div className="info-item">
              <h3>الهاتف</h3>
              <p>+966 12 345 6789</p>
            </div>
            <div className="info-item">
              <h3>البريد الإلكتروني</h3>
              <p>info@amr-tech.com</p>
            </div>
            <div className="info-item">
              <h3>ساعات العمل</h3>
              <p>الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً</p>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="fullName">الاسم الكامل</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">الموضوع</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">الرسالة</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  rows={5}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">إرسال الرسالة</button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;