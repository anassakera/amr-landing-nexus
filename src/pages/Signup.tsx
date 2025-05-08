import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import '../styles/Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

// تعديل دالة handleSignup في مكون React
const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('كلمتا السر غير متطابقتين');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // يمكنك توجيه المستخدم لصفحة تسجيل الدخول
     navigate("/login");
    } else {
      alert(`فشل التسجيل: ${data.message}`);
    }
  } catch (error) {
    console.error('حدث خطأ أثناء التسجيل:', error);
    alert(`حدث خطأ غير متوقع: ${error.message}`);
  }
};
  

const handleGoogleSignup = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-welcome">
          <img 
            src="/images/image4.png" 
            alt="AMR Tech Solutions" 
            className="welcomeImage"
          />
          <h1>مرحباً بك</h1>
          <h2>AMR TECH SOLUTION</h2>
          <p>
            نقدم لك أفضل الحلول المتكاملة في مجالات متعددة تشمل التكنولوجيا والتدريب المهني
            والاستشارات الإدارية والخدمات المختلفة للأفراد والمؤسسات
          </p>
        </div>
        
        <div className="signup-form-container">
          <div className="signup-form-content">
            <h2>إنشاء حساب</h2>
            <p className="signup-subtitle">أدخل بياناتك لإنشاء حساب جديد والوصول إلى خدماتنا المتميزة</p>
            
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <Label htmlFor="fullName">الإسم الكامل</Label>
                <div className="input-with-icon">
                  <Input 
                    id="fullName" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="أدخل الإسم الكامل"
                    required
                  />
                  <User className="input-icon" size={20} />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="input-with-icon">
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                  <Mail className="input-icon" size={20} />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="input-with-icon">
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم الهاتف"
                    required
                  />
                  <Phone className="input-icon" size={20} />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="password">كلمة السر</Label>
                <div className="input-with-icon">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة السر"
                    required
                  />
                  <Lock className="input-icon" size={20} />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="confirmPassword">تأكيد كلمة السر</Label>
                <div className="input-with-icon">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="أعد إدخال كلمة السر"
                    required
                  />
                  <Lock className="input-icon" size={20} />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="signup-button">
                إنشاء حساب
              </Button>
            </form>
            
            <div className="divider">
              <span>أو</span>
            </div>
            
            <Button
              variant="outline"
              className="google-signup-button"
              onClick={handleGoogleSignup}
            >
              <Mail size={20} />
              <span>التسجيل عبر حساب غوغل</span>
            </Button>
            
            <p className="login-prompt">
              لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;