'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';

function generateCaptcha() {
  return Math.random().toString(36).substring(2, 8);
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '', captchaInput: '', rememberMe: false });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [attempts, setAttempts] = useState(3);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (attempts === 0) {
      toast.error('Kesempatan login habis!');
      return;
    }

    const err: any = {};
    if (!formData.email) err.email = 'Email tidak boleh kosong';
    else if (formData.email !== '2912@gmail.com') err.email = 'Email tidak sesuai';

    if (!formData.password) err.password = 'Password tidak boleh kosong';
    else if (formData.password !== '241712912') err.password = 'Password tidak sesuai';

    if (formData.captchaInput !== captcha) err.captcha = 'Captcha tidak valid';

    if (Object.keys(err).length > 0) {
      setErrors(err);
      const newAttempts = Math.max(attempts - 1, 0);
      setAttempts(newAttempts);
      toast.error(`Login Gagal! Sisa kesempatan ${newAttempts}`);
      setCaptcha(generateCaptcha());
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Login berhasil!');
    router.push('/auth/home');
  };

  return (
    <AuthFormWrapper title="Login">
      <p className="text-center text-sm font-semibold mb-4">Sisa Kesempatan: {attempts}</p>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input type="email" placeholder="Masukan email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field mt-1" />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Masukan password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field mt-1 pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg">
              {showPassword ? '◉' : '◎'}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} />
            Ingat Saya
          </label>
          <a href="#" className="text-blue-600 text-sm font-semibold">Forgot Password?</a>
        </div>

        <div>
          <label className="text-sm text-gray-600">Captcha</label>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg tracking-widest bg-gray-100 px-3 py-1 rounded">{captcha}</span>
            <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="text-blue-500 text-xl">🔄</button>
          </div>
          <input placeholder="Masukan captcha"
            onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
            className="input-field" />
          {errors.captcha && <p className="error-message">{errors.captcha}</p>}
        </div>

        <button disabled={attempts === 0}
          className={`w-full py-3 rounded-lg text-white font-semibold ${attempts === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          Sign In
        </button>

        <button type="button" disabled={attempts > 0}
          onClick={() => { setAttempts(3); toast.success('Kesempatan login berhasil direset!'); }}
          className={`w-full py-3 rounded-lg text-white font-semibold ${attempts === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}>
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="text-center text-sm">
          Tidak punya akun? <Link href="/auth/register" className="text-blue-600 font-semibold">Daftar</Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}