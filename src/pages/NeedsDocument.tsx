import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Trash2, Plus, Minus, ChevronDown, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/NeedsDocument.css';

const NeedsDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state || null;
  
  // State for form fields - initialize with existing data if available
  const [activeStep, setActiveStep] = useState(1);
  const [organizationName, setOrganizationName] = useState(existingData?.organizationName || '');
  const [address, setAddress] = useState(existingData?.address || '');
  const [city, setCity] = useState(existingData?.city || '');
  const [phone, setPhone] = useState(existingData?.phone || '');
  const [documentDate, setDocumentDate] = useState(existingData?.documentDate || '');
  
  // Validation states
  const [errors, setErrors] = useState({
    organizationName: false,
    address: false,
    city: false,
    phone: false,
    documentDate: false,
    attendees: false,
    needs: false
  });
  
  const { toast } = useToast();
  
  // State for attendees table
  const [attendees, setAttendees] = useState(existingData?.attendees || [
    { id: 1, name: '', position: '' }
  ]);

  // State for needs table
  const [needs, setNeeds] = useState(existingData?.needs || [
    { id: 1, name: '', quantity: 0, specifications: '' }
  ]);
  
  // State for checkbox
  const [wantQuotation, setWantQuotation] = useState(existingData?.wantQuotation || false);
  
  // State for additional notes
  const [notes, setNotes] = useState(existingData?.notes || '');

  // Handler to add a new attendee
  const handleAddAttendee = () => {
    setAttendees([...attendees, { id: attendees.length + 1, name: '', position: '' }]);
  };

  // Handler to remove an attendee
  const handleRemoveAttendee = (id) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter(attendee => attendee.id !== id));
    }
  };

  // Handler to add a new need item
  const handleAddNeed = () => {
    setNeeds([...needs, { id: needs.length + 1, name: '', quantity: 0, specifications: '' }]);
  };

  // Handler to remove a need item
  const handleRemoveNeed = (id) => {
    if (needs.length > 1) {
      setNeeds(needs.filter(need => need.id !== id));
    }
  };

  // Handler to update quantity
  const handleQuantityChange = (id, change) => {
    const updatedNeeds = needs.map(need => {
      if (need.id === id) {
        const newQuantity = Math.max(0, need.quantity + change);
        return { ...need, quantity: newQuantity };
      }
      return need;
    });
    setNeeds(updatedNeeds);
  };

  // Validate form fields before proceeding to next step
  const validateStep1 = () => {
    const newErrors = {
      organizationName: !organizationName.trim(),
      address: !address.trim(),
      city: !city.trim(),
      phone: !phone.trim(),
      documentDate: !documentDate.trim(),
      attendees: attendees.some(a => !a.name.trim() || !a.position.trim()),
      needs: false
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      toast({
        variant: "destructive",
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return false;
    }
    
    return true;
  };
  
  // Validate step 2 fields
  const validateStep2 = () => {
    const newErrors = {
      ...errors,
      needs: needs.some(n => !n.name.trim() || n.quantity <= 0)
    };
    
    setErrors(newErrors);
    
    if (newErrors.needs) {
      toast({
        variant: "destructive",
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع حقول الحاجيات وتحديد الكميات",
      });
      return false;
    }
    
    return true;
  };

  // Handler for next/previous step
  const handleStep = (step) => {
    if (step > activeStep) {
      // Moving forward requires validation
      if (activeStep === 1 && !validateStep1()) {
        return;
      }
    }
    
    setActiveStep(step);
  };
  
  // Handler for document creation
  const handleCreateDocument = () => {
    if (!validateStep2()) {
      return;
    }
    
    toast({
      title: "تم إنشاء المحضر بنجاح",
      description: "تم إنشاء محضر تحديد الحاجيات بنجاح",
    });
    
    // Navigate to document preview with all form data
    navigate('/document-preview', { 
      state: {
        organizationName,
        address,
        city,
        phone,
        documentDate,
        attendees,
        needs,
        wantQuotation,
        notes
      }
    });
  };

  return (
    <div className="needs-document-container">
      <Header />
      <div className="document-content">
        <h1 className="document-title">نموذج محضر تحديد الحاجيات</h1>
        
        {/* Progress Steps */}
        <div className="progress-container">
          <div className="progress-line">
            <div className={`progress-step ${activeStep === 1 ? 'active' : ''}`} onClick={() => handleStep(1)}>
              <div className="step-number">1</div>
              <div className="step-label">معلومات المحضر</div>
            </div>
            <div className={`progress-step ${activeStep === 2 ? 'active' : ''}`} onClick={() => handleStep(2)}>
              <div className="step-number">2</div>
              <div className="step-label">تحديد الحاجيات</div>
            </div>
          </div>
        </div>

        {/* Step 1: Document Information */}
        {activeStep === 1 && (
          <div className="document-info-container">
            <h2 className="section-title">معلومات المحضر</h2>
            
            <div className={`form-group ${errors.organizationName ? 'has-error' : ''}`}>
              <label>اسم المؤسسة أو الجمعية:<span className="required-mark">*</span></label>
              <input 
                type="text" 
                value={organizationName} 
                onChange={(e) => setOrganizationName(e.target.value)} 
                placeholder="أدخل اسم المؤسسة أو الجمعية"
                required
              />
              {errors.organizationName && <div className="error-message">هذا الحقل مطلوب</div>}
            </div>
            
            <div className={`form-group ${errors.address ? 'has-error' : ''}`}>
              <label>العنوان:<span className="required-mark">*</span></label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="أدخل العنوان"
                required
              />
              {errors.address && <div className="error-message">هذا الحقل مطلوب</div>}
            </div>
            
            <div className={`form-group ${errors.city ? 'has-error' : ''}`}>
              <label>المدينة:<span className="required-mark">*</span></label>
              <div className="select-wrapper">
              <select value={city} onChange={(e) => setCity(e.target.value)} required>
  <option value="" disabled>اختر المدينة</option>
  <option value="الدار البيضاء">الدار البيضاء</option>
  <option value="فاس">فاس</option>
  <option value="طنجة">طنجة</option>
  <option value="مراكش">مراكش</option>
  <option value="مكناس">مكناس</option>
  <option value="أكادير">أكادير</option>
  <option value="الرباط">الرباط</option>
  <option value="وجدة">وجدة</option>
  <option value="سلا">سلا</option>
  <option value="القنيطرة">القنيطرة</option>
  <option value="تطوان">تطوان</option>
  <option value="تمارة">تمارة</option>
  <option value="آسفي">آسفي</option>
  <option value="المحمدية">المحمدية</option>
  <option value="العيون">العيون</option>
  <option value="الجديدة">الجديدة</option>
  <option value="خريبكة">خريبكة</option>
  <option value="بني ملال">بني ملال</option>
  <option value="الناظور">الناظور</option>
  <option value="كلميم">كلميم</option>
  <option value="سطات">سطات</option>
  <option value="الخميسات">الخميسات</option>
  <option value="تازة">تازة</option>
  <option value="العرائش">العرائش</option>
  <option value="آيت ملول">آيت ملول</option>
  <option value="الحسيمة">الحسيمة</option>
  <option value="بوسكورة">بوسكورة</option>
  <option value="إنزكان">إنزكان</option>
  <option value="بركان">بركان</option>
  <option value="خنيفرة">خنيفرة</option>
  <option value="تاوريرت">تاوريرت</option>
  <option value="بن جرير">بن جرير</option>
  <option value="الداخلة">الداخلة</option>
  <option value="دشيرة الجهادية">دشيرة الجهادية</option>
  <option value="الرشيدية">الرشيدية</option>
  <option value="سيدي سليمان">سيدي سليمان</option>
  <option value="تيزنيت">تيزنيت</option>
  <option value="تارودانت">تارودانت</option>
  <option value="جرسيف">جرسيف</option>
  <option value="الصويرة">الصويرة</option>
  <option value="سيدي قاسم">سيدي قاسم</option>
</select>

                <ChevronDown className="select-icon" size={20} />
              </div>
              {errors.city && <div className="error-message">هذا الحقل مطلوب</div>}
            </div>
            
            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
  <label>الهاتف:<span className="required-mark">*</span></label>
  <input 
    type="tel" 
    value={phone} 
    onChange={(e) => setPhone(e.target.value)} 
    onInput={(e) => {
      const input = e.target as HTMLInputElement;
      input.value = input.value.replace(/\D/g, '');
    }} // منع الحروف
    placeholder="أدخل رقم الهاتف"
    pattern="\d{10}" // يقبل فقط 10 أرقام
    minLength={10}
    maxLength={10}
    required
  />
  {errors.phone && <div className="error-message">رقم الهاتف يجب أن يتكون من 10 أرقام</div>}
</div>

            
            <div className={`form-group ${errors.documentDate ? 'has-error' : ''}`}>
              <label>تاريخ المحضر:<span className="required-mark">*</span></label>
              <div className="date-input-wrapper">
                <input 
                  type="date" 
                  value={documentDate} 
                  onChange={(e) => setDocumentDate(e.target.value)} 
                  required
                />
              </div>
              {errors.documentDate && <div className="error-message">هذا الحقل مطلوب</div>}
            </div>
            
            <h3 className="subsection-title">الحاضرون في الإجتماع<span className="required-mark">*</span></h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الاسم الكامل</th>
                    <th>الصفة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee) => (
                    <tr key={attendee.id} className={errors.attendees ? 'has-error' : ''}>
                      <td>
                        <input 
                          type="text" 
                          value={attendee.name} 
                          onChange={(e) => {
                            const updatedAttendees = attendees.map(a => 
                              a.id === attendee.id ? {...a, name: e.target.value} : a
                            );
                            setAttendees(updatedAttendees);
                          }}
                          placeholder="الاسم الكامل"
                          required
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          value={attendee.position} 
                          onChange={(e) => {
                            const updatedAttendees = attendees.map(a => 
                              a.id === attendee.id ? {...a, position: e.target.value} : a
                            );
                            setAttendees(updatedAttendees);
                          }}
                          placeholder="الصفة"
                          required
                        />
                      </td>
                      <td>
                        <button 
                          className="remove-btn" 
                          onClick={() => handleRemoveAttendee(attendee.id)}
                          disabled={attendees.length === 1}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {errors.attendees && <div className="error-message table-error">جميع حقول الحاضرين مطلوبة</div>}
            
            <button className="add-btn" onClick={handleAddAttendee}>
              <Plus size={20} />
              <span>إضافة حاضر</span>
            </button>
            
            <div className="navigation-buttons">
              <button className="next-btn" onClick={() => handleStep(2)}>
                <span>تابع</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Needs Definition */}
        {activeStep === 2 && (
          <div className="needs-container">
            <h2 className="section-title">تحديد الحاجيات</h2>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>اسم المنتج/الخدمة<span className="required-mark">*</span></th>
                    <th>الكمية<span className="required-mark">*</span></th>
                    <th>وصف/مواصفات</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {needs.map((need) => (
                    <tr key={need.id} className={errors.needs ? 'has-error' : ''}>
                      <td>
                        <input 
                          type="text" 
                          value={need.name} 
                          onChange={(e) => {
                            const updatedNeeds = needs.map(n => 
                              n.id === need.id ? {...n, name: e.target.value} : n
                            );
                            setNeeds(updatedNeeds);
                          }}
                          placeholder="اسم المنتج أو الخدمة"
                          required
                        />
                      </td>
                      <td>
  <div className="quantity-control">
    <button 
      className="quantity-btn" 
      onClick={() => handleQuantityChange(need.id, 1)}
    >
      <Plus size={20} />
    </button>
    
    <input
      type="number"
      min="0"
      className="quantity-input"
      style={{ width: '100px', textAlign: 'center' }}
      placeholder="0"
      value={need.quantity}
      onChange={(e) => {
        const value = parseInt(e.target.value) || 0;
        const updatedNeeds = needs.map(n =>
          n.id === need.id ? { ...n, quantity: value } : n
        );
        setNeeds(updatedNeeds);
      }}
    />

    <button 
      className="quantity-btn" 
      onClick={() => handleQuantityChange(need.id, -1)}
      disabled={need.quantity <= 0}
    >
      <Minus size={20} />
    </button>
  </div>
</td>

                      <td>
                        <input 
                          type="text" 
                          value={need.specifications} 
                          onChange={(e) => {
                            const updatedNeeds = needs.map(n => 
                              n.id === need.id ? {...n, specifications: e.target.value} : n
                            );
                            setNeeds(updatedNeeds);
                          }}
                          placeholder="وصف المنتج أو المواصفات المطلوبة"
                        />
                      </td>
                      <td>
                        <button 
                          className="remove-btn" 
                          onClick={() => handleRemoveNeed(need.id)}
                          disabled={needs.length === 1}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {errors.needs && <div className="error-message table-error">يجب تحديد اسم وكمية لكل منتج</div>}
            
            <button className="add-btn" onClick={handleAddNeed}>
              <Plus size={20} />
              <span>إضافة منتج/خدمة أخرى</span>
            </button>
            
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="quotation-checkbox" 
                checked={wantQuotation} 
                onChange={() => setWantQuotation(!wantQuotation)} 
              />
              <label htmlFor="quotation-checkbox">أريد التوصل بلائحة عرض السلع المحددة</label>
            </div>
            
            <div className="form-group">
              <label>ملاحظات إضافية:</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="أي ملاحظات إضافية تتعلق بالحاجيات أو الإجراءات"
                rows={5}
              />
            </div>
            
            <div className="navigation-buttons">
              <button className="back-btn" onClick={() => handleStep(1)}>
                <span>السابق</span>
              </button>
              <button className="create-doc-btn" onClick={handleCreateDocument}>
                <FileText size={20} />
                <span>إنشاء المحضر</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NeedsDocument;