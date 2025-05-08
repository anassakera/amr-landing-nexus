import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // تخزين معلومات المستخدم في localStorage إذا تم اختيار "تذكرني"
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          // يمكن استخدام sessionStorage بدلاً من ذلك إذا لم يتم اختيار "تذكرني"
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // عرض رسالة نجاح
        alert(data.message);
        
        // توجيه المستخدم إلى الصفحة الرئيسية أو لوحة التحكم
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error);
      setError('فشل الاتصال بالخادم. الرجاء المحاولة مرة أخرى لاحقًا.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
    // Add Google authentication logic here
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-welcome">
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
        
        <div className="login-form-container">
          <div className="login-form-content">
            <h2>تسجيل الدخول</h2>
            <p className="login-subtitle">أدخل بيانات حسابك للوصول إلى خدماتنا المتميزة</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <Label htmlFor="username">البريد الإلكتروني</Label>
                <div className="input-with-icon">
                  <Input 
                    id="username" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                  <Mail className="input-icon" size={20} />
                </div>
              </div>
              
              <div className="form-group">
                <div className="password-label-row">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link to="/forgot-password" className="forgot-password">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="input-with-icon">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
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
              
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">تذكرني</label>
              </div>
              
              <Button 
                type="submit" 
                className="login-button" 
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
            
            <div className="divider">
              <span>أو</span>
            </div>
            
            <Button
              variant="outline"
              className="google-login-button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Mail size={20} />
              <span>تسجيل الدخول عبر حساب غوغل</span>
            </Button>
            
            <p className="signup-prompt">
              ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;