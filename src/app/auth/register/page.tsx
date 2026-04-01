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

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    const password = data.password || '';
    const strength = Math.min(
      (password.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(password) ? 25 : 0) +
      (/[0-9]/.test(password) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
    );
    setStrength(strength);
  }, [data.password]);

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const err: any = {};

    if (!data.username) err.username = 'Username tidak boleh kosong';
    else if (data.username.length < 3) err.username = 'Username minimal 3 karakter';
    else if (data.username.length > 8) err.username = 'Username maksimal 8 karakter';

    if (!data.email) err.email = 'Email tidak boleh kosong';
    else if (!/^[^\s@]+@[^\s@]+\.(com|net|co)$/.test(data.email)) err.email = 'Format email tidak valid';

    if (!data.phone) err.phone = 'Nomor telepon tidak boleh kosong';
    else if (!/^\d+$/.test(data.phone)) err.phone = 'Nomor telepon hanya boleh angka';
    else if (data.phone.length < 10) err.phone = 'Nomor telepon minimal 10 karakter';

    if (!data.password) err.password = 'Password tidak boleh kosong';
    else if (data.password.length < 8) err.password = 'Password minimal 8 karakter';

    if (data.password !== data.confirmPassword) err.confirmPassword = 'Konfirmasi password tidak cocok';

    if (data.captcha !== captcha) err.captcha = 'Captcha tidak valid';

    if (Object.keys(err).length > 0) {
      setErrors(err);
      toast.error('Register gagal!');
      return;
    }

    toast.success('Register berhasil!');
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Username</label>
          <input placeholder="Masukan username" className="input-field mt-1"
            onChange={(e) => setData({ ...data, username: e.target.value })} />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input placeholder="Masukan email" className="input-field mt-1"
            onChange={(e) => setData({ ...data, email: e.target.value })} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Nomor Telepon</label>
          <input placeholder="Masukan nomor telepon" className="input-field mt-1"
            onChange={(e) => setData({ ...data, phone: e.target.value })} />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Masukan password"
              className="input-field mt-1 pr-10"
              onChange={(e) => setData({ ...data, password: e.target.value })} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg">
              {showPassword ? '◉' : '◎'}
            </button>
          </div>
          <div className="mt-2 h-2 rounded bg-gray-200">
            <div className={`h-2 rounded ${getStrengthColor()}`} style={{ width: `${strength}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Strength: {strength}%</p>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Confirm Password</label>
          <div className="relative">
            <input type={showConfirm ? 'text' : 'password'} placeholder="Masukan konfirmasi password"
              className="input-field mt-1 pr-10"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg">
              {showConfirm ? '◉' : '◎'}
            </button>
          </div>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Captcha</label>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg tracking-widest bg-gray-100 px-3 py-1 rounded">{captcha}</span>
            <button type="button" onClick={() => setCaptcha(generateCaptcha())} className="text-blue-500 text-xl">🔄</button>
          </div>
          <input placeholder="Masukan captcha" className="input-field"
            onChange={(e) => setData({ ...data, captcha: e.target.value })} />
          {errors.captcha && <p className="error-message">{errors.captcha}</p>}
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Register
        </button>

        <SocialAuth />

        <p className="text-center text-sm">
          Sudah punya akun? <Link href="/auth/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}